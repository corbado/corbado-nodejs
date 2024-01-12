"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../errors/index.js");
const index_js_2 = require("../heplers/index.js");
const index_js_3 = require("../generated/index.js");
class EmailLink {
    constructor(axios) {
        index_js_2.Assert.notNull(axios, 'EmailLink Axios instance must not be null');
        this.client = new index_js_3.EmailMagicLinksApi(undefined, '', axios);
    }
    async send(req) {
        index_js_2.Assert.notNull(req, 'EmailLink.send() "req" param must not be null');
        try {
            const sendRsp = await this.client.emailLinkSend(req);
            const sendResponse = sendRsp.data;
            return sendResponse;
        }
        catch (error) {
            throw index_js_2.Helper.convertToServerError(error, 'EmailLink.send()');
        }
    }
    async validate(emailLinkID, req) {
        index_js_2.Assert.notEmptyString(emailLinkID, 'EmailLink.validate() "emailLinkID" must not be an empty string');
        index_js_2.Assert.notNull(req, 'EmailLink.validate() "req" param must not be null');
        try {
            const validationRsp = await this.client.emailLinkValidate(emailLinkID, req);
            const validationResponse = validationRsp.data;
            if ((0, index_js_2.isErrorRsp)(validationResponse)) {
                throw new index_js_1.BaseError('Email Link Validation ErrorRsp', index_js_1.httpStatusCodes.AUTH_RSP_ERROR.code, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.description, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return validationResponse;
        }
        catch (error) {
            throw index_js_2.Helper.convertToServerError(error, 'EmailLink.validate()');
        }
    }
    async get(emailLinkID) {
        index_js_2.Assert.notEmptyString(emailLinkID, 'EmailLink.get() "emailLinkID" param must not be an empty string');
        try {
            const getEmailRsp = await this.client.emailLinkGet(emailLinkID);
            const getEmailResponse = getEmailRsp.data;
            return getEmailResponse;
        }
        catch (error) {
            throw index_js_2.Helper.convertToServerError(error, 'EmailLink.get()');
        }
    }
}
exports.default = EmailLink;
//# sourceMappingURL=emailLinkService.js.map