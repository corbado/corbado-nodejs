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
var _Webhooks_webhookMiddleware;
Object.defineProperty(exports, "__esModule", { value: true });
// convert this file to typescript (.ts) and add types
const assert = require("assert");
class Webhooks {
    /**
     *
     * @param version
     * @param shortSessionCookieName
     * @param issuer
     * @param jwksURI
     * @param cacheMaxAge
     * @param client
     */
    constructor(webhookMiddleware) {
        this.WEBHOOK_ACTION = {
            AUTH_METHODS: "authMethods",
            PASSWORD_VERIFY: "passwordVerify",
        };
        this.ALLOWED_STATUS = ["exists", "not_exists", "blocked"];
        // #webhookUsername;
        // #webhookPassword;
        _Webhooks_webhookMiddleware.set(this, void 0);
        __classPrivateFieldSet(this, _Webhooks_webhookMiddleware, webhookMiddleware, "f");
    }
    /**
     * Returns webhook action (by reading the header field X-SDK-Action)
     *
     * @return {Object}
     */
    getAction(req) {
        const corbadoAction = req.get("X-Corbado-Action") || "";
        if (!corbadoAction) {
            throw new Error("Missing action header (X-CORBADO-ACTION)");
        }
        switch (corbadoAction) {
            case this.WEBHOOK_ACTION.AUTH_METHODS:
                return this.WEBHOOK_ACTION.AUTH_METHODS;
            case this.WEBHOOK_ACTION.PASSWORD_VERIFY:
                return this.WEBHOOK_ACTION.PASSWORD_VERIFY;
            default:
                throw new Error(`Invalid action ("${corbadoAction}")`);
        }
    }
    /**
     * Returns auth methods request model
     *
     * @param {Object} req
     * @return {object}
     */
    getAuthMethodsRequest(req) {
        const data = req.body;
        assert.ok(data.id, "Missing id field");
        assert.ok(data.projectID, "Missing projectID field");
        assert.ok(data.action === this.WEBHOOK_ACTION.AUTH_METHODS, `Unexpected action: ${data.action}`);
        assert.ok(data.data.username, "Missing username field");
        return {
            id: data.id,
            projectID: data.projectID,
            action: data.action,
            data: {
                username: data.data.username,
            },
        };
    }
    /**
     * Sends auth methods response
     *
     * @param {string} status
     * @param {Object} res
     * @param {string} responseID
     */
    getAuthMethodsResponse(status, responseID = "") {
        if (!this.ALLOWED_STATUS.includes(status)) {
            throw new Error("Invalid status value");
        }
        return {
            responseID,
            data: { status },
        };
    }
    /**
     * Returns password verify request model
     *
     * @param {Object} req
     * @return {Object}
     */
    getPasswordVerifyRequest(req) {
        const data = req.body;
        const requiredFields = ["id", "projectID"];
        const requiredDataKeys = ["username", "password"];
        if (!requiredFields.every((key) => key in data) ||
            !requiredDataKeys.every((key) => key in data.data)) {
            throw new Error("Invalid request format");
        }
        return {
            id: data.id,
            projectID: data.projectID,
            action: this.WEBHOOK_ACTION.PASSWORD_VERIFY,
            data: {
                username: data.data.username,
                password: data.data.password,
            },
        };
    }
    /**
     * Sends password verify response
     *
     * @param {boolean} success
     * @param {Object} res
     * @param {string} responseID
     */
    getPasswordVerifyResponse(success, responseID = "") {
        return {
            responseID: responseID,
            data: { success },
        };
    }
    get middleware() {
        return __classPrivateFieldGet(this, _Webhooks_webhookMiddleware, "f");
    }
}
_Webhooks_webhookMiddleware = new WeakMap();
exports.default = Webhooks;
//# sourceMappingURL=webhooks.service.js.map