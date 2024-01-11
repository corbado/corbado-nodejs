import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BaseError } from '../../../src/errors';
import { SmsCodeSendReq, SmsCodeValidateReq } from '../../../src/generated';
import { SmsOTP } from '../../../src/services';

describe('SmsOtp class', () => {
  it('should create SmsOTP instance with valid Axios instance', () => {
    const axiosInstance = { defaults: { headers: { common: {} } } } as AxiosInstance;

    const smsOtp = new SmsOTP(axiosInstance);

    expect(smsOtp).toBeInstanceOf(SmsOTP);
  });

  it('should call SmsOTP.send() with valid SmsCodeSendReq object', async () => {
    const axiosInstance = axios.create();
    const mock = new MockAdapter(axiosInstance);
    mock.onPost('/smsCodeSend').reply(200, {
      data: {
        httpStatusCode: 200,
        message: 'success',
        requestData: { requestID: '123', link: 'http://localhost' },
        runtime: 0,
        data: {},
      },
    });

    const smsOtp = new SmsOTP(axiosInstance);

    const req = {
      phoneNumber: '+49 17663328675',
      create: true,
    } as SmsCodeSendReq;

    const response = await smsOtp.send(req);

    expect(response).toBeDefined();
    expect(response.httpStatusCode).toBe(200);
    expect(response.message).toBe('success');
    expect(response.requestData).toEqual({ requestID: '123', link: 'http://localhost' });
    expect(response.runtime).toBe(0);
    expect(response.data).toEqual({});
  });

  it('should call SmsOTP.validate() with valid id and SmsCodeValidateReq object', async () => {
    const axiosInstance = axios.create();
    const mock = new MockAdapter(axiosInstance);
    mock.onPost('/smsCodeSend').reply(200, {
      data: {
        httpStatusCode: 200,
        message: 'success',
        requestData: { requestID: '123', link: 'http://localhost' },
        runtime: 0,
        loginToken: 'token',
      },
    });

    const smsOtp = new SmsOTP(axiosInstance);

    const req = { smsCode: '123456' } as SmsCodeValidateReq;

    const response = await smsOtp.validate('id', req);

    expect(response).toBeDefined();
    expect(response.httpStatusCode).toBe(200);
    expect(response.message).toBe('success');
    expect(response.requestData).toEqual({ requestID: '123', link: 'http://localhost' });
    expect(response.runtime).toBe(0);
    expect(response.loginToken).toBe('token');
  });

  it('should throw an error when creating SmsOTP instance with invalid Axios instance', () => {
    const axiosInstance = undefined as unknown as AxiosInstance;

    expect(() => new SmsOTP(axiosInstance)).toThrow();
  });

  it('should throw a BaseError when calling SmsOTP.send() with null SmsCodeSendReq object', async () => {
    const axiosInstance = axios.create();
    const mock = new MockAdapter(axiosInstance);
    mock.onPost('/smsCodeSend').reply(200, {
      data: {
        httpStatusCode: 200,
        message: 'success',
        requestData: { requestID: '123', link: 'http://localhost' },
        runtime: 0,
        loginToken: 'token',
      },
    });

    const smsOtp = new SmsOTP(axiosInstance);

    const req = null as unknown as SmsCodeSendReq;

    await expect(smsOtp.send(req)).rejects.toThrow(BaseError);
  });

  it('should throw a BaseError when calling SmsOTP.validate() with empty id', async () => {
    const axiosInstance = axios.create();
    const mock = new MockAdapter(axiosInstance);
    mock.onPost('/smsCodeSend').reply(200, {
      data: {
        httpStatusCode: 200,
        message: 'success',
        requestData: { requestID: '123', link: 'http://localhost' },
        runtime: 0,
        loginToken: 'token',
      },
    });

    const smsOtp = new SmsOTP(axiosInstance);

    const req = { smsCode: '123456' } as SmsCodeValidateReq;

    await expect(smsOtp.validate('', req)).rejects.toThrow(BaseError);
  });
});
