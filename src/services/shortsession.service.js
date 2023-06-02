const jose = require('jose');
const assert = require('assert')
const NotAuthedError = require('NotAuthedError')

class ShortSessionService {

    #shortSessionCookieName
    #issuer
    #jwksURI
    #cacheMaxAge

    constructor(shortSessionCookieName, issuer, jwksURI, cacheMaxAge) {
        this.#shortSessionCookieName = shortSessionCookieName
        this.#issuer = issuer
        this.#jwksURI = jwksURI
        this.#cacheMaxAge = cacheMaxAge
    }

    #getSessionToken(req) {
        return req.cookies[this.#shortSessionCookieName] ?? this.#getBearerToken(req)
    }

    #getBearerToken(req) {
        if (!req.headers.authorization) {
            return null
        }

        if (!req.headers.authorization.startsWith('Bearer ')) {
            return null
        }

        return req.headers.authorization.substr(7)
    }

    async validate(req) {
        assert(typeof req === 'object')

        const JWKS = jose.createRemoteJWKSet(new URL(this.#jwksURI), {
            cacheMaxAge: this.#cacheMaxAge
        })
        const options = {
            issuer: this.#issuer,
        }
        const token = this.#getSessionToken(req)
        if (token === null) {
            throw new NotAuthedError()
        }

        const { payload } = await jose.jwtVerify(token, JWKS, options)

        return payload
    }
}


module.exports = ShortSessionService;
