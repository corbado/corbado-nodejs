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
var _SDK_config, _SDK_client, _SDK_utils, _SDK_passkeys, _SDK_emailLinks, _SDK_users, _SDK_associationTokens, _SDK_authTokens, _SDK_session, _SDK_webhooks;
Object.defineProperty(exports, "__esModule", { value: true });
const passkeys_service_js_1 = require("./services/passkeys.service.js");
const emaillinks_service_js_1 = require("./services/emaillinks.service.js");
const authtokens_service_js_1 = require("./services/authtokens.service.js");
const session_service_js_1 = require("./services/session.service.js");
const webhooks_service_js_1 = require("./services/webhooks.service.js");
const webhookMiddleware_js_1 = require("./middlewares/webhookMiddleware.js");
const CorbadoApi_js_1 = require("./services/CorbadoApi.js");
// import { utils } from "./utils/clientInfo.utils.js";
const associationtokens_service_js_1 = require("./services/associationtokens.service.js");
/**
 * The SDK class provides access to various services, including PasskeyService, EmailLinkService, SessionService, WebhookService.
 * It also provides access to utility functions, and middleware, that can help to easily integrate SDK into your application.
 * @class
 */
class SDK {
    /**
     *
     * @param {Configuration} config
     */
    constructor(config, utils) {
        _SDK_config.set(this, void 0);
        _SDK_client.set(this, null);
        _SDK_utils.set(this, void 0);
        _SDK_passkeys.set(this, void 0);
        _SDK_emailLinks.set(this, void 0);
        _SDK_users.set(this, null);
        _SDK_associationTokens.set(this, null);
        _SDK_authTokens.set(this, null);
        _SDK_session.set(this, null);
        _SDK_webhooks.set(this, null);
        __classPrivateFieldSet(this, _SDK_config, config, "f");
        if (!__classPrivateFieldGet(this, _SDK_config, "f").client) {
            if (!__classPrivateFieldGet(this, _SDK_config, "f").projectID) {
                throw new Error('No project ID set');
            }
            __classPrivateFieldSet(this, _SDK_client, new CorbadoApi_js_1.default(__classPrivateFieldGet(this, _SDK_config, "f").projectID, __classPrivateFieldGet(this, _SDK_config, "f").apiSecret, __classPrivateFieldGet(this, _SDK_config, "f").backendAPI), "f");
        }
        else {
            __classPrivateFieldSet(this, _SDK_client, __classPrivateFieldGet(this, _SDK_config, "f").client, "f");
        }
        __classPrivateFieldSet(this, _SDK_utils, utils, "f");
    }
    /**
     *
     * @returns {*}
     */
    get passkeys() {
        if (__classPrivateFieldGet(this, _SDK_passkeys, "f") === null) {
            __classPrivateFieldSet(this, _SDK_passkeys, new passkeys_service_js_1.default(__classPrivateFieldGet(this, _SDK_client, "f"), this.emailLinks), "f");
        }
        return __classPrivateFieldGet(this, _SDK_passkeys, "f");
    }
    /**
     *
     * @returns {null}
     */
    get emailLinks() {
        if (__classPrivateFieldGet(this, _SDK_emailLinks, "f") === null) {
            // EmailLinkService
            __classPrivateFieldSet(this, _SDK_emailLinks, new emaillinks_service_js_1.default(__classPrivateFieldGet(this, _SDK_client, "f"), __classPrivateFieldGet(this, _SDK_config, "f").emailTemplates), "f");
        }
        return __classPrivateFieldGet(this, _SDK_emailLinks, "f");
    }
    get users() {
        if (__classPrivateFieldGet(this, _SDK_users, "f") === null) {
            // this.#users = new UsersService(this.#client);
        }
        return __classPrivateFieldGet(this, _SDK_users, "f");
    }
    get associationTokens() {
        if (__classPrivateFieldGet(this, _SDK_associationTokens, "f") === null) {
            __classPrivateFieldSet(this, _SDK_associationTokens, new associationtokens_service_js_1.default(__classPrivateFieldGet(this, _SDK_client, "f")), "f");
        }
        return __classPrivateFieldGet(this, _SDK_associationTokens, "f");
    }
    get authTokens() {
        if (__classPrivateFieldGet(this, _SDK_authTokens, "f") === null) {
            __classPrivateFieldSet(this, _SDK_authTokens, new authtokens_service_js_1.default(__classPrivateFieldGet(this, _SDK_client, "f")), "f");
        }
        return __classPrivateFieldGet(this, _SDK_authTokens, "f");
    }
    /**
     *
     * @returns {null}
     */
    get session() {
        if (__classPrivateFieldGet(this, _SDK_session, "f") === null) {
            __classPrivateFieldSet(this, _SDK_session, new session_service_js_1.default(__classPrivateFieldGet(this, _SDK_client, "f"), __classPrivateFieldGet(this, _SDK_config, "f").shortSessionCookieName, __classPrivateFieldGet(this, _SDK_config, "f").frontendAPI, __classPrivateFieldGet(this, _SDK_config, "f").frontendAPI + "/.well-known/jwks", __classPrivateFieldGet(this, _SDK_config, "f").cacheMaxAge), "f");
        }
        return __classPrivateFieldGet(this, _SDK_session, "f");
    }
    /**
     *
     * @returns {null}
     */
    get webhooks() {
        if (__classPrivateFieldGet(this, _SDK_webhooks, "f") === null) {
            __classPrivateFieldSet(this, _SDK_webhooks, new webhooks_service_js_1.default((0, webhookMiddleware_js_1.default)(__classPrivateFieldGet(this, _SDK_config, "f").webhookUsername, __classPrivateFieldGet(this, _SDK_config, "f").webhookPassword)), "f");
        }
        return __classPrivateFieldGet(this, _SDK_webhooks, "f");
    }
    /**
     *
     * @returns {null}
     */
    get utils() {
        return __classPrivateFieldGet(this, _SDK_utils, "f");
    }
}
_SDK_config = new WeakMap(), _SDK_client = new WeakMap(), _SDK_utils = new WeakMap(), _SDK_passkeys = new WeakMap(), _SDK_emailLinks = new WeakMap(), _SDK_users = new WeakMap(), _SDK_associationTokens = new WeakMap(), _SDK_authTokens = new WeakMap(), _SDK_session = new WeakMap(), _SDK_webhooks = new WeakMap();
exports.default = SDK;
//# sourceMappingURL=SDK.js.map