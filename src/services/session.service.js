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
        if (!version || !client) {
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
    getShortSessionValue(req) {
        if (this.#version === 'v1') {
            throw new Error('This is only available on session v2');
        }

        const token = req.cookies[this.#shortSessionCookieName] ?? this.#extractBearerToken(req);
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
    #extractBearerToken(req) {
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
    async validateShortSessionValue(req) {
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
        const token = this.getShortSessionValue(req)
        if (token === null) {
            return new User(false)
        }

        const {payload} = await jose.jwtVerify(token, JWKS, options)

        return new User(
            true,
            payload.sub,
            payload.Name,
            payload.Email,
            payload.PhoneNumber
        )
    }

    async getCurrentUser() {
        if (this.#version === 'v1') {
            throw new Error('getCurrentUser() is only available in session v2');
        }

        const guest = new User(false);

        const value = this.getShortSessionValue();
        if (value.length < 10) {
            return guest;
        }

        const decoded = await this.validateShortSessionValue(value);
        if (decoded !== null) {
            return new User(
                true,
                decoded.id,
                decoded.name,
                decoded.email,
                decoded.phoneNumber
            );
        }

        return guest;
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
    async verify(corbadoSessionToken, clientInfo, requestID = null) {
        if (this.#version === 'v2') {
            throw new Error('This is only available on session v1');
        }

        if (!corbadoSessionToken) {
            throw new Error('SessionToken is required');
        }

        const params = {
            token: corbadoSessionToken,
            clientInfo: clientInfo
        }

        if (requestID) {
            params.requestID = requestID;
        }

        return await this.#client.request('/sessions/verify', 'POST', params);
    }
}

module.exports = SessionService;
