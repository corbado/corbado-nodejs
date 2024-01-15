"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../helpers/index.js");
const index_js_2 = require("../errors/index.js");
const index_js_3 = require("../generated/index.js");
class AuthToken {
    constructor(axios) {
        index_js_1.Assert.notNull(axios, 'AuthToken Axios instance must not be null');
        this.client = new index_js_3.AuthTokensApi(undefined, '', axios);
    }
    async validate(req) {
        index_js_1.Assert.notNull(req, 'AuthToken.validate() param must not be null');
        try {
            const validateRsp = await this.client.authTokenValidate(req);
            const response = validateRsp.data;
            if ((0, index_js_1.isErrorRsp)(response)) {
                throw new index_js_2.BaseError('ErrorRsp', index_js_2.httpStatusCodes.AUTH_RSP_ERROR.code, index_js_2.httpStatusCodes.AUTH_RSP_ERROR.description, index_js_2.httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return response;
        }
        catch (error) {
            if (error instanceof Error) {
                throw index_js_1.Helper.convertToServerError(error, 'AuthToken.validate()');
            }
            throw new index_js_2.BaseError('Unknown auth token error', index_js_2.httpStatusCodes.AUTH_TOKEN_ERROR.code, index_js_2.httpStatusCodes.AUTH_TOKEN_ERROR.description, index_js_2.httpStatusCodes.AUTH_TOKEN_ERROR.isOperational);
        }
    }
}
exports.default = AuthToken;
//# sourceMappingURL=authTokenService.js.map