const PasskeyService = require('./services/passkey.service');
const EmailLinkService = require('./services/emaillink.service');
const ShortSession = require('./services/shortsession.service');
const SessionService = require('./services/session.service');
const assert = require('assert')

class Corbado {

    #shortSession = null
    #passkeyService = null
    #emailLinkService = null
    #sessionService = null

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
     * @returns {SessionService}
     */
    get session() {
        if (this.#sessionService  === null) {
            this.#sessionService = new SessionService(
                this.#config.projectID,
                this.#config.apiSecret,
                this.#config.apiURL,
            )
        }

        return this.#sessionService
    }

    /**
     *
     * @returns {ShortSession}
     */
    get shortSession() {
        if (this.#shortSession === null) {

            assert(this.#config.authenticationURL !== undefined, 'AuthenticationURL undefined')
            assert(this.#config.authenticationURL.length > 0, 'AuthenticationURL is empty')
            assert(this.#config.cacheMaxAge > 0, 'Cache max age is invalid')

            this.#shortSession = new ShortSession(
                this.#config.shortSessionCookieName,
                this.#config.authenticationURL,
                this.#config.authenticationURL + '/.well-known/jwks',
                this.#config.cacheMaxAge,
            )
        }

        return this.#shortSession
    }
}

module.exports = Corbado;
