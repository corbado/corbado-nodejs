"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../errors/index.js");
const index_js_2 = require("../heplers/index.js");
const index_js_3 = require("../generated/index.js");
class EmailOTP {
    constructor(axios) {
        index_js_2.Assert.notNull(axios);
        this.client = new index_js_3.EmailOTPApi(undefined, '', axios);
    }
    async send(req) {
        index_js_2.Assert.notNull(req);
        try {
            const response = await this.client.emailCodeSend(req);
            const rsp = response.data;
            if ((0, index_js_2.isErrorRsp)(rsp)) {
                throw new index_js_1.BaseError('Email OTP send ErrorRsp', index_js_1.httpStatusCodes.AUTH_RSP_ERROR.code, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.description, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return rsp;
        }
        catch (error) {
            throw index_js_2.Helper.convertToServerException(error);
        }
    }
    async validate(id, req) {
        index_js_2.Assert.notEmptyString(id);
        index_js_2.Assert.notNull(req);
        try {
            const response = await this.client.emailCodeValidate(id, req);
            const rsp = response.data;
            if ((0, index_js_2.isErrorRsp)(rsp)) {
                throw new index_js_1.BaseError('Emaiil OTP validation ErrorRsp', index_js_1.httpStatusCodes.AUTH_RSP_ERROR.code, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.description, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return rsp;
        }
        catch (error) {
            throw index_js_2.Helper.convertToServerException(error);
        }
    }
}
exports.default = EmailOTP;
//# sourceMappingURL=emailOtpService.js.map