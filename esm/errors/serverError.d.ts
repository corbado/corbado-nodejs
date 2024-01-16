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
declare class ServerError extends Error {
    httpStatusCode: number;
    requestData: RequestData;
    runtime: number;
    error: ErrorDetails;
    constructor(httpStatusCode: number, message: string, requestData: RequestData, runtime: number, error: ErrorDetails);
    getHttpStatusCode(): number;
    getRequestData(): RequestData;
    getRequestId(): string;
    getRuntime(): number;
    getError(): ErrorDetails;
    getValidationMessages(): string[];
    private getFlattenedValidationMessages;
}
export default ServerError;
