import { createRemoteJWKSet, jwtVerify, } from 'jose';
import { BaseError, httpStatusCodes } from '../errors/index.js';
import User from '../entities/user.js';
class Session {
    constructor(version, projectID, frontendAPI, shortSessionCookieName, issuer, cacheMaxAge) {
        this.shortSessionCookieName = shortSessionCookieName;
        this.issuer = issuer;
        const jwkSetUrl = new URL(`${frontendAPI}/.well-known/jwks`);
        const joseOptions = new (class {
            constructor() {
                this.cacheMaxAge = cacheMaxAge;
                this.headers = {
                    'X-Corbado-SDK-Version': version,
                    'X-Corbado-ProjectID': projectID,
                };
            }
        })();
        this.jwks = createRemoteJWKSet(jwkSetUrl, joseOptions);
    }
    async validateShortSessionValue(shortSession) {
        if (shortSession === '' || shortSession === undefined) {
            return this.createAnonymousUser();
        }
        let options = {};
        if (this.issuer !== '') {
            options = Object.assign(options, { issuer: this.issuer });
        }
        const { payload } = await jwtVerify(shortSession, this.jwks, options);
        let issuerValid = false;
        if (payload.iss === this.issuer) {
            issuerValid = true;
        }
        else {
            throw new BaseError('Issuer mismatch', httpStatusCodes.ISSUER_MISMATCH_ERROR.code, `Mismatch in issuer (configured through Frontend API: "${this.issuer}", JWT: "${payload.iss})`, httpStatusCodes.ISSUER_MISMATCH_ERROR.isOperational);
        }
        if (issuerValid) {
            return new User(true, payload.sub, payload.name, payload.email, payload.phoneNumber);
        }
        return this.createAnonymousUser();
    }
    createAnonymousUser() {
        return new User(false, '', '', '', '');
    }
}
export default Session;
//# sourceMappingURL=sessionService.js.map