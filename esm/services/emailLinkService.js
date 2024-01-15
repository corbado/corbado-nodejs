import { BaseError, httpStatusCodes } from '../errors/index.js';
import { Assert, Helper, isErrorRsp } from '../helpers/index.js';
import { EmailMagicLinksApi, } from '../generated/index.js';
class EmailLink {
    constructor(axios) {
        Assert.notNull(axios, 'EmailLink Axios instance must not be null');
        this.client = new EmailMagicLinksApi(undefined, '', axios);
    }
    async send(req) {
        Assert.notNull(req, 'EmailLink.send() "req" param must not be null');
        try {
            const sendRsp = await this.client.emailLinkSend(req);
            const sendResponse = sendRsp.data;
            return sendResponse;
        }
        catch (error) {
            throw Helper.convertToServerError(error, 'EmailLink.send()');
        }
    }
    async validate(emailLinkID, req) {
        Assert.notEmptyString(emailLinkID, 'EmailLink.validate() "emailLinkID" must not be an empty string');
        Assert.notNull(req, 'EmailLink.validate() "req" param must not be null');
        try {
            const validationRsp = await this.client.emailLinkValidate(emailLinkID, req);
            const validationResponse = validationRsp.data;
            if (isErrorRsp(validationResponse)) {
                throw new BaseError('Email Link Validation ErrorRsp', httpStatusCodes.AUTH_RSP_ERROR.code, httpStatusCodes.AUTH_RSP_ERROR.description, httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return validationResponse;
        }
        catch (error) {
            throw Helper.convertToServerError(error, 'EmailLink.validate()');
        }
    }
    async get(emailLinkID) {
        Assert.notEmptyString(emailLinkID, 'EmailLink.get() "emailLinkID" param must not be an empty string');
        try {
            const getEmailRsp = await this.client.emailLinkGet(emailLinkID);
            const getEmailResponse = getEmailRsp.data;
            return getEmailResponse;
        }
        catch (error) {
            throw Helper.convertToServerError(error, 'EmailLink.get()');
        }
    }
}
export default EmailLink;
//# sourceMappingURL=emailLinkService.js.map