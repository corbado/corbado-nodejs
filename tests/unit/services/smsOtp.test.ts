import { AxiosInstance } from 'axios';
import { BaseError } from '../../../src/errors';
import { SmsCodeSendReq, SmsCodeValidateReq } from '../../../src/generated';
import { SmsOTP } from '../../../src/services';
import Utils from '../../utils';

describe('SmsOtp class', () => {
  let axiosInstance: AxiosInstance;

  beforeEach(() => {
    axiosInstance = Utils.AxiosInstance();
  });

  it('should create SmsOTP instance with valid Axios instance', () => {
    const smsOtp = new SmsOTP(axiosInstance);

    expect(smsOtp).toBeInstanceOf(SmsOTP);
  });

  it('should throw an error when creating SmsOTP instance with invalid Axios instance', () => {
    const undefinedAxiosInstance = undefined as unknown as AxiosInstance;

    expect(() => new SmsOTP(undefinedAxiosInstance)).toThrow();
  });

  it('should throw a BaseError when calling SmsOTP.send() with null SmsCodeSendReq object', async () => {
    const smsOtp = new SmsOTP(axiosInstance);

    const req = null as unknown as SmsCodeSendReq;

    await expect(smsOtp.send(req)).rejects.toThrow(BaseError);
  });

  it('should throw a BaseError when calling SmsOTP.validate() with empty id', async () => {
    const smsOtp = new SmsOTP(axiosInstance);

    const req = { smsCode: '123456' } as SmsCodeValidateReq;

    await expect(smsOtp.validate('', req)).rejects.toThrow(BaseError);
  });
});
