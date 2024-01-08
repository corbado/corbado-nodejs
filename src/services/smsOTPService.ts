import httpStatusCodes from 'src/errors/httpStatusCodes';
import { BaseError } from 'src/errors';
import Assert, { isErrorRsp } from 'src/heplers/assert';
import Helper from 'src/heplers/helpers';
import { SmsCodeSendReq, SmsCodeSendRsp, SmsCodeValidateReq, SmsCodeValidateRsp, SMSOTPApi } from '../generated';

interface SmsOTPInterface {
  send(req: SmsCodeSendReq): Promise<SmsCodeSendRsp>;
  validate(id: string, req: SmsCodeValidateReq): Promise<SmsCodeValidateRsp>;
}

class SmsOTPService implements SmsOTPInterface {
  private client: SMSOTPApi;

  constructor(client: SMSOTPApi) {
    Assert.notNull(client);
    this.client = client;
  }

  async send(req: SmsCodeSendReq): Promise<SmsCodeSendRsp> {
    Assert.notNull(req);

    try {
      const sendRsp = await this.client.smsCodeSend(req);
      const sendResponse = sendRsp.data;

      if (isErrorRsp(sendResponse)) {
        throw new BaseError(
          'Sms OTP send ErrorRsp',
          httpStatusCodes.AUTH_RSP_ERROR.code,
          httpStatusCodes.AUTH_RSP_ERROR.description,
          httpStatusCodes.AUTH_RSP_ERROR.isOperational,
        );
      }

      return sendResponse;
    } catch (error) {
      throw Helper.convertToServerException(error);
    }
  }

  async validate(id: string, req: SmsCodeValidateReq): Promise<SmsCodeValidateRsp> {
    Assert.notEmptyString(id);
    Assert.notNull(req);

    try {
      const validationRsp = await this.client.smsCodeValidate(id, req);
      const validationResponse = validationRsp.data;

      if (isErrorRsp(validationResponse)) {
        throw new BaseError(
          'Sms OTP validation ErrorRsp',
          httpStatusCodes.AUTH_RSP_ERROR.code,
          httpStatusCodes.AUTH_RSP_ERROR.description,
          httpStatusCodes.AUTH_RSP_ERROR.isOperational,
        );
      }

      return validationResponse;
    } catch (error) {
      throw Helper.convertToServerException(error);
    }
  }
}

export default SmsOTPService;
