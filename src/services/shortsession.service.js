const jose = require('jose');
const assert = require('assert')
const NotAuthedError = require('./NotAuthedError')
const User = require('../entities/User')

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
        const token = req.cookies[this.#shortSessionCookieName] ?? this.#getBearerToken(req)
        if (token !== null && token.length < 10) {
            return null
        }

        return token
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
            return new User(false)
        }

        const { payload } = await jose.jwtVerify(token, JWKS, options)

        return new User(
            true,
            payload.sub,
            payload.name,
            payload.email,
            payload.phoneNumber
        )
    }
}


module.exports = ShortSessionService;
