"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../errors/index.js");
const index_js_2 = require("../heplers/index.js");
const index_js_3 = require("../generated/index.js");
class SmsOTP {
    constructor(axios) {
        index_js_2.Assert.notNull(axios, 'SmsOtp Axios instance must not be null');
        this.client = new index_js_3.SMSOTPApi(undefined, '', axios);
    }
    async send(req) {
        index_js_2.Assert.notNull(req, 'SmsOtp.send() "req" param must not be null');
        try {
            const sendRsp = await this.client.smsCodeSend(req);
            const sendResponse = sendRsp.data;
            if ((0, index_js_2.isErrorRsp)(sendResponse)) {
                throw new index_js_1.BaseError('Sms OTP send ErrorRsp', index_js_1.httpStatusCodes.AUTH_RSP_ERROR.code, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.description, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return sendResponse;
        }
        catch (error) {
            throw index_js_2.Helper.convertToServerError(error, 'SmsOtp.send()');
        }
    }
    async validate(id, req) {
        index_js_2.Assert.notEmptyString(id, 'SmsOtp.validate() "id" param must not be empty');
        index_js_2.Assert.notNull(req, 'SmsOtp.validate() "req" param must not be null');
        try {
            const validationRsp = await this.client.smsCodeValidate(id, req);
            const validationResponse = validationRsp.data;
            if ((0, index_js_2.isErrorRsp)(validationResponse)) {
                throw new index_js_1.BaseError('Sms OTP validation ErrorRsp', index_js_1.httpStatusCodes.AUTH_RSP_ERROR.code, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.description, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return validationResponse;
        }
        catch (error) {
            throw index_js_2.Helper.convertToServerError(error, 'SmsOtp.validate()');
        }
    }
}
exports.default = SmsOTP;
//# sourceMappingURL=smsOtpService.js.map