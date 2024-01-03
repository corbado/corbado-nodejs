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
var _AuthTokens_client;
Object.defineProperty(exports, "__esModule", { value: true });
class AuthTokens {
    /**
     *
     * @param client
     */
    constructor(client) {
        _AuthTokens_client.set(this, void 0);
        if (!client) {
            throw new Error('Invalid argument(s)');
        }
        __classPrivateFieldSet(this, _AuthTokens_client, client, "f");
    }
    /**
     * Verifies a session token by sending a request to SDK.
     * @param authToken
     * @param clientInfo
     * @param requestID
     * @returns {Promise<*>}
     */
    async validate(corbadoAuthToken, clientInfo, requestID = null) {
        if (!corbadoAuthToken) {
            throw new Error('corbadoAuthToken is required');
        }
        const params = {
            corbadoAuthToken,
            clientInfo,
            requestID
        };
        return await __classPrivateFieldGet(this, _AuthTokens_client, "f").request('/authTokens/validate', 'POST', params); // path will be renamed
    }
}
_AuthTokens_client = new WeakMap();
exports.default = AuthTokens;
//# sourceMappingURL=authtokens.service.js.map