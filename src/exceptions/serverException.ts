interface ErrorDetails {
  validation?: { field: string; message: string }[];
}

interface RequestData {
  requestID?: string;
}

class ServerException extends Error {
  private httpStatusCode: number;

  private requestData: RequestData;

  private runtime: number;

  private error: ErrorDetails;

  constructor(httpStatusCode: number, message: string, requestData: RequestData, runtime: number, error: ErrorDetails) {
    const fullMessage = `${message} (HTTP status code: ${httpStatusCode}, validation message: ${ServerException.getValidationMessages(
      error,
    )})`;
    super(fullMessage);

    this.httpStatusCode = httpStatusCode;
    this.requestData = requestData;
    this.runtime = runtime;
    this.error = error;

    // Enhancement for displaying a proper stack trace on V8 engine
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerException);
    }

    this.name = this.constructor.name;
  }

  public getHttpStatusCode(): number {
    return this.httpStatusCode;
  }

  public getRequestData(): RequestData {
    return this.requestData;
  }

  public getRequestID(): string {
    return this.requestData.requestID || '';
  }

  public getRuntime(): number {
    return this.runtime;
  }

  public getError(): ErrorDetails {
    return this.error;
  }

  private static getValidationMessages(error: ErrorDetails): string[] {
    if (!error || !error.validation) {
      return [];
    }

    return error.validation.map((item) => `${item.field}: ${item.message}`);
  }
}

export default ServerException;
