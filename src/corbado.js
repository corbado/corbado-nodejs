const Passkeys = require('./services/passkey.service');
const EmailLinks = require('./services/emaillink.service');
const SessionV1 = require('./services/sessionv1.service');
const SessionV2 = require('./services/sessionv2.service');
const Webhook = require("./services/webhook.service");
const webhookMiddleware = require('./middlewares/webhookMiddleware');
const User = require("./services/User");


/**
 * The Corbado class provides access to various services, including PasskeyService, EmailLinkService, SessionService, WebhookService.
 * It also provides access to utility functions, and middleware, that can help to easily integrate Corbado into your application.
 * @class
 */
class Corbado {

    #passkeys = null
    #emailLinks = null
    #sessionV1 = null
    #sessionV2 = null;
    #webhook = null;
    #users = null;

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
    }

    /**
     *
     * @returns {*}
     */
    get passkey() {
        if (this.#passkeys === null) {
            this.#passkeys = new Passkeys(
                this.#config.client,
                this.emailLink,
            )
        }

        return this.#passkeys;
    }

    /**
     *
     * @returns {null}
     */
    get emailLink() {
        if (this.#emailLinks === null) {
            // EmailLinkService
            this.#emailLinks = new EmailLinks(
                this.#config.client,
                this.#config.emailTemplates,
            )
        }
        return this.#emailLinks;
    }

    get users() {
        if(this.#users === null) {

            this.#users = new User(this.#config.client);
        }

        return this.#users;
    }

    get sessionV1() {
        if(this.#sessionV1 === null) {
            this.#sessionV1 = new SessionV1(
                this.#config.client
            )
        }

        return this.#sessionV1;
    }

    /**
     *
     * @returns {null}
     */
    get sessionV2() {
        if(this.#sessionV2 === null) {
                if (!this.#config.authenticationURL) {
                    throw new Error('No Authentication URL set');
                }

                this.#sessionV1 = new SessionV2(
                    this.#config.client,
                    this.#config.shortSessionCookieName,
                    this.#config.authenticationURL,
                    this.#config.authenticationURL + "/.well-known/jwks",
                    this.#config.cacheMaxAge
                );
            }

        return this.#sessionV2;
    }

    /**
     *
     * @returns {null}
     */
    get webhook() {
        if (this.#webhook === null) {
            this.#webhook = new Webhook(
                webhookMiddleware(this.#config.webhookUsername, this.#config.webhookPassword)
            )
        }
        return this.#webhook
    }

}

module.exports = Corbado;
