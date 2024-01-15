"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../errors/index.js");
const index_js_2 = require("../helpers/index.js");
const index_js_3 = require("../generated/index.js");
class EmailOTP {
    constructor(axios) {
        index_js_2.Assert.notNull(axios, 'EmailOtp Axios instance must not be null');
        this.client = new index_js_3.EmailOTPApi(undefined, '', axios);
    }
    async send(req) {
        index_js_2.Assert.notNull(req, 'EmailOtp.send() param must not be null');
        try {
            const response = await this.client.emailCodeSend(req);
            const rsp = response.data;
            if ((0, index_js_2.isErrorRsp)(rsp)) {
                throw new index_js_1.BaseError('Email OTP send ErrorRsp', index_js_1.httpStatusCodes.AUTH_RSP_ERROR.code, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.description, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return rsp;
        }
        catch (error) {
            throw index_js_2.Helper.convertToServerError(error, 'EmailOtp.send()');
        }
    }
    async validate(id, req) {
        index_js_2.Assert.notEmptyString(id, 'EmailOtp.validate() "id" param must not be an empty string');
        index_js_2.Assert.notNull(req, 'EmailOtp.validate() "req" param must not be null');
        try {
            const response = await this.client.emailCodeValidate(id, req);
            const rsp = response.data;
            if ((0, index_js_2.isErrorRsp)(rsp)) {
                throw new index_js_1.BaseError('Email OTP validation ErrorRsp', index_js_1.httpStatusCodes.AUTH_RSP_ERROR.code, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.description, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return rsp;
        }
        catch (error) {
            throw index_js_2.Helper.convertToServerError(error, 'EmailOtp.validate()');
        }
    }
}
exports.default = EmailOTP;
//# sourceMappingURL=emailOtpService.js.map