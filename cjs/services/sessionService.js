"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable class-methods-use-this */
const jose_1 = require("jose");
const user_js_1 = require("../entities/user.js");
const index_js_1 = require("../heplers/index.js");
const MIN_TOKEN_LENGTH = 10;
class Session {
    constructor(issuer, shortSessionCookieName, jwksURI, cacheMaxAge) {
        this.lastShortSessionValidationResult = '';
        index_js_1.Assert.notEmptyString(shortSessionCookieName);
        index_js_1.Assert.notEmptyString(issuer);
        index_js_1.Assert.notEmptyString(jwksURI);
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
        index_js_1.Assert.notEmptyString(value);
        try {
            const keySet = (0, jose_1.createRemoteJWKSet)(new URL(this.jwksURI));
            const { payload } = await (0, jose_1.jwtVerify)(value, keySet);
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
            return new user_js_1.default(false);
        }
        const decoded = await this.validateShortSessionValue(value);
        if (decoded) {
            return this.createUserFromDecodedValue(decoded);
        }
        return new user_js_1.default(false);
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
        return new user_js_1.default(true, decoded.sub, decoded.name ?? '', decoded.email ?? '', decoded.phone_number ?? '');
    }
}
exports.default = Session;
//# sourceMappingURL=sessionService.js.map