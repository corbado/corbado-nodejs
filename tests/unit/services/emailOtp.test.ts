import AxiosMockAdapter from 'axios-mock-adapter';
import axios, { AxiosInstance } from 'axios';
import { BaseError } from '../../../src/errors';
import { EmailCodeSendReq, EmailCodeValidateReq } from '../../../src/generated';
import { EmailOTP } from '../../../src/services';
import Utils from '../../utils';

describe('EmailOtp class', () => {
  let axiosInstance: AxiosInstance;
  let mock: AxiosMockAdapter;

  beforeEach(() => {
    axiosInstance = axios.create();
    mock = new AxiosMockAdapter(axiosInstance);
  });

  afterEach(() => {
    // Necessary to disable the eslint rule for this line because of the way the mock is defined
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    mock.restore();
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
    mock.onPost().reply(200, {
      httpStatusCode: 200,
      message: 'Success',
      requestData: {
        requestID: '123',
        link: 'http://example.com',
      },
      runtime: 100,
      data: { emailCodeID: '123' },
    });

    const rsp = await emailOTP.send(req);

    expect(rsp).toEqual({
      httpStatusCode: 200,
      message: 'Success',
      requestData: {
        requestID: '123',
        link: 'http://example.com',
      },
      runtime: 100,
      data: { emailCodeID: '123' },
    });
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
