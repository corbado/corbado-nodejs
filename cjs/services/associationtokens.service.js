"use strict";
// convert this file to typescript (.ts) and add types
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
var _AssociationTokens_client;
Object.defineProperty(exports, "__esModule", { value: true });
class AssociationTokens {
    constructor(client) {
        _AssociationTokens_client.set(this, void 0);
        if (!client) {
            throw new Error('Invalid argument(s)');
        }
        __classPrivateFieldSet(this, _AssociationTokens_client, client, "f");
    }
    async create(loginIdentifier, loginIdentifierType, clientInfo, requestID) {
        if (!loginIdentifier) {
            throw new Error('loginIdentifier is required');
        }
        if (!loginIdentifierType) {
            throw new Error('loginIdentifierType is required');
        }
        const params = {
            loginIdentifier,
            loginIdentifierType,
            clientInfo,
            requestID
        };
        return await __classPrivateFieldGet(this, _AssociationTokens_client, "f").request('/associationTokens', 'POST', params);
    }
}
_AssociationTokens_client = new WeakMap();
exports.default = AssociationTokens;
//# sourceMappingURL=associationtokens.service.js.map