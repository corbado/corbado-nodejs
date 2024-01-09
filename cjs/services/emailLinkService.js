"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../errors/index.js");
const index_js_2 = require("../heplers/index.js");
const index_js_3 = require("../generated/index.js");
class EmailLink {
    constructor(axios) {
        index_js_2.Assert.notNull(axios);
        this.client = new index_js_3.EmailMagicLinksApi(undefined, '', axios);
    }
    async send(req) {
        index_js_2.Assert.notNull(req);
        try {
            const sendRsp = await this.client.emailLinkSend(req);
            const sendResponse = sendRsp.data;
            return sendResponse;
        }
        catch (error) {
            throw index_js_2.Helper.convertToServerException(error);
        }
    }
    async validate(emailLinkID, req) {
        index_js_2.Assert.notEmptyString(emailLinkID);
        index_js_2.Assert.notNull(req);
        try {
            const validationRsp = await this.client.emailLinkValidate(emailLinkID, req);
            const validationResponse = validationRsp.data;
            if ((0, index_js_2.isErrorRsp)(validationResponse)) {
                throw new index_js_1.BaseError('Email Link Validation ErrorRsp', index_js_1.httpStatusCodes.AUTH_RSP_ERROR.code, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.description, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return validationResponse;
        }
        catch (error) {
            throw index_js_2.Helper.convertToServerException(error);
        }
    }
    async get(emailLinkID) {
        index_js_2.Assert.notEmptyString(emailLinkID);
        try {
            const getEmailRsp = await this.client.emailLinkGet(emailLinkID);
            const getEmailResponse = getEmailRsp.data;
            return getEmailResponse;
        }
        catch (error) {
            throw index_js_2.Helper.convertToServerException(error);
        }
    }
}
exports.default = EmailLink;
//# sourceMappingURL=emailLinkService.js.map