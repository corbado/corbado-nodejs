const PasskeyService = require('./services/passkey.service');
const EmailLinkService = require('./services/emaillink.service');
const SessionService = require('./services/session.service');
const assert = require('assert')

class Corbado {

    #passkeyService = null
    #emailLinkService = null
    #sessionService = null
    #sessionVersion = null;

    /**
     * @type {Configuration}
     */
    #config = null

    /**
     *
     * @param {Configuration} config
     */
    constructor(config) {
        this.#config = config
    }

    /**
     *
     * @returns {PasskeyService}
     */
    get passkey() {
        if (this.#passkeyService === null) {
            this.#passkeyService = new PasskeyService(
                this.#config.client,
                this.emailLink,
            )
        }

        return this.#passkeyService
    }

    /**
     *
     * @returns {EmailLinkService}
     */
    get emailLink() {
        if (this.#emailLinkService === null) {
            this.#emailLinkService = new EmailLinkService(
                this.#config.client,
                this.#config.emailTemplates,
            )
        }

        return this.#emailLinkService
    }

    /**
     *
     * @returns {SessionService}
     */
    session(version = 'v2') {
        const validVersions = ['v1', 'v2'];

        if (this.#sessionVersion && this.#sessionVersion !== version) {
            throw new Error('Called session with different version before');
        }

        if (this.#sessionService === null) {

            assert(validVersions.includes(version), 'Version number not allowed');

            this.#sessionService = new SessionService(
                version,
                this.#config.shortSessionCookieName,
                this.#config.authenticationURL,
                this.#config.authenticationURL + "/.well-known/jwks.json",
                this.#config.cacheMaxAge,
                this.#config.client
            );
        }

        return this.#sessionService;
    }
}

module.exports = Corbado;
