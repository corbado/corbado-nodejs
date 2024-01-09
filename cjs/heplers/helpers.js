"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../errors/index.js");
const assert_js_1 = require("./assert.js");
class Helper {
    static jsonEncode(data) {
        const json = JSON.stringify(data);
        if (!json) {
            throw new index_js_1.BaseError('JSONEncodeError', 500, 'json_encode() failed', true);
        }
        return json;
    }
    static jsonDecode(data) {
        assert_js_1.default.notEmptyString(data);
        try {
            return JSON.parse(data);
        }
        catch (error) {
            throw new index_js_1.BaseError('JSONDecodeError', 500, 'json_decode() failed', true);
        }
    }
    static isErrorHttpStatusCode(statusCode) {
        return statusCode >= 300;
    }
    static throwServerExceptionOld(data) {
        assert_js_1.default.keysInObject(['httpStatusCode', 'message', 'requestData', 'runtime'], data);
        const errorData = { ...data, error: data.error || {} };
        throw new index_js_1.ServerError(errorData.httpStatusCode, 'ServerError', errorData.requestData, errorData.runtime, errorData.error);
    }
    static convertToServerException(errorObj) {
        const error = errorObj;
        const body = error.getResponseBody ? error.getResponseBody() : '';
        if (typeof body !== 'string') {
            throw new index_js_1.BaseError('ApiResponseError', index_js_1.httpStatusCodes.API_RESPONSE_ERROR.code, index_js_1.httpStatusCodes.API_RESPONSE_ERROR.description, index_js_1.httpStatusCodes.API_RESPONSE_ERROR.isOperational);
        }
        const data = Helper.jsonDecode(body);
        return new index_js_1.ServerError(data.httpStatusCode, 'ServerError', data.requestData, data.runtime, data.error);
    }
    static hydrateRequestData(data) {
        assert_js_1.default.keysInObject(['requestID', 'link'], data);
        const requestData = { requestID: data.requestID, link: data.link };
        return requestData;
    }
    static hydrateResponse(data) {
        assert_js_1.default.keysInObject(['httpStatusCode', 'message', 'requestData', 'runtime'], data);
        const requestData = Helper.hydrateRequestData(data.requestData);
        const { httpStatusCode, message, runtime } = data;
        const response = { httpStatusCode, message, requestData, runtime };
        return response;
    }
}
exports.default = Helper;
//# sourceMappingURL=helpers.js.map