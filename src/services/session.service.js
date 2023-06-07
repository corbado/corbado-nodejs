const assert = require("assert");
const jose = require("jose");
const User = require("../entities/User");

class SessionService {

    #version;
    #shortSessionCookieName;
    #issuer;
    #jwksURI;
    #cacheMaxAge;
    #client;

    /**
     *
     * @param version
     * @param shortSessionCookieName
     * @param issuer
     * @param jwksURI
     * @param cacheMaxAge
     * @param client
     */
    constructor(version, shortSessionCookieName, issuer, jwksURI, cacheMaxAge, client) {
        if (!version || !shortSessionCookieName || !issuer || !jwksURI || !cacheMaxAge || !client) {
            throw new Error('Invalid argument(s)');
        }
        this.#version = version;
        this.#shortSessionCookieName = shortSessionCookieName;
        this.#issuer = issuer;
        this.#jwksURI = jwksURI;
        this.#cacheMaxAge = cacheMaxAge
        this.#client = client;
    }

    /**
     *
     * @param req
     * @returns {*|string|null}
     */
    #getSessionToken(req) {
        if (this.#version === 'v1') {
            throw new Error('This is only available on session v2');
        }

        const token = req.cookies[this.#shortSessionCookieName] ?? this.#getBearerToken(req);
        if (token !== null && token.length < 10) {
            return null;
        }

        return token;
    }

    /**
     *
     * @param req
     * @returns {string|null}
     */
    #getBearerToken(req) {
        if (!req.headers.authorization) {
            return null;
        }

        if (!req.headers.authorization.startsWith('Bearer ')) {
            return null;
        }

        return req.headers.authorization.substr(7);
    }

    /**
     *
     * @param req
     * @returns {Promise<User>}
     */
    async validate(req) {
        if (this.#version === 'v1') {
            throw new Error('This is only available on session v2');
        }

        assert(typeof req === 'object' && req !== null, 'RequestObject not given');

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

        const {payload} = await jose.jwtVerify(token, JWKS, options)

        return new User(
            true,
            payload.sub,
            payload.name,
            payload.email,
            payload.phoneNumber
        )
    }



    /**
     * Verifies a session token by sending a request to Corbado.
     *
     * @param {string} sessionToken - The session token obtained as an HTTP GET parameter from the Redirect URL.
     * @param {object} clientInfo - The clientInfo object containing the browser and device information {remoteAddress, userAgent, origin}.
     * @param {string|null} requestID - An optional request ID to send to Corbado.
     *
     * @returns {object} - The response from the server containing the userData.
     * @throws {Error} - If the request fails.
     */
    async verify(sessionToken, clientInfo, requestID = null) {
        if (this.#version === 'v2') {
            throw new Error('This is only available on session v1');
        }

        if (!sessionToken) {
            throw new Error('SessionToken is required');
        }

        const params = {
            token: sessionToken,
            clientInfo: clientInfo
        }

        if (requestID) {
            params.requestID = requestID;
        }

        return await this.#client.request('/sessions/verify', 'POST', params);
    }
}

module.exports = SessionService;
