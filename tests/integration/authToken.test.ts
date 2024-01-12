import { Configuration, SDK } from '../../src';
import { BaseError, ServerError } from '../../src/errors';
import Utils from '../utils';

describe('AuthToken Validation Tests', () => {
  let projectID;
  let apiSecret;
  let config: Configuration;
  let sdk: SDK;

  beforeEach(() => {
    projectID = process.env.PROJECT_ID;
    apiSecret = process.env.API_SECRET;

    if (!projectID || !apiSecret) {
      throw new BaseError('Env Error', 5001, 'Both projectID and apiSecret must be defined', true);
    }

    config = new Configuration(projectID, apiSecret);
    sdk = new SDK(config);
  });

  test('should handle empty token validation error', async () => {
    expect.assertions(1);

    try {
      const req = {
        token: '',
        clientInfo: { remoteAddress: Utils.testConstants.REMOTE_ADDRESS, userAgent: Utils.testConstants.USER_AGENT },
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
        clientInfo: { remoteAddress: Utils.testConstants.REMOTE_ADDRESS, userAgent: Utils.testConstants.USER_AGENT },
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
        clientInfo: { remoteAddress: Utils.testConstants.REMOTE_ADDRESS, userAgent: Utils.testConstants.USER_AGENT },
      };

      await sdk.authTokens().validate(req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);
      expect((error as ServerError).getHttpStatusCode()).toBe(404);
    }
  });
});
