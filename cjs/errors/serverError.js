"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseError_js_1 = require("./baseError.js");
class ServerError extends baseError_js_1.default {
    constructor(httpStatusCode, message, requestData, runtime, error) {
        const fullMessage = `${message} (HTTP status code: ${httpStatusCode}, validation message: ${ServerError.getValidationMessages(error)})`;
        super('Server Error', httpStatusCode, fullMessage, true);
        this.requestData = requestData;
        this.runtime = runtime;
        this.error = error;
    }
    getRequestData() {
        return this.requestData;
    }
    getRequestID() {
        return this.requestData.requestID || '';
    }
    getRuntime() {
        return this.runtime;
    }
    getError() {
        return this.error;
    }
    static getValidationMessages(error) {
        if (!error || !error.validation) {
            return [];
        }
        return error.validation.map((item) => `${item.field}: ${item.message}`);
    }
}
exports.default = ServerError;
//# sourceMappingURL=serverError.js.map