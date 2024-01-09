import BaseError from './baseError.js';
export type ErrorDetails = {
    validation?: {
        field: string;
        message: string;
    }[];
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
declare class ServerError extends BaseError {
    private requestData;
    private runtime;
    private error;
    constructor(httpStatusCode: number, message: string, requestData: RequestData, runtime: number, error: ErrorDetails);
    getRequestData(): RequestData;
    getRequestID(): string;
    getRuntime(): number;
    getError(): ErrorDetails;
    private static getValidationMessages;
}
export default ServerError;
