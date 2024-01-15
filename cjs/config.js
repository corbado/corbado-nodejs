"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCacheMaxAge = exports.DefaultShortSessionCookieName = exports.DefaultFrontendAPI = exports.DefaultBackendAPI = void 0;
exports.DefaultBackendAPI = 'https://backendapi.corbado.io';
exports.DefaultFrontendAPI = `https://${process.env.PROJECT_ID}.frontendapi.corbado.io`;
exports.DefaultShortSessionCookieName = 'cbo_short_session';
exports.DefaultCacheMaxAge = 60 * 1000; // 60 * 1000 = 60000 milliseconds, which is equivalent to 1 minute.
class Config {
    constructor(projectID, apiSecret) {
        this.BackendAPI = exports.DefaultBackendAPI;
        this.ShortSessionCookieName = exports.DefaultShortSessionCookieName;
        this.CacheMaxAge = exports.DefaultCacheMaxAge;
        this.validateProjectID(projectID);
        this.validateAPISecret(apiSecret);
        this.ProjectID = projectID;
        this.APISecret = apiSecret;
        this.FrontendAPI = exports.DefaultFrontendAPI.replace('[projectID]', projectID);
        this.JWTIssuer = `${exports.DefaultFrontendAPI.replace('[projectID]', projectID)}/.well-known/jwks`;
    }
    validateProjectID(projectID) {
        if (!projectID || !projectID.startsWith('pro-')) {
            throw new Error('ProjectID must not be empty and must start with "pro-".');
        }
    }
    validateAPISecret(apiSecret) {
        if (!apiSecret || !apiSecret.startsWith('corbado1_')) {
            throw new Error('APISecret must not be empty and must start with "corbado1_".');
        }
    }
}
exports.default = Config;
//# sourceMappingURL=config.js.map