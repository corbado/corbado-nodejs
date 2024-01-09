import { AxiosInstance } from 'axios';
import { BaseError, httpStatusCodes } from '../errors/index.js';
import { Assert, isErrorRsp, Helper } from '../heplers/index.js';
import {
  EmailCodeSendReq,
  EmailCodeSendRsp,
  EmailCodeValidateReq,
  EmailCodeValidateRsp,
  EmailOTPApi,
} from '../generated/index.js';

export interface EmailOTPInterface {
  send(req: EmailCodeSendReq): Promise<EmailCodeSendRsp>;
  validate(id: string, req: EmailCodeValidateReq): Promise<EmailCodeValidateRsp>;
}

class EmailOTP implements EmailOTPInterface {
  private client: EmailOTPApi;

  constructor(axios: AxiosInstance) {
    Assert.notNull(axios);
    this.client = new EmailOTPApi(undefined, '', axios);
  }

  async send(req: EmailCodeSendReq): Promise<EmailCodeSendRsp> {
    Assert.notNull(req);

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
      throw Helper.convertToServerException(error);
    }
  }

  async validate(id: string, req: EmailCodeValidateReq): Promise<EmailCodeValidateRsp> {
    Assert.notEmptyString(id);
    Assert.notNull(req);

    try {
      const response = await this.client.emailCodeValidate(id, req);
      const rsp = response.data;

      if (isErrorRsp(rsp)) {
        throw new BaseError(
          'Emaiil OTP validation ErrorRsp',
          httpStatusCodes.AUTH_RSP_ERROR.code,
          httpStatusCodes.AUTH_RSP_ERROR.description,
          httpStatusCodes.AUTH_RSP_ERROR.isOperational,
        );
      }

      return rsp;
    } catch (error) {
      throw Helper.convertToServerException(error);
    }
  }
}

export default EmailOTP;
