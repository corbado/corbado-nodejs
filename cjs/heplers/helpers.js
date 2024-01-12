"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
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
        assert_js_1.default.notEmptyString(data, 'Helper.jsonDecode() data must not be an empty string');
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
        assert_js_1.default.keysInObject(['httpStatusCode', 'message', 'requestData', 'runtime'], data, 'Helper.throwServerException() "data" param must contain all required keys: httpStatusCode, message, requestData, runtime');
        const errorData = { ...data, error: data.error || {} };
        throw new index_js_1.ServerError(errorData.httpStatusCode, 'ServerError', errorData.requestData, errorData.runtime, errorData.error);
    }
    static convertToServerError(nodeError, origin) {
        if (nodeError instanceof axios_1.AxiosError) {
            const { response } = nodeError;
            if (response?.data != null && 'error' in response.data) {
                const serverError = response.data;
                console.log({ RESPONSE: serverError });
                const status = serverError.httpStatusCode;
                const message = `${serverError.message} ${origin}`;
                const { requestData } = serverError;
                const { runtime } = serverError;
                const { error } = serverError;
                return new index_js_1.ServerError(status, message, requestData, runtime, error);
            }
            if (response) {
                const { status } = response;
                const message = JSON.stringify(response.data) || 'Internal Axios Error';
                const requestData = { requestID: origin, link: '' };
                const runtime = 0;
                const error = { validation: [] };
                return new index_js_1.ServerError(status, message, requestData, runtime, error);
            }
        }
        const httpStatusCode = 500;
        const message = 'Internal Server Error';
        const requestData = { requestID: '', link: '' };
        const runtime = 0;
        const error = { validation: [{ field: 'whatnot', message: 'error from createServerErrorFromNodeError' }] };
        return new index_js_1.ServerError(httpStatusCode, message, requestData, runtime, error);
    }
    static hydrateRequestData(data) {
        assert_js_1.default.keysInObject(['requestID', 'link'], data, 'Helper.hydrateRequestData() "data" param must contain all required keys: requestID, link');
        const requestData = { requestID: data.requestID, link: data.link };
        return requestData;
    }
    static hydrateResponse(data) {
        assert_js_1.default.keysInObject(['httpStatusCode', 'message', 'requestData', 'runtime'], data, 'Helper.hydrateResponse() "data" param must contain all required keys: httpStatusCode, message, requestData, runtime');
        const requestData = Helper.hydrateRequestData(data.requestData);
        const { httpStatusCode, message, runtime } = data;
        const response = { httpStatusCode, message, requestData, runtime };
        return response;
    }
}
exports.default = Helper;
//# sourceMappingURL=helpers.js.map