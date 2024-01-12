export type ErrorDetails = {
  validation?: { field: string; message: string }[];
};

export type RequestData = {
  requestID: string;
  link: string;
};

export type ServerErrorType = {
  httpStatusCode: number;
  message: string;
  requestData: RequestData;
  runtime: number;
  error: ErrorDetails;
};

export class ServerError extends Error {
  httpStatusCode: number;

  requestData: RequestData;

  runtime: number;

  error: ErrorDetails;

  constructor(httpStatusCode: number, message: string, requestData: RequestData, runtime: number, error: ErrorDetails) {
    super(message);

    this.httpStatusCode = httpStatusCode;
    this.requestData = requestData;
    this.runtime = runtime;
    this.error = error;

    this.message += ` (HTTP status code: ${httpStatusCode}, ${this.getRequestId()}, validation messages: ${this.getFlattenedValidationMessages()})`;
  }

  getHttpStatusCode() {
    return this.httpStatusCode;
  }

  getRequestData() {
    return this.requestData;
  }

  getRequestId() {
    return this.requestData?.requestID ?? '';
  }

  getRuntime() {
    return this.runtime;
  }

  getError() {
    return this.error;
  }

  getValidationMessages(): string[] {
    const { error } = this;
    if (!error || !error.validation) {
      return [];
    }

    return error.validation.map((item) => `${item.field}: ${item.message}`);
  }

  private getFlattenedValidationMessages(): string {
    return this.getValidationMessages().join(', ');
  }
}

export default ServerError;
