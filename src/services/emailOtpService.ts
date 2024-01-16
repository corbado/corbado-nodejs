import { AxiosInstance } from 'axios';
import { BaseError, httpStatusCodes } from '../errors/index';
import { Assert, isErrorRsp, Helper } from '../helpers/index';
import {
  EmailCodeSendReq,
  EmailCodeSendRsp,
  EmailCodeValidateReq,
  EmailCodeValidateRsp,
  EmailOTPApi,
} from '../generated/index';

export interface EmailOTPInterface {
  send(req: EmailCodeSendReq): Promise<EmailCodeSendRsp>;
  validate(id: string, req: EmailCodeValidateReq): Promise<EmailCodeValidateRsp>;
}

class EmailOTP implements EmailOTPInterface {
  private client: EmailOTPApi;

  constructor(axios: AxiosInstance) {
    Assert.notNull(axios, 'EmailOtp Axios instance must not be null');
    this.client = new EmailOTPApi(undefined, '', axios);
  }

  async send(req: EmailCodeSendReq): Promise<EmailCodeSendRsp> {
    Assert.notNull(req, 'EmailOtp.send() param must not be null');

    try {
      const response = await this.client.emailCodeSend(req);
      const rsp = response.data;

      if (isErrorRsp(rsp)) {
        throw new BaseError(
          'Email OTP send ErrorRsp',
          httpStatusCodes.AUTH_RSP_ERROR.code,
          httpStatusCodes.AUTH_RSP_ERROR.description,
          httpStatusCodes.AUTH_RSP_ERROR.isOperational,
        );
      }

      return rsp;
    } catch (error) {
      throw Helper.convertToServerError(error, 'EmailOtp.send()');
    }
  }

  async validate(id: string, req: EmailCodeValidateReq): Promise<EmailCodeValidateRsp> {
    Assert.notEmptyString(id, 'EmailOtp.validate() "id" param must not be an empty string');
    Assert.notNull(req, 'EmailOtp.validate() "req" param must not be null');

    try {
      const response = await this.client.emailCodeValidate(id, req);
      const rsp = response.data;

      if (isErrorRsp(rsp)) {
        throw new BaseError(
          'Email OTP validation ErrorRsp',
          httpStatusCodes.AUTH_RSP_ERROR.code,
          httpStatusCodes.AUTH_RSP_ERROR.description,
          httpStatusCodes.AUTH_RSP_ERROR.isOperational,
        );
      }

      return rsp;
    } catch (error) {
      throw Helper.convertToServerError(error, 'EmailOtp.validate()');
    }
  }
}

export default EmailOTP;
