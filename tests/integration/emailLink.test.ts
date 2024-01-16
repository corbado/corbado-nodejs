import { SDK } from '../../src';
import { ServerError } from '../../src/errors';
import Utils from '../utils';

describe('EmailLink Validation Tests', () => {
  let sdk: SDK;

  beforeEach(() => {
    sdk = Utils.SDK();
  });

  test('should handle empty email and redirect error', async () => {
    expect.assertions(2);

    try {
      const req = {
        create: true,
        email: Utils.testConstants.TEST_EMPTY_STRING,
        redirect: Utils.testConstants.TEST_EMPTY_STRING,
      };

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

    try {
      const req = {
        create: true,
        email: Utils.createRandomTestEmail(),
        redirect: Utils.testConstants.TEST_REDIRECT_URL,
      };

      const response = await sdk.emailLinks().send(req);
      expect(response.httpStatusCode).toEqual(200);
    } catch (error) {
      expect(error).toBe(null);
    }
  });

  test('should handle empty token', async () => {
    expect.assertions(2);

    try {
      const req = { token: Utils.testConstants.TEST_EMPTY_STRING };

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

      expect((error as ServerError).httpStatusCode).toEqual(404);
    }
  });

  test('should handle empty token', async () => {
    expect.assertions(2);

    try {
      const req = { token: Utils.testConstants.TEST_EMPTY_STRING };

      await sdk.emailLinks().validate(Utils.testConstants.TEST_EMAILLINK_ID, req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);

      expect((error as ServerError).getValidationMessages()).toEqual(['token: cannot be blank']);
    }
  });
});
