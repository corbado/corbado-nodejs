import { BaseError } from 'src/errors';
import Assert, { isErrorRsp } from 'src/heplers/assert';
import Helper from 'src/heplers/helpers';
import httpStatusCodes from 'src/errors/httpStatusCodes';
import {
  EmailCodeSendReq,
  EmailCodeSendRsp,
  EmailCodeValidateReq,
  EmailCodeValidateRsp,
  EmailOTPApi,
} from '../generated';

interface EmailOTPInterface {
  send(req: EmailCodeSendReq): Promise<EmailCodeSendRsp>;
  validate(id: string, req: EmailCodeValidateReq): Promise<EmailCodeValidateRsp>;
}

class EmailOTPService implements EmailOTPInterface {
  private client: EmailOTPApi;

  constructor(client: EmailOTPApi) {
    Assert.notNull(client);
    this.client = client;
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
      const rsp = response.data; // Extract the data property from Axios

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

export default EmailOTPService;
