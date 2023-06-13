import Passkeys from './services/passkeys.service.js';
import EmailLinks from './services/emaillinks.service.js';
import AuthToken from './services/authtoken.service.js';
import Session from './services/session.service.js';
import Webhook from "./services/webhook.service.js";
import webhookMiddleware from './middlewares/webhookMiddleware.js';
import User from "./services/user.service.js";


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

export default Corbado;
