class CorbadoApiError extends Error {
  constructor(httpStatusCode, statusText, method, url, data) {
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
