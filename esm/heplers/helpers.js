import { BaseError, ServerError, httpStatusCodes, } from '../errors/index.js';
import Assert from './assert.js';
class Helper {
    static jsonEncode(data) {
        const json = JSON.stringify(data);
        if (!json) {
            throw new BaseError('JSONEncodeError', 500, 'json_encode() failed', true);
        }
        return json;
    }
    static jsonDecode(data) {
        Assert.notEmptyString(data);
        try {
            return JSON.parse(data);
        }
        catch (error) {
            throw new BaseError('JSONDecodeError', 500, 'json_decode() failed', true);
        }
    }
    static isErrorHttpStatusCode(statusCode) {
        return statusCode >= 300;
    }
    static throwServerExceptionOld(data) {
        Assert.keysInObject(['httpStatusCode', 'message', 'requestData', 'runtime'], data);
        const errorData = { ...data, error: data.error || {} };
        throw new ServerError(errorData.httpStatusCode, 'ServerError', errorData.requestData, errorData.runtime, errorData.error);
    }
    static convertToServerException(errorObj) {
        const error = errorObj;
        const body = error.getResponseBody ? error.getResponseBody() : '';
        if (typeof body !== 'string') {
            throw new BaseError('ApiResponseError', httpStatusCodes.API_RESPONSE_ERROR.code, httpStatusCodes.API_RESPONSE_ERROR.description, httpStatusCodes.API_RESPONSE_ERROR.isOperational);
        }
        const data = Helper.jsonDecode(body);
        return new ServerError(data.httpStatusCode, 'ServerError', data.requestData, data.runtime, data.error);
    }
    static hydrateRequestData(data) {
        Assert.keysInObject(['requestID', 'link'], data);
        const requestData = { requestID: data.requestID, link: data.link };
        return requestData;
    }
    static hydrateResponse(data) {
        Assert.keysInObject(['httpStatusCode', 'message', 'requestData', 'runtime'], data);
        const requestData = Helper.hydrateRequestData(data.requestData);
        const { httpStatusCode, message, runtime } = data;
        const response = { httpStatusCode, message, requestData, runtime };
        return response;
    }
}
export default Helper;
//# sourceMappingURL=helpers.js.map