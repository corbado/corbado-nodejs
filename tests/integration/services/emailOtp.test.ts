import { SDK } from '../../../src';
import { ServerError } from '../../../src/errors';
import Utils from '../../utils';

describe('EmailOtp Validation Tests', () => {
  let sdk: SDK;

  beforeEach(() => {
    sdk = Utils.SDK();
  });

  test('should handle empty email error', async () => {
    expect.assertions(2);

    try {
      const req = { create: true, email: Utils.testConstants.TEST_EMPTY_STRING };

      await sdk.emailOtps().send(req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);
      expect((error as ServerError).getValidationMessages()).toEqual(['email: cannot be blank']);
    }
  });

  test('should handle successful email send', async () => {
    expect.assertions(1);

    const req = { create: true, email: Utils.createRandomTestEmail() };

    const response = await sdk.emailOtps().send(req);
    expect(response.httpStatusCode).toEqual(200);
  });

  test('should handle empty code', async () => {
    expect.assertions(2);

    try {
      const req = { code: Utils.testConstants.TEST_EMPTY_STRING };

      await sdk.emailOtps().validate(Utils.testConstants.TEST_EMAILOTP_ID, req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);

      expect((error as ServerError).getValidationMessages()).toEqual(['code: cannot be blank']);
    }
  });

  test('should handle invalid code', async () => {
    expect.assertions(2);

    try {
      const req = { code: '1' };

      await sdk.emailOtps().validate(Utils.testConstants.TEST_EMAILOTP_ID, req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);

      expect((error as ServerError).getValidationMessages()).toEqual(['code: the length must be exactly 6']);
    }
  });

  test('should handle invalid Id', async () => {
    expect.assertions(2);

    try {
      const req = { code: '123456' };

      await sdk.emailOtps().validate(Utils.testConstants.TEST_EMAILOTP_ID, req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);

      expect((error as ServerError).httpStatusCode).toEqual(404);
    }
  });

  test('should handle validation success', async () => {
    try {
      const req = { create: true, email: Utils.createRandomTestEmail() };

      const sendResponse = await sdk.emailOtps().send(req);
      expect(sendResponse.httpStatusCode).toEqual(200);

      const validateReq = { code: '150919' };
      const validateSendReq = await sdk.emailOtps().validate(sendResponse.data.emailCodeID, validateReq);
      expect(validateSendReq.httpStatusCode).toEqual(200);
    } catch (error) {
      expect(error).toBe(null);
    }
  });
});
