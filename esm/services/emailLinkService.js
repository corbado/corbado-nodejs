import { BaseError, httpStatusCodes } from '../errors/index.js';
import { Assert, Helper, isErrorRsp } from '../heplers/index.js';
import { EmailMagicLinksApi, } from '../generated/index.js';
class EmailLink {
    constructor(axios) {
        Assert.notNull(axios);
        this.client = new EmailMagicLinksApi(undefined, '', axios);
    }
    async send(req) {
        Assert.notNull(req);
        try {
            const sendRsp = await this.client.emailLinkSend(req);
            const sendResponse = sendRsp.data;
            return sendResponse;
        }
        catch (error) {
            throw Helper.convertToServerException(error);
        }
    }
    async validate(emailLinkID, req) {
        Assert.notEmptyString(emailLinkID);
        Assert.notNull(req);
        try {
            const validationRsp = await this.client.emailLinkValidate(emailLinkID, req);
            const validationResponse = validationRsp.data;
            if (isErrorRsp(validationResponse)) {
                throw new BaseError('Email Link Validation ErrorRsp', httpStatusCodes.AUTH_RSP_ERROR.code, httpStatusCodes.AUTH_RSP_ERROR.description, httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return validationResponse;
        }
        catch (error) {
            throw Helper.convertToServerException(error);
        }
    }
    async get(emailLinkID) {
        Assert.notEmptyString(emailLinkID);
        try {
            const getEmailRsp = await this.client.emailLinkGet(emailLinkID);
            const getEmailResponse = getEmailRsp.data;
            return getEmailResponse;
        }
        catch (error) {
            throw Helper.convertToServerException(error);
        }
    }
}
export default EmailLink;
//# sourceMappingURL=emailLinkService.js.map