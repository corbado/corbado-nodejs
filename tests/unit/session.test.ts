// @ts-ignore
import express from 'express';
import { exportJWK, generateKeyPair, KeyLike, SignJWT } from 'jose';
// @ts-ignore
import http from 'http';
import { BaseError, httpStatusCodes, ValidationError } from '../../src/errors';
import { ValidationErrorNames } from '../../src/errors/validationError';
import SessionService from '../../src/services/sessionService';

const app = express();
const PORT = 8081;
const TEST_USER_ID = '12345';
const TEST_USER_FULL_NAME = 'Test Name';

let validPrivateKey: KeyLike;
let invalidPrivateKey: KeyLike;
let publicKeyJwk: any;

async function initializeKeys() {
  const { privateKey: key, publicKey } = await generateKeyPair('RS256');
  validPrivateKey = key;

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
  notBefore: number,
  privateKey: KeyLike,
  alg: string,
): Promise<string> {
  const payload = {
    sub: TEST_USER_ID,
    name: TEST_USER_FULL_NAME,
    iss: issuer,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expiresIn,
    nbf: Math.floor(Date.now() / 1000) + notBefore,
  };

  if (alg === 'none') {
    const header = {
      alg: 'none',
      kid: 'kid123',
    };

    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');

    return `${encodedHeader}.${encodedPayload}.`;
  }

  return new SignJWT(payload)
    .setProtectedHeader({
      alg,
      kid: 'kid123',
    })
    .sign(privateKey);
}

function createSessionService(issuer: string): SessionService {
  return new SessionService('cbo_session_token', issuer, `http://localhost:${PORT}/jwks`, 10, 'pro-1');
}

describe('Session Service Unit Tests', () => {
  let server: http.Server;

  beforeAll(async () => {
    server = await startJWKSserver();
  });

  afterAll(async () => {
    server.close();
  });

  test('should throw error if required parameters are missing in constructor', () => {
    expect(
      () =>
        new SessionService(
          '',
          'https://pro-1.frontendapi.cloud.corbado.io',
          `http://localhost:${PORT}/jwks`,
          10,
          'pro-1',
        ),
    ).toThrow('Required parameter is empty');
    expect(() => new SessionService('cbo_session_token', '', `http://localhost:${PORT}/jwks`, 10, 'pro-1')).toThrow(
      'Required parameter is empty',
    );
    expect(
      () => new SessionService('cbo_session_token', 'https://pro-1.frontendapi.cloud.corbado.io', '', 10, 'pro-1'),
    ).toThrow('Required parameter is empty');
  });

  test('should throw ValidationError if JWT is empty', async () => {
    const sessionService = createSessionService('https://pro-1.frontendapi.cloud.corbado.io');

    await expect(sessionService.validateToken('')).rejects.toThrow(BaseError);
    await expect(sessionService.validateToken('')).rejects.toHaveProperty(
      'statusCode',
      httpStatusCodes.EMPTY_STRING.code,
    );
  });

  test('should throw ValidationError if JWT is too short', async () => {
    const sessionService = createSessionService('https://pro-1.frontendapi.cloud.corbado.io');

    await expect(sessionService.validateToken('short')).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken('short')).rejects.toHaveProperty(
      'name',
      ValidationErrorNames.InvalidShortSession,
    );
  });

  test('should throw ValidationError if JWT has an invalid signature', async () => {
    const sessionService = createSessionService('https://pro-1.frontendapi.cloud.corbado.io');

    const jwt =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImtpZDEyMyJ9.eyJpc3MiOiJodHRwczovL2F1dGguYWNtZS5jb20iLCJpYXQiOjE3MjY0OTE4MDcsImV4cCI6MTcyNjQ5MTkwNywibmJmIjoxNzI2NDkxNzA3LCJzdWIiOiJ1c3ItMTIzNDU2Nzg5MCIsIm5hbWUiOiJuYW1lIiwiZW1haWwiOiJlbWFpbCIsInBob25lX251bWJlciI6InBob25lTnVtYmVyIiwib3JpZyI6Im9yaWcifQ.invalid';
    await expect(sessionService.validateToken(jwt)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(jwt)).rejects.toHaveProperty('name', ValidationErrorNames.JWTInvalid);
  });

  test('should throw ValidationError using invalid private key', async () => {
    const sessionService = createSessionService('https://pro-1.frontendapi.cloud.corbado.io');
    const jwt = await generateJWT('https://pro-1.frontendapi.cloud.corbado.io', 600, 0, invalidPrivateKey, 'RS256');

    await expect(sessionService.validateToken(jwt)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(jwt)).rejects.toHaveProperty('name', ValidationErrorNames.JWTInvalid);
  });

  test('should throw ValidationError using alg "none"', async () => {
    const sessionService = createSessionService('https://pro-1.frontendapi.cloud.corbado.io');
    const jwt = await generateJWT('https://pro-1.frontendapi.cloud.corbado.io', 600, 0, invalidPrivateKey, 'none');

    await expect(sessionService.validateToken(jwt)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(jwt)).rejects.toHaveProperty('name', ValidationErrorNames.JWTInvalid);
  });

  test('should throw ValidationError if JWT is not yet valid (nbf claim in the future)', async () => {
    const sessionService = createSessionService('https://pro-1.frontendapi.cloud.corbado.io');
    const jwt = await generateJWT('https://pro-1.frontendapi.cloud.corbado.io', 600, 600, validPrivateKey, 'RS256');

    await expect(sessionService.validateToken(jwt)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(jwt)).rejects.toHaveProperty(
      'name',
      ValidationErrorNames.JWTClaimValidationFailed,
    );
  });

  test('should throw ValidationError using an expired JWT', async () => {
    const sessionService = createSessionService('https://pro-1.frontendapi.cloud.corbado.io');
    const jwt = await generateJWT('https://pro-1.frontendapi.cloud.corbado.io', -600, 0, validPrivateKey, 'RS256');

    await expect(sessionService.validateToken(jwt)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(jwt)).rejects.toHaveProperty('name', ValidationErrorNames.JWTExpired);
  });

  test('should throw ValidationError if issuer is empty', async () => {
    const sessionService = createSessionService('https://pro-1.frontendapi.cloud.corbado.io');
    const jwt = await generateJWT('', 600, 0, validPrivateKey, 'RS256');

    await expect(sessionService.validateToken(jwt)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(jwt)).rejects.toHaveProperty('name', ValidationErrorNames.EmptyIssuer);
  });

  test('should throw ValidationError if issuer is mismatch 1', async () => {
    const sessionService = createSessionService('https://pro-1.frontendapi.corbado.io');
    const jwt = await generateJWT('https://pro-2.frontendapi.cloud.corbado.io', 600, 0, validPrivateKey, 'RS256');

    await expect(sessionService.validateToken(jwt)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(jwt)).rejects.toHaveProperty('name', ValidationErrorNames.InvalidIssuer);
  });

  test('should throw ValidationError if issuer is mismatch 2', async () => {
    const sessionService = createSessionService('https://pro-1.frontendapi.cloud.corbado.io');
    const jwt = await generateJWT('https://pro-2.frontendapi.corbado.io', 600, 0, validPrivateKey, 'RS256');

    await expect(sessionService.validateToken(jwt)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(jwt)).rejects.toHaveProperty('name', ValidationErrorNames.InvalidIssuer);
  });

  test('should return user using old Frontend API URL as issuer in JWT', async () => {
    const sessionService = createSessionService('https://pro-1.frontendapi.cloud.corbado.io');
    const jwt = await generateJWT('https://pro-1.frontendapi.corbado.io', 600, 0, validPrivateKey, 'RS256');

    const user = await sessionService.validateToken(jwt);
    expect(user.userId).toBe(TEST_USER_ID);
    expect(user.fullName).toBe(TEST_USER_FULL_NAME);
  });

  test('should return user using old Frontend API URL as issuer in config', async () => {
    const sessionService = createSessionService('https://pro-1.frontendapi.corbado.io');
    const jwt = await generateJWT('https://pro-1.frontendapi.cloud.corbado.io', 600, 0, validPrivateKey, 'RS256');

    const user = await sessionService.validateToken(jwt);
    expect(user.userId).toBe(TEST_USER_ID);
    expect(user.fullName).toBe(TEST_USER_FULL_NAME);
  });

  test('should return user data using CNAME', async () => {
    const sessionService = createSessionService('https://auth.acme.com');
    const jwt = await generateJWT('https://auth.acme.com', 600, 0, validPrivateKey, 'RS256');

    const user = await sessionService.validateToken(jwt);
    expect(user.userId).toBe(TEST_USER_ID);
    expect(user.fullName).toBe(TEST_USER_FULL_NAME);
  });
});
