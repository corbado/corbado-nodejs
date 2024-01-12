import { AxiosError } from 'axios';
import { BaseError, ServerError } from '../errors/index.js';
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
        Assert.notEmptyString(data, 'Helper.jsonDecode() data must not be an empty string');
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
        Assert.keysInObject(['httpStatusCode', 'message', 'requestData', 'runtime'], data, 'Helper.throwServerException() "data" param must contain all required keys: httpStatusCode, message, requestData, runtime');
        const errorData = { ...data, error: data.error || {} };
        throw new ServerError(errorData.httpStatusCode, 'ServerError', errorData.requestData, errorData.runtime, errorData.error);
    }
    static convertToServerError(nodeError, origin) {
        if (nodeError instanceof AxiosError) {
            const { response } = nodeError;
            if (response?.data != null && 'error' in response.data) {
                const serverError = response.data;
                console.log({ RESPONSE: serverError });
                const status = serverError.httpStatusCode;
                const message = `${serverError.message} ${origin}`;
                const { requestData } = serverError;
                const { runtime } = serverError;
                const { error } = serverError;
                return new ServerError(status, message, requestData, runtime, error);
            }
            if (response) {
                const { status } = response;
                const message = JSON.stringify(response.data) || 'Internal Axios Error';
                const requestData = { requestID: origin, link: '' };
                const runtime = 0;
                const error = { validation: [] };
                return new ServerError(status, message, requestData, runtime, error);
            }
        }
        const httpStatusCode = 500;
        const message = 'Internal Server Error';
        const requestData = { requestID: '', link: '' };
        const runtime = 0;
        const error = { validation: [{ field: 'whatnot', message: 'error from createServerErrorFromNodeError' }] };
        return new ServerError(httpStatusCode, message, requestData, runtime, error);
    }
    static hydrateRequestData(data) {
        Assert.keysInObject(['requestID', 'link'], data, 'Helper.hydrateRequestData() "data" param must contain all required keys: requestID, link');
        const requestData = { requestID: data.requestID, link: data.link };
        return requestData;
    }
    static hydrateResponse(data) {
        Assert.keysInObject(['httpStatusCode', 'message', 'requestData', 'runtime'], data, 'Helper.hydrateResponse() "data" param must contain all required keys: httpStatusCode, message, requestData, runtime');
        const requestData = Helper.hydrateRequestData(data.requestData);
        const { httpStatusCode, message, runtime } = data;
        const response = { httpStatusCode, message, requestData, runtime };
        return response;
    }
}
export default Helper;
//# sourceMappingURL=helpers.js.map