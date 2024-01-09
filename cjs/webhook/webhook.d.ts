import { Request, Response } from 'express';
import { AuthMethodsRequest, AuthMethodsDataResponseStatusEnum, PasswordVerifyRequest } from './entities/index.js';
interface NestedBody {
    id: string;
    projectID: string;
    action: string;
    data: {
        username: string;
        password: string;
    };
}
interface Body {
    id: string;
    projectID: string;
    action: string;
    data: NestedBody;
}
interface RequestWithBody extends Request {
    body: Body;
}
export declare enum AuthMethodsDataResponseStatus {
    ACTION_AUTH_METHODS = "auth_methods",
    ACTION_PASSWORD_VERIFY = "password_verify"
}
export declare const StandardFields: string[];
declare class Webhook {
    private username;
    private password;
    private automaticAuthenticationHandling;
    private authenticated;
    constructor(username: string, password: string);
    disableAutomaticAuthenticationHandling(): void;
    checkAuthentication(req: Request): boolean;
    static sendUnauthorizedResponse(res: Response, exit?: boolean): void;
    handleAuthentication(req: Request, res: Response): void;
    checkAutomaticAuthentication(): void;
    isPost(req: Request): boolean;
    getAction(req: Request): string;
    getAuthMethodsRequest(req: RequestWithBody): AuthMethodsRequest;
    sendAuthMethodsResponse(res: Response, status: AuthMethodsDataResponseStatusEnum, exit?: boolean, responseID?: string): void;
    getPasswordVerifyRequest(req: RequestWithBody): PasswordVerifyRequest;
    sendPasswordVerifyResponse(res: Response, success: boolean, exit?: boolean, responseID?: string): void;
    static getRequestBody(req: RequestWithBody): string;
    static sendResponse(res: Response, response: unknown): void;
}
export default Webhook;
