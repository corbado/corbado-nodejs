// convert this file to typescript (.ts) and add types
import * as assert from "assert";
import * as jose from "jose";
import User from "../entities/User.js";

class Session {

    // #client;
    #shortSessionCookieName;
    #issuer;
    #jwksURI;
    #cacheMaxAge;
    #lastShortSessionValidationResult: string | null = null;


    /**
     * Create a session service.
     * @param version
     * @param shortSessionCookieName
     * @param issuer
     * @param jwksURI
     * @param cacheMaxAge
     * @param client
     */
    constructor(client: any, shortSessionCookieName: any, issuer: any, jwksURI: any, cacheMaxAge: any) {
        if (!client) {
            throw new Error('Invalid argument(s)');
        }
        // this.#client = client;
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
    getShortSessionValue(req: { cookies: { [x: string]: any; }; headers: { authorization: string; }; }) {

        const token = req.cookies[this.#shortSessionCookieName] ?? this.#extractBearerToken(req);

        return (token !== null && token.length >= 10) ? token : null;
    }

    /**
     * Extract the short session cookie if it's stored in the bearer token.
     * @param req
     * @returns {string|null}
     */
    #extractBearerToken(req: { headers: { authorization: string; }; }) {
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
    async validateShortSessionValue(req: null) {

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
            const { payload } = await jose.jwtVerify(token, JWKS, options)

            let issuerValid = false;
            if (payload.iss === this.#issuer) {
                issuerValid = true;
            } else {
                this.#lastShortSessionValidationResult = 'Mismatch in issuer (configured through Frontend API: "' +
                    this.#issuer + '", JWT: "' + payload.iss + ')'
            }

            if (issuerValid) {
                return new User(
                    true,
                    payload.sub,
                    payload.name,
                    payload.email,
                    payload.phoneNumber
                )
            }

            return null;
        } catch (err) {
            // this.#lastShortSessionValidationResult = 'JWT validation failed: ' + err.message;
            this.#lastShortSessionValidationResult = 'JWT validation failed: ' + err;
            console.log(err)
            return new User(false);
        }


    }

    /**
     * Get information for the current user.
     * @returns {Promise<User>}
     */
    async getCurrentUser(req: any) {

        const guest = new User(false);

        const decoded = await this.validateShortSessionValue(req);

        return decoded ?? guest;
    }

    getLastShortSessionValidationResult() {
        return this.#lastShortSessionValidationResult;
    }

}

export default Session;
