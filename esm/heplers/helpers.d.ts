import { ServerError, RequestData, ServerErrorType } from '../errors/index.js';
import { GenericRsp } from '../generated/index.js';
export type ErrorWithBody = {
    getResponseBody?: () => string;
};
declare class Helper {
    static jsonEncode(data: unknown): string;
    static jsonDecode(data: string): Record<string, unknown>;
    static isErrorHttpStatusCode(statusCode: number): boolean;
    static throwServerExceptionOld(data: ServerErrorType): void;
    static convertToServerException(errorObj: unknown): ServerError;
    static hydrateRequestData(data: Record<string, string>): RequestData;
    static hydrateResponse(data: ServerErrorType): GenericRsp;
}
export default Helper;
