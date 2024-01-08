import { AxiosInstance } from 'axios';
import Assert, { isErrorRsp } from 'src/heplers/assert';
import Helper from 'src/heplers/helpers';
import { BaseError } from 'src/errors';
import httpStatusCodes from 'src/errors/httpStatusCodes';
import {
  EmailLinkGetRsp,
  EmailLinkSendReq,
  EmailLinkSendRsp,
  EmailLinksValidateReq,
  EmailLinkValidateRsp,
  EmailMagicLinksApi,
} from '../generated';

export interface EmailLinkInterface {
  send(req: EmailLinkSendReq): Promise<EmailLinkSendRsp>;
  validate(emailLinkID: string, req: EmailLinksValidateReq): Promise<EmailLinkValidateRsp>;
  get(emailLinkID: string): Promise<EmailLinkGetRsp>;
}

class EmailLink implements EmailLinkInterface {
  private client: EmailMagicLinksApi;

  constructor(axios: AxiosInstance) {
    Assert.notNull(axios);
    this.client = new EmailMagicLinksApi(undefined, '', axios);
  }

  async send(req: EmailLinkSendReq): Promise<EmailLinkSendRsp> {
    Assert.notNull(req);

    try {
      const sendRsp = await this.client.emailLinkSend(req);
      const sendResponse = sendRsp.data;
      return sendResponse;
    } catch (error) {
      throw Helper.convertToServerException(error);
    }
  }

  async validate(emailLinkID: string, req: EmailLinksValidateReq): Promise<EmailLinkValidateRsp> {
    Assert.notEmptyString(emailLinkID);
    Assert.notNull(req);

    try {
      const validationRsp = await this.client.emailLinkValidate(emailLinkID, req);
      const validationResponse = validationRsp.data;

      if (isErrorRsp(validationResponse)) {
        throw new BaseError(
          'Email Link Validation ErrorRsp',
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

  async get(emailLinkID: string): Promise<EmailLinkGetRsp> {
    Assert.notEmptyString(emailLinkID);

    try {
      const getEmailRsp = await this.client.emailLinkGet(emailLinkID);
      const getEmailResponse = getEmailRsp.data;
      return getEmailResponse;
    } catch (error) {
      throw Helper.convertToServerException(error);
    }
  }
}

export default EmailLink;
