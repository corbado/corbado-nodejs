"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// convert this file to typescript (.ts) and add types
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
exports.default = CorbadoApiError;
//# sourceMappingURL=CorbadoApiError.js.map