/* eslint-disable class-methods-use-this */
export interface ConfigInterface {
  ProjectID: string;
  APISecret: string;
  FrontendAPI: string;
  BackendAPI: string;
  ShortSessionCookieName: string;
  JWTIssuer: string;
  CacheMaxAge: number;
}

export const DefaultBackendAPI = 'https://backendapi.corbado.io';
export const DefaultFrontendAPI = `https://${process.env.PROJECT_ID}.frontendapi.corbado.io`;
export const DefaultShortSessionCookieName = 'cbo_short_session';
export const DefaultCacheMaxAge = 60 * 1000; // 60 * 1000 = 60000 milliseconds, which is equivalent to 1 minute.

class Config implements ConfigInterface {
  ProjectID: string;

  APISecret: string;

  FrontendAPI: string;

  BackendAPI: string = DefaultBackendAPI;

  ShortSessionCookieName: string = DefaultShortSessionCookieName;

  CacheMaxAge: number = DefaultCacheMaxAge;

  JWTIssuer: string;

  constructor(projectID: string, apiSecret: string) {
    this.validateProjectID(projectID);
    this.validateAPISecret(apiSecret);

    this.ProjectID = projectID;
    this.APISecret = apiSecret;
    this.FrontendAPI = DefaultFrontendAPI.replace('[projectID]', projectID);
    this.JWTIssuer = `${DefaultFrontendAPI.replace('[projectID]', projectID)}/.well-known/jwks`;
  }

  private validateProjectID(projectID: string): void {
    if (!projectID || !projectID.startsWith('pro-')) {
      throw new Error('ProjectID must not be empty and must start with "pro-".');
    }
  }

  private validateAPISecret(apiSecret: string): void {
    if (!apiSecret || !apiSecret.startsWith('corbado1_')) {
      throw new Error('APISecret must not be empty and must start with "corbado1_".');
    }
  }
}

export default Config;
