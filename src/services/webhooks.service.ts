// convert this file to typescript (.ts) and add types
import * as assert from "assert";

class Webhooks {
    WEBHOOK_ACTION = {
        AUTH_METHODS: "authMethods",
        PASSWORD_VERIFY: "passwordVerify",
    };

    ALLOWED_STATUS = ["exists", "not_exists", "blocked"];

    // #webhookUsername;
    // #webhookPassword;

    #webhookMiddleware;

    /**
     *
     * @param version
     * @param shortSessionCookieName
     * @param issuer
     * @param jwksURI
     * @param cacheMaxAge
     * @param client
     */
    constructor(webhookMiddleware: (req: { headers: { authorization: string; }; method: string; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any; }; json: { (arg0: { message: string; }): any; new(): any; }; }; setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => any) {
        this.#webhookMiddleware = webhookMiddleware;
    }

    /**
     * Returns webhook action (by reading the header field X-SDK-Action)
     *
     * @return {Object}
     */
    getAction(req: { get: (arg0: string) => string; }) {
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
    getAuthMethodsRequest(req: { body: any; }) {
        const data = req.body;

        assert.ok(data.id, "Missing id field");
        assert.ok(data.projectID, "Missing projectID field");
        assert.ok(
            data.action === this.WEBHOOK_ACTION.AUTH_METHODS,
            `Unexpected action: ${data.action}`
        );
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

    getAuthMethodsResponse(status: string, responseID = "") {
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
    getPasswordVerifyRequest(req: { body: any; }) {
        const data = req.body;
        const requiredFields = ["id", "projectID"];
        const requiredDataKeys = ["username", "password"];

        if (
            !requiredFields.every((key) => key in data) ||
            !requiredDataKeys.every((key) => key in data.data)
        ) {
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
    getPasswordVerifyResponse(success: any, responseID = "") {
        return {
            responseID: responseID,
            data: { success },
        };
    }

    get middleware() {
        return this.#webhookMiddleware;
    }
}

export default Webhooks;
