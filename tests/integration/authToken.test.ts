import { SDK } from '../../src';
import { ServerError } from '../../src/errors';
import Utils from '../utils';

describe('AuthToken Validation Tests', () => {
  let sdk: SDK;

  beforeEach(() => {
    sdk = Utils.SDK();
  });

  test('should handle empty token validation error', async () => {
    expect.assertions(1);

    try {
      const req = {
        token: Utils.testConstants.TEST_EMPTY_STRING,
        clientInfo: {
          remoteAddress: Utils.testConstants.TEST_REMOTE_ADDRESS,
          userAgent: Utils.testConstants.TEST_USER_AGENT,
        },
      };

      await sdk.authTokens().validate(req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);
    }
  });

  test('should handle invalid token validation error', async () => {
    expect.assertions(2);

    try {
      const req = {
        token: 'x',
        clientInfo: {
          remoteAddress: Utils.testConstants.TEST_REMOTE_ADDRESS,
          userAgent: Utils.testConstants.TEST_USER_AGENT,
        },
      };

      await sdk.authTokens().validate(req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);
      expect((error as ServerError).getValidationMessages()).toEqual(['token: the length must be exactly 64']);
    }
  });

  test('should handle not existing token validation error', async () => {
    expect.assertions(2);

    try {
      const req = {
        token: Utils.generateString(64),
        clientInfo: {
          remoteAddress: Utils.testConstants.TEST_REMOTE_ADDRESS,
          userAgent: Utils.testConstants.TEST_USER_AGENT,
        },
      };

      await sdk.authTokens().validate(req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);
      expect((error as ServerError).getHttpStatusCode()).toBe(404);
    }
  });
});
