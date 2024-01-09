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
    Assert.notEmptyString(data);

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
    Assert.keysInObject(['httpStatusCode', 'message', 'requestData', 'runtime'], data);

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
    const error = errorObj as ErrorWithBody;
    const body = error.getResponseBody ? error.getResponseBody() : '';
    if (typeof body !== 'string') {
      throw new BaseError(
        'ApiResponseError',
        httpStatusCodes.API_RESPONSE_ERROR.code,
        httpStatusCodes.API_RESPONSE_ERROR.description,
        httpStatusCodes.API_RESPONSE_ERROR.isOperational,
      );
    }

    const data = Helper.jsonDecode(body) as {
      httpStatusCode: number;
      requestData: RequestData;
      runtime: number;
      error: ErrorDetails;
    };
    return new ServerError(data.httpStatusCode, 'ServerError', data.requestData, data.runtime, data.error);
  }

  public static hydrateRequestData(data: Record<string, string>): RequestData {
    Assert.keysInObject(['requestID', 'link'], data);

    const requestData = { requestID: data.requestID, link: data.link };

    return requestData;
  }

  public static hydrateResponse(data: ServerErrorType): GenericRsp {
    Assert.keysInObject(['httpStatusCode', 'message', 'requestData', 'runtime'], data);

    const requestData = Helper.hydrateRequestData(data.requestData);
    const { httpStatusCode, message, runtime } = data;

    const response: GenericRsp = { httpStatusCode, message, requestData, runtime };

    return response;
  }
}

export default Helper;
