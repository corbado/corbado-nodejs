const Passkeys = require('./services/passkeys.service');
const EmailLinks = require('./services/emaillinks.service');
const AuthToken = require('./services/authtoken.service');
const Session = require('./services/session.service');
const Webhook = require("./services/webhook.service");
const webhookMiddleware = require('./middlewares/webhookMiddleware');
const User = require("./services/user.service");


/**
 * The Corbado class provides access to various services, including PasskeyService, EmailLinkService, SessionService, WebhookService.
 * It also provides access to utility functions, and middleware, that can help to easily integrate Corbado into your application.
 * @class
 */
class Corbado {

    #passkeys = null
    #emailLinks = null
    #authToken = null
    #session = null;
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

    get authToken() {
        if(this.#authToken === null) {
            this.#authToken = new AuthToken(
                this.#config.client
            )
        }

        return this.#authToken;
    }

    /**
     *
     * @returns {null}
     */
    get session() {
        if(this.#session=== null) {
                if (!this.#config.authenticationURL) {
                    throw new Error('No Authentication URL set');
                }

                this.#session = new Session(
                    this.#config.client,
                    this.#config.shortSessionCookieName,
                    this.#config.authenticationURL,
                    this.#config.authenticationURL + "/.well-known/jwks",
                    this.#config.cacheMaxAge
                );
            }

        return this.#session;
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
