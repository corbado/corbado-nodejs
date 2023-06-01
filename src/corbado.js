const PasskeyService = require('./services/passkey.service');
const EmailLinkService = require('./services/emaillink.service');
const ShortSession = require('./services/shortsession.service');
const assert = require('assert')

class Corbado {

    #shortSession = null
    #passkeyService = null
    #emailLinkService = null

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
                this.#config.projectID,
                this.#config.apiSecret,
                this.#config.apiURL,
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
                this.#config.projectID,
                this.#config.apiSecret,
                this.#config.apiURL,
                this.#config.emailTemplates,
            )
        }

        return this.#emailLinkService
    }

    /**
     *
     * @returns {ShortSession}
     */
    get shortSession() {
        if (this.#shortSession === null) {

            assert(this.#config.issuer !== undefined, 'Issuer undefined')
            assert(this.#config.issuer.length > 0, 'Issuer is empty')
            assert(this.#config.jwksURI !== undefined, 'Issuer undefined')
            assert(this.#config.jwksURI.length > 0, 'JWKS uri is empty')
            assert(this.#config.cacheMaxAge > 0, 'Cache max age is invalid')

            this.#shortSession = new ShortSession(
                this.#config.shortSessionCookieName,
                this.#config.issuer,
                this.#config.jwksURI,
                this.#config.cacheMaxAge,
            )
        }

        return this.#shortSession
    }
}

module.exports = Corbado;
