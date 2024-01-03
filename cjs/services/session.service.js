"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Session_instances, _Session_shortSessionCookieName, _Session_issuer, _Session_jwksURI, _Session_cacheMaxAge, _Session_lastShortSessionValidationResult, _Session_extractBearerToken;
Object.defineProperty(exports, "__esModule", { value: true });
// convert this file to typescript (.ts) and add types
const assert = require("assert");
const jose = require("jose");
const User_js_1 = require("../entities/User.js");
class Session {
    /**
     * Create a session service.
     * @param version
     * @param shortSessionCookieName
     * @param issuer
     * @param jwksURI
     * @param cacheMaxAge
     * @param client
     */
    constructor(client, shortSessionCookieName, issuer, jwksURI, cacheMaxAge) {
        _Session_instances.add(this);
        // #client;
        _Session_shortSessionCookieName.set(this, void 0);
        _Session_issuer.set(this, void 0);
        _Session_jwksURI.set(this, void 0);
        _Session_cacheMaxAge.set(this, void 0);
        _Session_lastShortSessionValidationResult.set(this, null);
        if (!client) {
            throw new Error('Invalid argument(s)');
        }
        // this.#client = client;
        __classPrivateFieldSet(this, _Session_shortSessionCookieName, shortSessionCookieName, "f");
        __classPrivateFieldSet(this, _Session_issuer, issuer, "f");
        __classPrivateFieldSet(this, _Session_jwksURI, jwksURI, "f");
        __classPrivateFieldSet(this, _Session_cacheMaxAge, cacheMaxAge, "f");
    }
    /**
     * Obtain the short session cookie.
     * @param req
     * @returns {*|string|null}
     */
    getShortSessionValue(req) {
        const token = req.cookies[__classPrivateFieldGet(this, _Session_shortSessionCookieName, "f")] ?? __classPrivateFieldGet(this, _Session_instances, "m", _Session_extractBearerToken).call(this, req);
        return (token !== null && token.length >= 10) ? token : null;
    }
    /**
     * Validate the short session cookie.
     * @param req
     * @returns {Promise<User>}
     */
    async validateShortSessionValue(req) {
        assert(typeof req === 'object' && req !== null, 'RequestObject not given');
        const JWKS = jose.createRemoteJWKSet(new URL(__classPrivateFieldGet(this, _Session_jwksURI, "f")), {
            cacheMaxAge: __classPrivateFieldGet(this, _Session_cacheMaxAge, "f")
        });
        const options = {
            issuer: __classPrivateFieldGet(this, _Session_issuer, "f"),
        };
        const token = this.getShortSessionValue(req);
        if (token === null) {
            return new User_js_1.default(false);
        }
        try {
            const { payload } = await jose.jwtVerify(token, JWKS, options);
            let issuerValid = false;
            if (payload.iss === __classPrivateFieldGet(this, _Session_issuer, "f")) {
                issuerValid = true;
            }
            else {
                __classPrivateFieldSet(this, _Session_lastShortSessionValidationResult, 'Mismatch in issuer (configured through Frontend API: "' +
                    __classPrivateFieldGet(this, _Session_issuer, "f") + '", JWT: "' + payload.iss + ')', "f");
            }
            if (issuerValid) {
                return new User_js_1.default(true, payload.sub, payload.fullName, payload.email, payload.phoneNumber);
            }
            return null;
        }
        catch (err) {
            // this.#lastShortSessionValidationResult = 'JWT validation failed: ' + err.message;
            __classPrivateFieldSet(this, _Session_lastShortSessionValidationResult, 'JWT validation failed: ' + err, "f");
            console.log(err);
            return new User_js_1.default(false);
        }
    }
    /**
     * Get information for the current user.
     * @returns {Promise<User>}
     */
    async getCurrentUser(req) {
        const guest = new User_js_1.default(false);
        const decoded = await this.validateShortSessionValue(req);
        return decoded ?? guest;
    }
    getLastShortSessionValidationResult() {
        return __classPrivateFieldGet(this, _Session_lastShortSessionValidationResult, "f");
    }
}
_Session_shortSessionCookieName = new WeakMap(), _Session_issuer = new WeakMap(), _Session_jwksURI = new WeakMap(), _Session_cacheMaxAge = new WeakMap(), _Session_lastShortSessionValidationResult = new WeakMap(), _Session_instances = new WeakSet(), _Session_extractBearerToken = function _Session_extractBearerToken(req) {
    if (!req.headers.authorization) {
        return null;
    }
    if (!req.headers.authorization.startsWith('Bearer ')) {
        return null;
    }
    return req.headers.authorization.substr(7);
};
exports.default = Session;
//# sourceMappingURL=session.service.js.map