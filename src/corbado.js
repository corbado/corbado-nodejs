const PasskeyService = require('./services/passkey.service');
const EmailLinkService = require('./services/emaillink.service');
const SessionService = require('./services/session.service');
const WebhookService = require("./services/webhook.service");
const webhookMiddleware = require('./middlewares/webhookMiddleware');
const assert = require('assert');


/**
 * The Corbado class provides access to various services, including PasskeyService, EmailLinkService, SessionService, WebhookService.
 * It also provides access to utility functions, and middleware, that can help to easily integrate Corbado into your application.
 * @class
 */
class Corbado {

    #passkey = null
    #emailLink = null
    #session = null
    #webhook = null;

    /**
     * @type {Configuration}
     */
    #config = null

    /**
     *
     * @param {Configuration} config
     */
    constructor(config) {
        this.#config = config;


        // PasskeyService
        this.#passkey = new PasskeyService(
            this.#config.client,
            this.emailLink,
        )

        // EmailLinkService
        this.#emailLink = new EmailLinkService(
            this.#config.client,
            this.#config.emailTemplates,
        )

        // SessionService
        const validSessionVersions = ['v1', 'v2'];
        assert(validSessionVersions.includes(this.#config.sessionVersion), 'Session version number not allowed');

        this.#session = new SessionService(
            this.#config.sessionVersion,
            this.#config.shortSessionCookieName,
            this.#config.authenticationURL,
            this.#config.authenticationURL + "/.well-known/jwks",
            this.#config.cacheMaxAge,
            this.#config.client
        );

    }

    /**
     *
     * @returns {PasskeyService}
     */
    get passkey() {
        return this.#passkey
    }

    /**
     *
     * @returns {EmailLinkService}
     */
    get emailLink() {
        return this.#emailLink
    }

    /**
     *
     * @returns {SessionService}
     */
    get session() {
        return this.#session;
    }

    /**
     *
     * @returns {WebhookService}
     */
    get webhook() {
        if (this.#webhook === null) {
            this.#webhook = new WebhookService(
                webhookMiddleware(this.#config.webhookUsername, this.#config.webhookPassword)
            )
        }
        return this.#webhook
    }

}

module.exports = Corbado;
