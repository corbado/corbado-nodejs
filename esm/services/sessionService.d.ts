import User from '../entities/user.js';
export interface SessionInterface {
    validateShortSessionValue(shortSession: string): Promise<User>;
}
declare class Session implements SessionInterface {
    private shortSessionCookieName;
    private issuer;
    private jwks;
    constructor(version: string, projectID: string, frontendAPI: string, shortSessionCookieName: string, issuer: string, cacheMaxAge: number);
    validateShortSessionValue(shortSession: string): Promise<User>;
    protected createAnonymousUser(): User;
}
export default Session;
