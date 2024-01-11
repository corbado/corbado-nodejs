export const DefaultBackendAPI = 'https://backendapi.corbado.io';
export const DefaultFrontendAPI = `https://${process.env.PROJECT_ID}.frontendapi.corbado.io`;
export const DefaultShortSessionCookieName = 'cbo_short_session';
export const DefaultCacheMaxAge = 60 * 1000; // 60 * 1000 = 60000 milliseconds, which is equivalent to 1 minute.
class Configuration {
    constructor(projectID, apiSecret) {
        this.BackendAPI = DefaultBackendAPI;
        this.ShortSessionCookieName = DefaultShortSessionCookieName;
        this.CacheMaxAge = DefaultCacheMaxAge;
        this.validateProjectID(projectID);
        this.validateAPISecret(apiSecret);
        this.ProjectID = projectID;
        this.APISecret = apiSecret;
        this.FrontendAPI = DefaultFrontendAPI.replace('[projectID]', projectID);
        this.JWTIssuer = `${DefaultFrontendAPI.replace('[projectID]', projectID)}/.well-known/jwks`;
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
export default Configuration;
//# sourceMappingURL=config.js.map