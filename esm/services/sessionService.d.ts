import { JWTPayload } from 'jose';
import { Request } from 'express';
import User from '../entities/user.js';
export interface SessionInterface {
    validateShortSessionValue(shortSession: string): Promise<object | null>;
}
interface DecodedValue extends JWTPayload {
    name?: string;
    email?: string;
    phone_number?: string;
    sub?: string;
}
interface RequestWithCookies extends Request {
    cookies: {
        [key: string]: string;
    };
}
declare class Session implements SessionInterface {
    private shortSessionCookieName;
    private issuer;
    private jwksURI;
    private cacheMaxAge;
    private lastShortSessionValidationResult;
    constructor(issuer: string, shortSessionCookieName: string, jwksURI: string, cacheMaxAge: number);
    getShortSessionValue(req: RequestWithCookies): string;
    validateShortSessionValue(value: string): Promise<DecodedValue | null>;
    getLastShortSessionValidationResult(): string;
    getCurrentUser(req: Request): Promise<User>;
    private extractBearerToken;
    private setIssuerMismatchError;
    private setValidationError;
    private createUserFromDecodedValue;
}
export default Session;
