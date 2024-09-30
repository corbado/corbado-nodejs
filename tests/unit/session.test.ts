import { createRemoteJWKSet, jwtVerify, errors } from 'jose';
import { Session } from '../../src/services';
import ValidationError, { ValidationErrorNames } from '../../src/errors/validationError';
import { httpStatusCodes } from '../../src/errors';

// Mock jose functions
jest.mock('jose', () => {
  return {
    jwtVerify: jest.fn() as jest.MockedFunction<typeof jwtVerify>,
    createRemoteJWKSet: jest.fn() as jest.MockedFunction<typeof createRemoteJWKSet>,
    errors: {
      JWTClaimValidationFailed: class extends Error {},
      JWTExpired: class extends Error {},
      JWTInvalid: class extends Error {},
    },
  };
});

describe('Session Service Unit Tests', () => {
  const TEST_USER_ID = '12345';
  const TEST_FULL_NAME = 'Test Name';
  const TEST_ISSUER = 'https://pro-2.frontendapi.corbado.io';
  const JWKS_URI = 'https://example_uri.com';
  const PROJECT_ID = 'pro-2';
  const SHORT_SESSION_COOKIE_NAME = 'short_session_cookie';
  const SHORT_SESSION = 'valid.jwt.token';

  let sessionService: Session;

  beforeAll(() => {
    sessionService = new Session(SHORT_SESSION_COOKIE_NAME, TEST_ISSUER, JWKS_URI, 10, PROJECT_ID);
  });

  test('should throw error if required parameters are missing in constructor', () => {
    expect(() => new Session('', TEST_ISSUER, JWKS_URI, 10, PROJECT_ID)).toThrow('Required parameter is empty');
    expect(() => new Session(SHORT_SESSION_COOKIE_NAME, '', JWKS_URI, 10, PROJECT_ID)).toThrow(
      'Required parameter is empty',
    );
    expect(() => new Session(SHORT_SESSION_COOKIE_NAME, TEST_ISSUER, '', 10, PROJECT_ID)).toThrow(
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

  test('Invalid Issuer 1', async () => {
    (jwtVerify as jest.Mock).mockResolvedValue({
      payload: {
        iss: 'https://pro-1.frontendapi.corbado.io',
        sub: TEST_USER_ID,
        name: TEST_FULL_NAME,
      },
    });

    await expect(sessionService.validateToken(SHORT_SESSION)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(SHORT_SESSION)).rejects.toThrow(
      "JWT issuer mismatch (configured trough FrontendAPI: 'https://pro-2.frontendapi.corbado.io', JWT issuer: 'https://pro-1.frontendapi.corbado.io')",
    );
  });

  test('Invalid Issuer 2', async () => {
    (jwtVerify as jest.Mock).mockResolvedValue({
      payload: {
        iss: 'https://pro-1.frontendapi.cloud.corbado.io',
        sub: TEST_USER_ID,
        name: TEST_FULL_NAME,
      },
    });

    await expect(sessionService.validateToken(SHORT_SESSION)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(SHORT_SESSION)).rejects.toThrow(
      "JWT issuer mismatch (configured trough FrontendAPI: 'https://pro-2.frontendapi.corbado.io', JWT issuer: 'https://pro-1.frontendapi.cloud.corbado.io')",
    );
  });

  test('Valid Issuer with new Frontend API URL in JWT', async () => {
    (jwtVerify as jest.Mock).mockResolvedValue({
      payload: {
        iss: 'https://pro-2.frontendapi.corbado.io',
        sub: TEST_USER_ID,
        name: TEST_FULL_NAME,
      },
    });

    const user = await sessionService.validateToken(SHORT_SESSION);
    expect(user).toEqual({
      userId: TEST_USER_ID,
      fullName: TEST_FULL_NAME,
    });
  });

  test('Valid Issuer with old Frontend API URL in JWT', async () => {
    (jwtVerify as jest.Mock).mockResolvedValue({
      payload: {
        iss: 'https://pro-2.frontendapi.cloud.corbado.io',
        sub: TEST_USER_ID,
        name: TEST_FULL_NAME,
      },
    });

    const user = await sessionService.validateToken(SHORT_SESSION);
    expect(user).toEqual({
      userId: TEST_USER_ID,
      fullName: TEST_FULL_NAME,
    });
  });

  test('should throw ValidationError if issuer is mismatched', async () => {
    (jwtVerify as jest.Mock).mockResolvedValue({
      payload: {
        iss: 'https://invalid-issuer.com',
        sub: TEST_USER_ID,
        name: TEST_FULL_NAME,
      },
    });

    await expect(sessionService.validateToken(SHORT_SESSION)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(SHORT_SESSION)).rejects.toThrow(
      "JWT issuer mismatch (configured trough FrontendAPI: 'https://pro-2.frontendapi.corbado.io', JWT issuer: 'https://invalid-issuer.com')",
    );
  });

  test('should throw ValidationError if issuer is undefined', async () => {
    (jwtVerify as jest.Mock).mockResolvedValue({
      payload: {
        sub: TEST_USER_ID,
        name: TEST_FULL_NAME,
      },
    });

    await expect(sessionService.validateToken(SHORT_SESSION)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(SHORT_SESSION)).rejects.toThrow(
      httpStatusCodes[ValidationErrorNames.InvalidIssuer].description,
    );
  });

  test('should throw ValidationError on JWTClaimValidationFailed', async () => {
    (jwtVerify as jest.Mock).mockRejectedValue(new errors.JWTClaimValidationFailed('message'));

    await expect(sessionService.validateToken(SHORT_SESSION)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(SHORT_SESSION)).rejects.toThrow(
      httpStatusCodes[ValidationErrorNames.JWTClaimValidationFailed].description,
    );
  });

  test('should throw ValidationError on JWTExpired', async () => {
    (jwtVerify as jest.Mock).mockRejectedValue(new errors.JWTExpired('message'));

    await expect(sessionService.validateToken(SHORT_SESSION)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(SHORT_SESSION)).rejects.toThrow(
      httpStatusCodes[ValidationErrorNames.JWTExpired].description,
    );
  });

  test('should throw ValidationError on JWTInvalid', async () => {
    (jwtVerify as jest.Mock).mockRejectedValue(new errors.JWTInvalid());

    await expect(sessionService.validateToken(SHORT_SESSION)).rejects.toThrow(ValidationError);
    await expect(sessionService.validateToken(SHORT_SESSION)).rejects.toThrow(
      httpStatusCodes[ValidationErrorNames.JWTInvalid].description,
    );
  });

  test('should return user data for a valid JWT', async () => {
    (jwtVerify as jest.Mock).mockResolvedValue({
      payload: {
        iss: TEST_ISSUER,
        sub: TEST_USER_ID,
        name: TEST_FULL_NAME,
      },
    });

    const user = await sessionService.validateToken(SHORT_SESSION);
    expect(user).toEqual({
      userId: TEST_USER_ID,
      fullName: TEST_FULL_NAME,
    });
  });
});
