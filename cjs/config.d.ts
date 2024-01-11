export interface ConfigInterface {
    ProjectID: string;
    APISecret: string;
    FrontendAPI: string;
    BackendAPI: string;
    ShortSessionCookieName: string;
    JWTIssuer: string;
    CacheMaxAge: number;
}
export declare const DefaultBackendAPI = "https://backendapi.corbado.io";
export declare const DefaultFrontendAPI: string;
export declare const DefaultShortSessionCookieName = "cbo_short_session";
export declare const DefaultCacheMaxAge: number;
declare class Configuration implements ConfigInterface {
    ProjectID: string;
    APISecret: string;
    FrontendAPI: string;
    BackendAPI: string;
    ShortSessionCookieName: string;
    CacheMaxAge: number;
    JWTIssuer: string;
    constructor(projectID: string, apiSecret: string);
    private validateProjectID;
    private validateAPISecret;
}
export default Configuration;
