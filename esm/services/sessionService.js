/* eslint-disable class-methods-use-this */
import { createRemoteJWKSet, jwtVerify } from 'jose';
import User from '../entities/user.js';
import { Assert } from '../heplers/index.js';
const MIN_TOKEN_LENGTH = 10;
class Session {
    constructor(jwksURI, shortSessionCookieName, issuer, cacheMaxAge) {
        this.lastShortSessionValidationResult = '';
        Assert.notEmptyString(shortSessionCookieName);
        Assert.notEmptyString(issuer);
        Assert.notEmptyString(jwksURI);
        // this.client = client;
        this.shortSessionCookieName = shortSessionCookieName;
        this.issuer = issuer;
        this.jwksURI = jwksURI;
        this.cacheMaxAge = cacheMaxAge;
    }
    getShortSessionValue(req) {
        return req.cookies?.[this.shortSessionCookieName] ?? this.extractBearerToken(req.headers.authorization);
    }
    async validateShortSessionValue(value) {
        Assert.notEmptyString(value);
        try {
            const keySet = createRemoteJWKSet(new URL(this.jwksURI));
            const { payload } = await jwtVerify(value, keySet);
            if (payload.iss && payload.iss !== this.issuer) {
                this.setIssuerMismatchError(payload.iss);
                return null;
            }
            return payload;
        }
        catch (error) {
            this.setValidationError(error);
            return null;
        }
    }
    getLastShortSessionValidationResult() {
        return this.lastShortSessionValidationResult;
    }
    async getCurrentUser(req) {
        const value = this.getShortSessionValue(req);
        if (value.length < MIN_TOKEN_LENGTH) {
            return new User(false);
        }
        const decoded = await this.validateShortSessionValue(value);
        if (decoded) {
            return this.createUserFromDecodedValue(decoded);
        }
        return new User(false);
    }
    extractBearerToken(header) {
        if (header?.startsWith('Bearer ')) {
            return header.split(' ')[1];
        }
        return '';
    }
    setIssuerMismatchError(issuer) {
        this.lastShortSessionValidationResult = `Mismatch in issuer (configured: ${this.issuer}, JWT: ${issuer})`;
    }
    setValidationError(error) {
        if (error instanceof Error) {
            this.lastShortSessionValidationResult = `JWT validation failed: ${error.message}`;
        }
        else {
            this.lastShortSessionValidationResult = `JWT validation failed: ${error}`;
        }
    }
    createUserFromDecodedValue(decoded) {
        return new User(true, decoded.sub, decoded.name ?? '', decoded.email ?? '', decoded.phone_number ?? '');
    }
}
export default Session;
//# sourceMappingURL=sessionService.js.map