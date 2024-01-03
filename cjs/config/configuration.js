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
var _Configuration_projectID, _Configuration_apiSecret, _Configuration_frontendAPI, _Configuration_backendAPI, _Configuration_shortSessionCookieName, _Configuration_cacheMaxAge, _Configuration_client, _Configuration_emailTemplates, _Configuration_webhookUsername, _Configuration_webhookPassword;
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
class Configuration {
    constructor(projectID, apiSecret) {
        _Configuration_projectID.set(this, void 0);
        _Configuration_apiSecret.set(this, void 0);
        _Configuration_frontendAPI.set(this, '');
        _Configuration_backendAPI.set(this, 'https://backendapi.corbado.io/v1');
        _Configuration_shortSessionCookieName.set(this, 'cbo_short_session');
        _Configuration_cacheMaxAge.set(this, 10 * 60 * 1000); // What are these 'magic numbers'? ):
        _Configuration_client.set(this, null);
        _Configuration_emailTemplates.set(this, {
            EMAIL_SIGN_UP_TEMPLATE: 'email_signup_user',
            EMAIL_LOGIN_TEMPLATE: 'email_login_user',
            PASSKEY_SIGN_UP_TEMPLATE: 'webauthn_signup_user',
            PASSKEY_LOGIN_TEMPLATE: 'webauthn_login_user',
        });
        _Configuration_webhookUsername.set(this, '');
        _Configuration_webhookPassword.set(this, '');
        if (!projectID.startsWith('pro-')) {
            throw new Error('Invalid project ID "' + projectID + '" given, needs to start with "pro-"');
        }
        if (apiSecret !== '' && !apiSecret.startsWith('corbado1_')) {
            throw new Error('Invalid API secret "' + apiSecret + '" given, needs to start with "corbado1_"');
        }
        __classPrivateFieldSet(this, _Configuration_projectID, projectID, "f");
        __classPrivateFieldSet(this, _Configuration_apiSecret, apiSecret, "f");
    }
    get projectID() {
        return __classPrivateFieldGet(this, _Configuration_projectID, "f");
    }
    get apiSecret() {
        return __classPrivateFieldGet(this, _Configuration_apiSecret, "f");
    }
    set backendAPI(value) {
        assert(value.length > 0, 'Backend API is invalid');
        assert(value.startsWith('http://') || value.startsWith('https://'), 'Backend API url is invalid');
        __classPrivateFieldSet(this, _Configuration_backendAPI, value, "f");
    }
    get backendAPI() {
        return __classPrivateFieldGet(this, _Configuration_backendAPI, "f");
    }
    set frontendAPI(value) {
        assert(value.length > 0, 'Frontend API is invalid');
        assert(value.startsWith('http://') || value.startsWith('https://'), 'Frontend API is invalid');
        __classPrivateFieldSet(this, _Configuration_frontendAPI, value, "f");
    }
    get frontendAPI() {
        if (__classPrivateFieldGet(this, _Configuration_frontendAPI, "f") === '') {
            if (__classPrivateFieldGet(this, _Configuration_projectID, "f") === '') {
                throw new Error('Project ID empty, set Project ID first');
            }
            __classPrivateFieldSet(this, _Configuration_frontendAPI, 'https://' + __classPrivateFieldGet(this, _Configuration_projectID, "f") + '.frontendapi.corbado.io', "f");
        }
        return __classPrivateFieldGet(this, _Configuration_frontendAPI, "f");
    }
    get shortSessionCookieName() {
        return __classPrivateFieldGet(this, _Configuration_shortSessionCookieName, "f");
    }
    set shortSessionCookieName(value) {
        assert(value.length > 0, 'Short session cookie name is invalid');
        __classPrivateFieldSet(this, _Configuration_shortSessionCookieName, value, "f");
    }
    get cacheMaxAge() {
        return __classPrivateFieldGet(this, _Configuration_cacheMaxAge, "f");
    }
    set cacheMaxAge(value) {
        assert(value > 0, 'Cache max age is invalid');
        __classPrivateFieldSet(this, _Configuration_cacheMaxAge, value, "f");
    }
    get client() {
        return __classPrivateFieldGet(this, _Configuration_client, "f");
    }
    set client(client) {
        __classPrivateFieldSet(this, _Configuration_client, client, "f");
    }
    get emailTemplates() {
        return __classPrivateFieldGet(this, _Configuration_emailTemplates, "f");
    }
    set emailTemplates(value) {
        assert(typeof value === "object", 'Email templates is invalid');
        __classPrivateFieldSet(this, _Configuration_emailTemplates, value, "f");
    }
    get webhookUsername() {
        return __classPrivateFieldGet(this, _Configuration_webhookUsername, "f");
    }
    set webhookUsername(webhookUsername) {
        __classPrivateFieldSet(this, _Configuration_webhookUsername, webhookUsername, "f");
    }
    get webhookPassword() {
        return __classPrivateFieldGet(this, _Configuration_webhookPassword, "f");
    }
    set webhookPassword(webhookPassword) {
        __classPrivateFieldSet(this, _Configuration_webhookPassword, webhookPassword, "f");
    }
}
_Configuration_projectID = new WeakMap(), _Configuration_apiSecret = new WeakMap(), _Configuration_frontendAPI = new WeakMap(), _Configuration_backendAPI = new WeakMap(), _Configuration_shortSessionCookieName = new WeakMap(), _Configuration_cacheMaxAge = new WeakMap(), _Configuration_client = new WeakMap(), _Configuration_emailTemplates = new WeakMap(), _Configuration_webhookUsername = new WeakMap(), _Configuration_webhookPassword = new WeakMap();
exports.default = Configuration;
//# sourceMappingURL=configuration.js.map