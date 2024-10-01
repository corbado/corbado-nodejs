// @ts-ignore
import express from 'express';
import { exportJWK, generateKeyPair, KeyLike, SignJWT } from 'jose';
// @ts-ignore
import http from 'http';
import { httpStatusCodes, ValidationError } from '../../src/errors';
import { ValidationErrorNames } from '../../src/errors/validationError';
import SessionService from '../../src/services/sessionService';

const app = express();
const PORT = 8081;

let privateKey: KeyLike;
let invalidPrivateKey: KeyLike;
let publicKeyJwk: any;

async function initializeKeys() {
  const { privateKey: key, publicKey } = await generateKeyPair('RS256');
  privateKey = key;
  const { privateKey: invalidKey } = await generateKeyPair('RS256');
  invalidPrivateKey = invalidKey;
  publicKeyJwk = await exportJWK(publicKey);
  publicKeyJwk.kid = 'kid123';
}

// @ts-ignore
app.get('/jwks', (req, res) => {
  res.json({ keys: [publicKeyJwk] });
});

async function startJWKSserver() {
  await initializeKeys();
  return new Promise<http.Server>((resolve) => {
    const server = app.listen(PORT, () => {
      console.log(`JWKS server is running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function generateJWT(
  issuer: string,
  expiresIn: number,
  payload: Record<string, any>,
  privateKey: KeyLike,
): Promise<string> {
  return await new SignJWT({
    ...payload,
    iss: issuer,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expiresIn,
  })
    .setProtectedHeader({
      alg: 'RS256',
      kid: 'kid123',
    })
    .sign(privateKey);
}

describe('Session Service Unit Tests', () => {
  let server: http.Server;
  let sessionService: SessionService;

  const TEST_USER_ID = '12345';
  const TEST_FULL_NAME = 'Test Name';
  const TEST_ISSUER = 'https://pro-2.frontendapi.corbado.io';
  const JWKS_URI = `http://localhost:${PORT}/jwks`;
  const SHORT_SESSION_COOKIE_NAME = 'short_session_cookie';
  const PROJECT_ID = 'pro-2';

  beforeAll(async () => {
    server = await startJWKSserver();

    sessionService = new SessionService(SHORT_SESSION_COOKIE_NAME, TEST_ISSUER, JWKS_URI, 10, PROJECT_ID);
  });

  afterAll(async () => {
    server.close();
  });

  test('should throw error if required parameters are missing in constructor', () => {
    expect(() => new SessionService('', TEST_ISSUER, JWKS_URI, 10, PROJECT_ID)).toThrow('Required parameter is empty');
    expect(() => new SessionService(SHORT_SESSION_COOKIE_NAME, '', JWKS_URI, 10, PROJECT_ID)).toThrow(
      'Required parameter is empty',
    );
    expect(() => new SessionService(SHORT_SESSION_COOKIE_NAME, TEST_ISSUER, '', 10, PROJECT_ID)).toThrow(
      'Required parameter is empty',
    );
  });

  test('should throw ValidationError if short session is too short', async () => {
    const shortSession = 'short';
    await expect(sessionService.validateToken(shortSession)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(shortSession)).rejects.toThrow(
      httpStatusCodes[ValidationErrorNames.InvalidShortSession].description,
    );
  });

  test('should throw ValidationError if issuer is mismatched 1', async () => {
    const jwt = await generateJWT(
      'https://pro-1.frontendapi.cloud.corbado.io',
      600,
      {
        sub: TEST_USER_ID,
        name: TEST_FULL_NAME,
      },
      privateKey,
    );

    await expect(sessionService.validateToken(jwt)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(jwt)).rejects.toHaveProperty(
      'statusCode',
      httpStatusCodes[ValidationErrorNames.InvalidIssuer].code,
    );
  });

  test('should throw ValidationError if issuer is mismatched 2', async () => {
    const jwt = await generateJWT(
      'https://pro-1.frontendapi.corbado.io',
      600,
      {
        sub: TEST_USER_ID,
        name: TEST_FULL_NAME,
      },
      privateKey,
    );

    await expect(sessionService.validateToken(jwt)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(jwt)).rejects.toHaveProperty(
      'statusCode',
      httpStatusCodes[ValidationErrorNames.InvalidIssuer].code,
    );
  });

  test('should return user using new Frontend API URL as issuer in JWT', async () => {
    const jwt = await generateJWT(
      'https://pro-2.frontendapi.corbado.io',
      600,
      {
        sub: TEST_USER_ID,
        name: TEST_FULL_NAME,
      },
      privateKey,
    );

    const user = await sessionService.validateToken(jwt);
    expect(user).toEqual({
      userId: TEST_USER_ID,
      fullName: TEST_FULL_NAME,
    });
  });

  test('should return user using old Frontend API URL as issuer in JWT', async () => {
    const jwt = await generateJWT(
      'https://pro-2.frontendapi.cloud.corbado.io',
      600,
      {
        sub: TEST_USER_ID,
        name: TEST_FULL_NAME,
      },
      privateKey,
    );

    const user = await sessionService.validateToken(jwt);
    expect(user).toEqual({
      userId: TEST_USER_ID,
      fullName: TEST_FULL_NAME,
    });
  });

  test('should throw ValidationError if issuer is undefined', async () => {
    const jwt = await generateJWT(
      '',
      600,
      {
        sub: TEST_USER_ID,
        name: TEST_FULL_NAME,
      },
      privateKey,
    );

    await expect(sessionService.validateToken(jwt)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(jwt)).rejects.toThrow(
      httpStatusCodes[ValidationErrorNames.EmptyIssuer].description,
    );
  });

  test('should throw ValidationError on JWTExpired', async () => {
    const jwt = await generateJWT(
      TEST_ISSUER,
      -600,
      {
        sub: TEST_USER_ID,
        name: TEST_FULL_NAME,
      },
      privateKey,
    );

    await expect(sessionService.validateToken(jwt)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(jwt)).rejects.toThrow(
      httpStatusCodes[ValidationErrorNames.JWTExpired].description,
    );
  });

  test('should throw ValidationError on JWTInvalid', async () => {
    const jwt = await generateJWT(
      TEST_ISSUER,
      600,
      {
        sub: TEST_USER_ID,
        name: TEST_FULL_NAME,
      },
      invalidPrivateKey,
    );

    await expect(sessionService.validateToken(jwt)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(jwt)).rejects.toThrow(
      httpStatusCodes[ValidationErrorNames.JWTInvalid].description,
    );
  });

  test('should throw ValidationError if JWT is not yet valid (nbf claim in the future)', async () => {
    const notBeforeTime = Math.floor(Date.now() / 1000) + 600;
    const jwt = await new SignJWT({
      iss: TEST_ISSUER,
      sub: TEST_USER_ID,
      name: TEST_FULL_NAME,
      nbf: notBeforeTime,
    })
      .setProtectedHeader({
        alg: 'RS256',
        kid: 'kid123',
      })
      .sign(privateKey);

    await expect(sessionService.validateToken(jwt)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(jwt)).rejects.toThrow(
      httpStatusCodes[ValidationErrorNames.JWTClaimValidationFailed].description,
    );
  });

  test('should return user data for a valid JWT', async () => {
    const jwt = await generateJWT(
      TEST_ISSUER,
      600,
      {
        sub: TEST_USER_ID,
        name: TEST_FULL_NAME,
      },
      privateKey,
    );

    const user = await sessionService.validateToken(jwt);
    expect(user).toEqual({
      userId: TEST_USER_ID,
      fullName: TEST_FULL_NAME,
    });
  });
});
