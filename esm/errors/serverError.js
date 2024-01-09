import BaseError from './baseError.js';
class ServerError extends BaseError {
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
export default ServerError;
//# sourceMappingURL=serverError.js.map