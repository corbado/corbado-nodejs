// convert this file to typescript (.ts) and add types
class CorbadoApiError extends Error {
  httpStatusCode: any;
  statusText: any;
  method: any;
  url: any;
  data: any;
  constructor(httpStatusCode: any, statusText: any, method: any, url: any, data: any) {
    super();
    this.httpStatusCode = httpStatusCode;
    this.statusText = statusText;
    this.method = method;
    this.url = url;
    this.data = data;

    Error.captureStackTrace(this);
  }
}

export default CorbadoApiError
