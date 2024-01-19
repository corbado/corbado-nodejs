import { AxiosError } from 'axios';
import { BaseError, ServerError, RequestData, ServerErrorType } from '../errors/index.js';
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

  public static convertToServerError(nodeError: unknown, origin: string) {
    if (nodeError instanceof AxiosError) {
      const { response } = nodeError;
      if (response?.data != null && 'error' in response.data) {
        const serverError = response.data as ServerErrorType;
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

    const errorName = `${(nodeError as Error).name}`;
    const errorMessage = `${(nodeError as Error).message}`;

    const httpStatusCode = 500;
    const message = `Internal Server Error ${origin}`;
    const requestData = { requestID: '', link: '' };
    const runtime = 0;
    const error = { validation: [{ field: errorName, message: errorMessage }] };

    return new ServerError(httpStatusCode, message, requestData, runtime, error);
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
