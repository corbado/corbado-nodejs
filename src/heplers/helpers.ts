import {
  BaseError,
  ServerError,
  httpStatusCodes,
  ErrorDetails,
  RequestData,
  ServerErrorType,
} from '../errors/index.js';
import { GenericRsp } from '../generated/index.js';
import Assert from './assert.js';

export type ErrorWithBody = {
  getResponseBody?: () => string;
};

class Helper {
  public static jsonEncode(data: unknown): string {
    const json = JSON.stringify(data);
    if (!json) {
      throw new BaseError('JSONEncodeError', 500, 'json_encode() failed', true);
    }
    return json;
  }

  public static jsonDecode(data: string): Record<string, unknown> {
    Assert.notEmptyString(data, 'Helper.jsonDecode() data must not be an empty string');

    try {
      return JSON.parse(data) as Record<string, unknown>;
    } catch (error) {
      throw new BaseError('JSONDecodeError', 500, 'json_decode() failed', true);
    }
  }

  public static isErrorHttpStatusCode(statusCode: number): boolean {
    return statusCode >= 300;
  }

  public static throwServerExceptionOld(data: ServerErrorType): void {
    Assert.keysInObject(
      ['httpStatusCode', 'message', 'requestData', 'runtime'],
      data,
      'Helper.throwServerException() "data" param must contain all required keys: httpStatusCode, message, requestData, runtime',
    );

    const errorData = { ...data, error: data.error || {} };
    throw new ServerError(
      errorData.httpStatusCode,
      'ServerError',
      errorData.requestData,
      errorData.runtime,
      errorData.error,
    );
  }

  public static convertToServerException(errorObj: unknown): ServerError {
    let body = '{}';
    if (typeof errorObj === 'object' && errorObj !== null && 'getResponseBody' in errorObj) {
      const errorWithBody = errorObj as ErrorWithBody;
      body = errorWithBody.getResponseBody ? errorWithBody.getResponseBody() : '{}';
    }

    let data;
    try {
      data = Helper.jsonDecode(body) as {
        httpStatusCode: number;
        requestData: RequestData;
        runtime: number;
        error: ErrorDetails;
      };
    } catch (e) {
      const defaultMessage = e instanceof Error ? e.message : 'Unknown error during JSON decode';
      data = {
        httpStatusCode: httpStatusCodes.INTERNAL_SERVER_ERROR.code,
        message: `JSON Decode Error: ${defaultMessage}`,
        requestData: { requestID: '', link: '' },
        runtime: 0,
        error: { validation: ['JSON decode fail'] },
      };
    }
    return new ServerError(data.httpStatusCode, 'Server Error', data.requestData, data.runtime, data.error);
  }

  public static hydrateRequestData(data: Record<string, string>): RequestData {
    Assert.keysInObject(
      ['requestID', 'link'],
      data,
      'Helper.hydrateRequestData() "data" param must contain all required keys: requestID, link',
    );

    const requestData = { requestID: data.requestID, link: data.link };

    return requestData;
  }

  public static hydrateResponse(data: ServerErrorType): GenericRsp {
    Assert.keysInObject(
      ['httpStatusCode', 'message', 'requestData', 'runtime'],
      data,
      'Helper.hydrateResponse() "data" param must contain all required keys: httpStatusCode, message, requestData, runtime',
    );

    const requestData = Helper.hydrateRequestData(data.requestData);
    const { httpStatusCode, message, runtime } = data;

    const response: GenericRsp = { httpStatusCode, message, requestData, runtime };

    return response;
  }
}

export default Helper;
