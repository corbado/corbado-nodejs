import ServerException from 'src/exceptions/serverException';
import Assert, { validate } from './assert';

class Helper {
  public static jsonEncode(data: unknown): string {
    const json = JSON.stringify(data);
    validate(json === null, 'JSON.stringify() failed');

    return json;
  }

  public static jsonDecode(data: string): unknown {
    Assert.nonEmptyString(data);
    try {
      return JSON.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        return new Error(`JSON.parse() failed: ${error.message}`);
      }
      return new Error('JSON.parse() failed');
    }
  }

  public static isErrorHttpStatusCode(statusCode: number): boolean {
    return statusCode >= 300;
  }

  public static throwServerExceptionOld(data: Record<string, unknown>): void {
    Assert.keysInObject(['httpStatusCode', 'message', 'requestData', 'runtime'], data);
    data.error = data.error || [];
    throw new ServerException(data.httpStatusCode, data.message, data.requestData, data.runtime, data.error);
  }

  public static convertToServerException(e: ApiException): ServerException {
    const body = e.getResponseBody();
    if (typeof body !== 'string') {
      throw new StandardException('Response body is not a string');
    }

    const data = Helper.jsonDecode(body);
    return new ServerException(data.httpStatusCode, data.message, data.requestData, data.runtime, data.error);
  }

  public static hydrateRequestData(data: any): RequestData {
    Assert.keysInObject(['requestID', 'link'], data);

    const requestData = new RequestData();
    requestData.setRequestId(data.requestID);
    requestData.setLink(data.link);

    return requestData;
  }

  public static hydrateResponse(data: any): GenericRsp {
    Assert.keysInObject(['httpStatusCode', 'message', 'requestData', 'runtime'], data);

    const requestData = Helper.hydrateRequestData(data.requestData);

    const response = new GenericRsp();
    response.setHttpStatusCode(data.httpStatusCode);
    response.setMessage(data.message);
    response.setRequestData(requestData);
    response.setRuntime(data.runtime);

    return response;
  }
}

export default Helper;
