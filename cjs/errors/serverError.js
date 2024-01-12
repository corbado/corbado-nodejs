"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
class ServerError extends Error {
    constructor(httpStatusCode, message, requestData, runtime, error) {
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
    getValidationMessages() {
        const { error } = this;
        if (!error || !error.validation) {
            return [];
        }
        return error.validation.map((item) => `${item.field}: ${item.message}`);
    }
    getFlattenedValidationMessages() {
        return this.getValidationMessages().join(', ');
    }
}
exports.ServerError = ServerError;
exports.default = ServerError;
//# sourceMappingURL=serverError.js.map