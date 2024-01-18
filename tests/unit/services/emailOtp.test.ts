import AxiosMockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import { BaseError } from '../../../src/errors';
import { EmailCodeSendReq, EmailCodeValidateReq } from '../../../src/generated';
import { EmailOTP } from '../../../src/services';
import Utils from '../../utils';

const emailOtpSendResponse = {
  httpStatusCode: 200,
  message: 'Success',
  requestData: {
    requestID: Utils.testConstants.TEST_EMAILLINK_ID,
    link: Utils.testConstants.TEST_REDIRECT_URL,
  },
  runtime: Utils.testConstants.TEST_RUNTIME,
  data: { emailCodeID: Utils.testConstants.TEST_EMAILLINK_ID },
};

describe('EmailOtp class', () => {
  let axiosInstance: AxiosInstance;
  let mock: AxiosMockAdapter;

  beforeEach(() => {
    ({ axiosInstance, mock } = Utils.MockAxiosInstance());
  });

  afterEach(() => {
    Utils.restoreMock(mock);
  });

  it('should create EmailOTP instance with AxiosInstance', () => {
    const emailOTP = new EmailOTP(axiosInstance);
    expect(emailOTP).toBeInstanceOf(EmailOTP);
  });

  it('should send email code and return EmailCodeSendRsp', async () => {
    const emailOTP = new EmailOTP(axiosInstance);
    const req = {
      email: Utils.createRandomTestEmail(),
      create: true,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    mock.onPost().reply(200, emailOtpSendResponse);

    const rsp = await emailOTP.send(req);

    expect(rsp).toEqual(emailOtpSendResponse);
  });

  it('should throw error when creating EmailOTP instance without AxiosInstance', () => {
    const undefinedAxiosInstance = undefined as unknown as AxiosInstance;
    expect(() => new EmailOTP(undefinedAxiosInstance)).toThrow(BaseError);
  });

  it('should throw BaseError when calling EmailOTP.send() with null or undefined', async () => {
    const emailOTP = new EmailOTP(axiosInstance);
    const req = null as unknown as EmailCodeSendReq;
    await expect(emailOTP.send(req)).rejects.toThrow(BaseError);
  });

  it('should throw BaseError when calling EmailOTP.validate() with null or undefined', async () => {
    const emailOTP = new EmailOTP(axiosInstance);
    const id = '123456';
    const req = null as unknown as EmailCodeValidateReq;
    await expect(emailOTP.validate(id, req)).rejects.toThrow(BaseError);
  });
});
