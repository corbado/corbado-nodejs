export interface Config {
    ProjectID: string
    APISecret: string
    FrontendAPI: string
    BackendAPI: string
    ShortSessionCookieName: string
    CacheMaxAge: number
    JWTIssuer: string
}

export const DefaultBackendAPI = "https://backendapi.corbado.io"
export const DefaultFrontendAPI = "https://[projectID].frontendapi.corbado.io"
export const DefaultShortSessionCookieName = "cbo_short_session"
export const DefaultCacheMaxAge = 60 * 1000

export function ConfigFactory(projectID: string, apiSecret: string): Config {
    return new class implements Config {
        APISecret: string = apiSecret;
        BackendAPI: string = DefaultBackendAPI;
        CacheMaxAge: number = DefaultCacheMaxAge;
        FrontendAPI: string = DefaultFrontendAPI.replace('[projectID]', projectID);
        JWTIssuer: string = "";
        ProjectID: string = projectID;
        ShortSessionCookieName: string = DefaultShortSessionCookieName;
    }
}
