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

// class ServerError extends BaseError {
//   private requestData: RequestData;

//   private runtime: number;

//   private error: ErrorDetails;

//   constructor(httpStatusCode: number, message: string, requestData: RequestData, runtime: number, error: ErrorDetails) {
//     const fullMessage = `${message} (HTTP status code: ${httpStatusCode}, validation message: ${ServerError.getValidationMessages(
//       error,
//     )})`;
//     super('Server Error', httpStatusCode, fullMessage, true);

//     this.requestData = requestData;
//     this.runtime = runtime;
//     this.error = error;
//   }

//   public getRequestData(): RequestData {
//     return this.requestData;
//   }

//   public getRequestID(): string {
//     return this.requestData.requestID || '';
//   }

//   public getRuntime(): number {
//     return this.runtime;
//   }

//   public getError(): ErrorDetails {
//     return this.error;
//   }

//   private static getValidationMessages(error: ErrorDetails): string[] {
//     if (!error || !error.validation) {
//       return [];
//     }

//     return error.validation.map((item) => `${item.field}: ${item.message}`);
//   }
// }

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

    this.message += ` (HTTP status code: ${httpStatusCode}, ${this.getRequestId()}, validation messages: ${this.getValidationMessages().join(
      '; ',
    )})`;
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
    if (!this.error || !this.error.validation) {
      return [];
    }

    return this.error.validation.map((item) => {
      return `${item.field}: ${item.message}`;
    });
  }
}

export default ServerError;
