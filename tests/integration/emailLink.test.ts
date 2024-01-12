import { Configuration, SDK } from '../../src';
import { BaseError, ServerError } from '../../src/errors';
import Utils from '../utils';

describe('EmailLink Validation Tests', () => {
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

  test('should handle empty email and redirect error', async () => {
    expect.assertions(2);

    try {
      const req = { create: true, email: '', redirect: '' };

      await sdk.emailLinks().send(req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);
      expect((error as ServerError).getValidationMessages()).toEqual([
        'redirect: cannot be blank',
        'email: cannot be blank',
      ]);
    }
  });

  test('should handle successful email send', async () => {
    expect.assertions(1);

    const req = { create: true, email: Utils.createRandomTestEmail(), redirect: Utils.testConstants.REDIRECT_URL };

    const response = await sdk.emailLinks().send(req);
    expect(response.httpStatusCode).toEqual(200);
  });

  test('should handle empty token', async () => {
    expect.assertions(2);

    try {
      const req = { token: '' };

      await sdk.emailLinks().validate(Utils.testConstants.TEST_EMAILLINK_ID, req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);

      expect((error as ServerError).getValidationMessages()).toEqual(['token: cannot be blank']);
    }
  });

  test('should handle invalid Id', async () => {
    expect.assertions(2);

    try {
      const req = { token: Utils.testConstants.TEST_TOKEN };

      await sdk.emailLinks().validate(Utils.testConstants.TEST_EMAILLINK_ID, req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);

      expect(error.httpStatusCode).toEqual(404);
    }
  });

  test('should handle empty token', async () => {
    expect.assertions(2);

    try {
      const req = { token: '' };

      await sdk.emailLinks().validate(Utils.testConstants.TEST_EMAILLINK_ID, req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);

      expect((error as ServerError).getValidationMessages()).toEqual(['token: cannot be blank']);
    }
  });
});
