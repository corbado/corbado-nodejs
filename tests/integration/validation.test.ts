import { SDK } from '../../src';
import { ServerError } from '../../src/errors';
import Utils from '../utils';

describe('Validation Service Tests', () => {
  let sdk: SDK;

  beforeEach(() => {
    sdk = Utils.SDK();
  });

  test('should handle email validation error', async () => {
    expect.assertions(3);

    try {
      const req = { email: Utils.testConstants.TEST_EMPTY_STRING };

      await sdk.validations().validateEmail(req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);
      expect((error as ServerError).httpStatusCode).toEqual(400);
      expect((error as ServerError).getValidationMessages()).toEqual(['email: cannot be blank']);
    }
  });

  test('should handle email validation success', async () => {
    expect.assertions(1);

    const req = { email: Utils.createRandomTestEmail() };

    const validationResponse = await sdk.validations().validateEmail(req);
    expect(validationResponse.data.isValid).toEqual(true);
  });

  test('should handle phoneNumber validation error', async () => {
    expect.assertions(3);

    try {
      const req = { phoneNumber: Utils.testConstants.TEST_EMPTY_STRING };

      await sdk.validations().validatePhoneNumber(req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);
      expect((error as ServerError).httpStatusCode).toEqual(400);
      expect((error as ServerError).getValidationMessages()).toEqual(['phoneNumber: cannot be blank']);
    }
  });

  test('should handle phoneNumber validation success', async () => {
    expect.assertions(1);

    const req = { phoneNumber: Utils.createRandomTestPhoneNumber() };

    const validationResponse = await sdk.validations().validatePhoneNumber(req);
    expect(validationResponse.data.isValid).toEqual(true);
  });
});
