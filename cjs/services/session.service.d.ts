import User from "../entities/User.js";
import { ClientInfoType } from "./associationtokens.service.js";
declare class Session {
    #private;
    /**
     * Create a session service.
     * @param version
     * @param shortSessionCookieName
     * @param issuer
     * @param jwksURI
     * @param cacheMaxAge
     * @param client
     */
    constructor(client: ClientInfoType, shortSessionCookieName: string, issuer: string, jwksURI: string, cacheMaxAge: number);
    /**
     * Obtain the short session cookie.
     * @param req
     * @returns {*|string|null}
     */
    getShortSessionValue(req: {
        cookies: {
            [x: string]: any;
        };
        headers: {
            authorization: string;
        };
    }): any;
    /**
     * Validate the short session cookie.
     * @param req
     * @returns {Promise<User>}
     */
    validateShortSessionValue(req: null): Promise<User | null>;
    /**
     * Get information for the current user.
     * @returns {Promise<User>}
     */
    getCurrentUser(req: any): Promise<User>;
    getLastShortSessionValidationResult(): string | null;
}
export default Session;
