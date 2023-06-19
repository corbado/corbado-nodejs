import assert from "assert";
import * as jose from "jose";
import User from "../entities/User.js";

class Session {


    #shortSessionCookieName;
    #issuer;
    #jwksURI;
    #cacheMaxAge;
    #client;

    /**
     * Create a session service.
     * @param version
     * @param shortSessionCookieName
     * @param issuer
     * @param jwksURI
     * @param cacheMaxAge
     * @param client
     */
    constructor(client, shortSessionCookieName, issuer, jwksURI, cacheMaxAge) {
        if (!client) {
            throw new Error('Invalid argument(s)');
        }
        this.#client = client;
        this.#shortSessionCookieName = shortSessionCookieName;
        this.#issuer = issuer;
        this.#jwksURI = jwksURI;
        this.#cacheMaxAge = cacheMaxAge
    }

    /**
     * Obtain the short session cookie.
     * @param req
     * @returns {*|string|null}
     */
    getShortSessionValue(req) {

        const token = req.cookies[this.#shortSessionCookieName] ?? this.#extractBearerToken(req);

        return (token !== null && token.length >= 10) ? token : null;
    }

    /**
     * Extract the short session cookie if it's stored in the bearer token.
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
     * Validate the short session cookie.
     * @param req
     * @returns {Promise<User>}
     */
    async validateShortSessionValue(req) {

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

        try {
            const {payload} = await jose.jwtVerify(token, JWKS, options)
            return new User(
                true,
                payload.sub,
                payload.name,
                payload.email,
                payload.phoneNumber
            )
        } catch (err) {
            console.log(err)
            return new User(false);
        }


    }

    /**
     * Get information for the current user.
     * @returns {Promise<User>}
     */
    async getCurrentUser(req) {

        const guest = new User(false);

        const decoded = await this.validateShortSessionValue(req);

        return decoded ?? guest;
    }

}

export default Session;
