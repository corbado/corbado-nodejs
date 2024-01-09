"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jose_1 = require("jose");
const index_js_1 = require("../errors/index.js");
const user_js_1 = require("../entities/user.js");
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
        this.jwks = (0, jose_1.createRemoteJWKSet)(jwkSetUrl, joseOptions);
    }
    async validateShortSessionValue(shortSession) {
        if (shortSession === '' || shortSession === undefined) {
            return this.createAnonymousUser();
        }
        let options = {};
        if (this.issuer !== '') {
            options = Object.assign(options, { issuer: this.issuer });
        }
        const { payload } = await (0, jose_1.jwtVerify)(shortSession, this.jwks, options);
        let issuerValid = false;
        if (payload.iss === this.issuer) {
            issuerValid = true;
        }
        else {
            throw new index_js_1.BaseError('Issuer mismatch', index_js_1.httpStatusCodes.ISSUER_MISMATCH_ERROR.code, `Mismatch in issuer (configured through Frontend API: "${this.issuer}", JWT: "${payload.iss})`, index_js_1.httpStatusCodes.ISSUER_MISMATCH_ERROR.isOperational);
        }
        if (issuerValid) {
            return new user_js_1.default(true, payload.sub, payload.name, payload.email, payload.phoneNumber);
        }
        return this.createAnonymousUser();
    }
    createAnonymousUser() {
        return new user_js_1.default(false, '', '', '', '');
    }
}
exports.default = Session;
//# sourceMappingURL=sessionService.js.map