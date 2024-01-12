"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../errors/index.js");
const index_js_2 = require("../heplers/index.js");
const index_js_3 = require("../generated/index.js");
class Validation {
    constructor(axios) {
        index_js_2.Assert.notNull(axios, 'Validation Axios instance must not be null');
        this.client = new index_js_3.ValidationApi(undefined, '', axios);
    }
    async validateEmail(req) {
        index_js_2.Assert.notNull(req, 'Validation.email() "req" param must not be null');
        try {
            const emailValidationRsp = await this.client.validateEmail(req);
            const emailValidationResponse = emailValidationRsp.data;
            if ((0, index_js_2.isErrorRsp)(emailValidationResponse)) {
                throw new index_js_1.BaseError('Email validation ErrorRsp', index_js_1.httpStatusCodes.AUTH_RSP_ERROR.code, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.description, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return emailValidationResponse;
        }
        catch (error) {
            throw index_js_2.Helper.convertToServerError(error, 'Validation.validateEmail()');
        }
    }
    async validatePhoneNumber(req) {
        index_js_2.Assert.notNull(req, 'Validation.validatePhoneNumber() "req" param must not be null');
        try {
            const phoneValidationRsp = await this.client.validatePhoneNumber(req);
            const phoneValidationResponse = phoneValidationRsp.data;
            if ((0, index_js_2.isErrorRsp)(phoneValidationResponse)) {
                throw new index_js_1.BaseError('Phone number validation ErrorRsp', index_js_1.httpStatusCodes.AUTH_RSP_ERROR.code, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.description, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return phoneValidationResponse;
        }
        catch (error) {
            throw index_js_2.Helper.convertToServerError(error, 'Validation.validatePhoneNumber()');
        }
    }
}
exports.default = Validation;
//# sourceMappingURL=validationService.js.map