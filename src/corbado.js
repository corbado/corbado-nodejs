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

    #passkeyService = null
    #emailLinkService = null
    #sessionService = null
    #webhookService = null;

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
        this.#passkeyService = new PasskeyService(
            this.#config.client,
            this.emailLink,
        )

        // EmailLinkService
        this.#emailLinkService = new EmailLinkService(
            this.#config.client,
            this.#config.emailTemplates,
        )

        // SessionService
        const validSessionVersions = ['v1', 'v2'];
        assert(validSessionVersions.includes(this.#config.sessionVersion), 'Session version number not allowed');

        this.#sessionService = new SessionService(
            this.#config.sessionVersion,
            this.#config.shortSessionCookieName,
            this.#config.authenticationURL,
            this.#config.authenticationURL + "/.well-known/jwks",
            this.#config.cacheMaxAge,
            this.#config.client
        );

        // WebhookService
        this.#webhookService = new WebhookService(
            webhookMiddleware(this.#config.webhookUsername, this.#config.webhookPassword)
        )

    }

    /**
     *
     * @returns {PasskeyService}
     */
    get passkey() {
        return this.#passkeyService
    }

    /**
     *
     * @returns {EmailLinkService}
     */
    get emailLink() {
        return this.#emailLinkService
    }

    /**
     *
     * @returns {SessionService}
     */
    get session() {
        return this.#sessionService;
    }

    /**
     *
     * @returns {WebhookService}
     */
    get webhook() {
        return this.#webhookService
    }

}

module.exports = Corbado;
