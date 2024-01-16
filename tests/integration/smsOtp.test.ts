import { SDK } from '../../src';
import { ServerError } from '../../src/errors';
import Utils from '../utils';

describe('SmsOtp Validation Tests', () => {
  let sdk: SDK;

  beforeEach(() => {
    sdk = Utils.SDK();
  });

  test('should handle empty phoneNumber error', async () => {
    expect.assertions(2);

    try {
      const req = { create: true, phoneNumber: Utils.testConstants.TEST_EMPTY_STRING };

      await sdk.smsOtp().send(req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);
      expect((error as ServerError).getValidationMessages()).toEqual(['phoneNumber: cannot be blank']);
    }
  });

  test('should handle successful phoneNumber send', async () => {
    expect.assertions(1);

    const req = { create: true, phoneNumber: Utils.createRandomTestPhoneNumber() };

    const response = await sdk.smsOtp().send(req);
    expect(response.httpStatusCode).toEqual(200);
  });

  test('should handle empty code', async () => {
    expect.assertions(2);

    try {
      const req = { smsCode: Utils.testConstants.TEST_EMPTY_STRING };

      await sdk.smsOtp().validate(Utils.testConstants.TEST_SMSOTP_ID, req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);

      expect((error as ServerError).getValidationMessages()).toEqual(['smsCode: cannot be blank']);
    }
  });

  test('should handle invalid code', async () => {
    expect.assertions(2);

    try {
      const req = { smsCode: '1' };

      await sdk.smsOtp().validate(Utils.testConstants.TEST_SMSOTP_ID, req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);

      expect((error as ServerError).getValidationMessages()).toEqual(['smsCode: the length must be exactly 6']);
    }
  });

  test('should handle invalid Id', async () => {
    expect.assertions(2);

    try {
      const req = { smsCode: '123456' };

      await sdk.smsOtp().validate(Utils.testConstants.TEST_SMSOTP_ID, req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);

      expect((error as ServerError).httpStatusCode).toEqual(404);
    }
  });

  test('should handle validation success', async () => {
    expect.assertions(2);

    const req = { create: true, phoneNumber: Utils.createRandomTestPhoneNumber() };

    const sendResponse = await sdk.smsOtp().send(req);
    expect(sendResponse.httpStatusCode).toEqual(200);

    const validateReq = { smsCode: '150919' };
    const validateSendReq = await sdk.smsOtp().validate(sendResponse.data.smsCodeID, validateReq);
    expect(validateSendReq.httpStatusCode).toEqual(200);
  });
});
