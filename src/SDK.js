import Passkeys from './services/passkeys.service.js';
import EmailLinks from './services/emaillinks.service.js';
import AuthToken from './services/authtoken.service.js';
import Session from './services/session.service.js';
import Webhook from "./services/webhook.service.js";
import webhookMiddleware from './middlewares/webhookMiddleware.js';
import User from "./services/user.service.js";
import CorbadoApi from "./services/CorbadoApi.js";
import {utils} from "./utils/clientInfo.utils.js";


/**
 * The SDK class provides access to various services, including PasskeyService, EmailLinkService, SessionService, WebhookService.
 * It also provides access to utility functions, and middleware, that can help to easily integrate SDK into your application.
 * @class
 */
class SDK {

    #config = null;
    #client = null;
    #passkeys = null;
    #emailLinks = null;
    #corbadoAuthToken = null;
    #session = null;
    #webhook = null;
    #users = null;
    #utils = null;


    /**
     *
     * @param {Configuration} config
     */
    constructor(config) {
        this.#config = config;

        if (this.#config.client === undefined) {
            if (this.#config.projectID === null) {
                throw new Error('No project ID set');
            }

            if (this.#config.apiSecret === null) {
                throw new Error('No api secret set');
            }

            this.#client = new CorbadoApi(this.#config.projectID, this.#config.apiSecret, this.#config.backendAPI)
        } else {
            this.#client = this.#config.client;
        }

        this.#utils = utils;
    }

    /**
     *
     * @returns {*}
     */
    get passkey() {
        if (this.#passkeys === null) {
            this.#passkeys = new Passkeys(
                this.#client,
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
                this.#client,
                this.#config.emailTemplates,
            )
        }
        return this.#emailLinks;
    }

    get users() {
        if (this.#users === null) {

            this.#users = new User(this.#client);
        }

        return this.#users;
    }

    get corbadoAuthToken() {
        if (this.#corbadoAuthToken === null) {
            this.#corbadoAuthToken = new AuthToken(
                this.#config.client
            )
        }

        return this.#corbadoAuthToken;
    }

    /**
     *
     * @returns {null}
     */
    get session() {
        if (this.#session === null) {

            this.#session = new Session(
                this.#client,
                this.#config.shortSessionCookieName,
                this.#config.frontendAPI,
                this.#config.frontendAPI + "/.well-known/jwks",
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

export default SDK;
