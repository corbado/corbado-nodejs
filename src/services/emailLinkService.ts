import { AxiosInstance } from 'axios';
import { BaseError, httpStatusCodes } from '../errors/index';
import { Assert, Helper, isErrorRsp } from '../helpers/index';
import {
  EmailLinkGetRsp,
  EmailLinkSendReq,
  EmailLinkSendRsp,
  EmailLinksValidateReq,
  EmailLinkValidateRsp,
  EmailMagicLinksApi,
} from '../generated/index';

export interface EmailLinkInterface {
  send(req: EmailLinkSendReq): Promise<EmailLinkSendRsp>;
  validate(emailLinkID: string, req: EmailLinksValidateReq): Promise<EmailLinkValidateRsp>;
  get(emailLinkID: string): Promise<EmailLinkGetRsp>;
}

class EmailLink implements EmailLinkInterface {
  private client: EmailMagicLinksApi;

  constructor(axios: AxiosInstance) {
    Assert.notNull(axios, 'EmailLink Axios instance must not be null');

    this.client = new EmailMagicLinksApi(undefined, '', axios);
  }

  async send(req: EmailLinkSendReq): Promise<EmailLinkSendRsp> {
    Assert.notNull(req, 'EmailLink.send() "req" param must not be null');

    try {
      const sendRsp = await this.client.emailLinkSend(req);
      const sendResponse = sendRsp.data;
      return sendResponse;
    } catch (error) {
      throw Helper.convertToServerError(error, 'EmailLink.send()');
    }
  }

  async validate(emailLinkID: string, req: EmailLinksValidateReq): Promise<EmailLinkValidateRsp> {
    Assert.notEmptyString(emailLinkID, 'EmailLink.validate() "emailLinkID" must not be an empty string');
    Assert.notNull(req, 'EmailLink.validate() "req" param must not be null');

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
      throw Helper.convertToServerError(error, 'EmailLink.validate()');
    }
  }

  async get(emailLinkID: string): Promise<EmailLinkGetRsp> {
    Assert.notEmptyString(emailLinkID, 'EmailLink.get() "emailLinkID" param must not be an empty string');

    try {
      const getEmailRsp = await this.client.emailLinkGet(emailLinkID);
      const getEmailResponse = getEmailRsp.data;
      return getEmailResponse;
    } catch (error) {
      throw Helper.convertToServerError(error, 'EmailLink.get()');
    }
  }
}

export default EmailLink;
