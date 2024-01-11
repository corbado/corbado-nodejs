import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BaseError } from '../../../src/errors';
import { EmailCodeSendReq, EmailCodeValidateReq, EmailCodeValidateRsp } from '../../../src/generated';
import { EmailOTP } from '../../../src/services';

describe('EmailOtp class', () => {
  let axiosInstance: AxiosInstance;

  beforeEach(() => {
    axiosInstance = axios.create();
    const mock = new MockAdapter(axiosInstance);
    mock.onPost('/test-url').reply(200, {
      data: {
        httpStatusCode: 200,
        message: 'success',
        requestData: { requestID: '123', link: 'http://localhost' },
        runtime: 0,
        data: {},
      },
    });
  });

  it('should create EmailOTP instance with AxiosInstance', () => {
    const emailOTP = new EmailOTP(axiosInstance);
    expect(emailOTP).toBeInstanceOf(EmailOTP);
  });

  it('should send email code and return EmailCodeSendRsp', async () => {
    const emailOTP = new EmailOTP(axiosInstance);
    const req: EmailCodeSendReq = {
      email: 'test@example.com',
      create: true,
    };

    const rsp = await emailOTP.send(req);

    expect(rsp).toEqual(
      expect.objectContaining({
        httpStatusCode: expect.any(Number) as number,
        message: expect.any(String) as string,
        requestData: expect.objectContaining({
          requestID: expect.any(String) as string,
          link: expect.any(String) as string,
        }) as object,
        runtime: expect.any(Number) as number,
        data: expect.objectContaining({ emailCodeID: expect.any(String) as string }) as object,
      }),
    );
  });

  it('should validate email code and return EmailCodeValidateRsp', async () => {
    const emailOTP = new EmailOTP(axiosInstance);

    const id = '123456';
    const req: EmailCodeValidateReq = { code: '123456' };
    const expectedRsp: EmailCodeValidateRsp = {
      httpStatusCode: 200,
      message: 'Email code validated successfully',
      requestData: {
        requestID: '123456',
        link: 'https://example.com',
      },
      runtime: 100,
      userID: '123',
      userFullName: 'John Doe',
      userEmail: 'test@example.com',
    };
    const rsp = await emailOTP.validate(id, req);

    expect(rsp).toEqual(expectedRsp);
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
