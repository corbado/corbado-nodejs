export interface Config {
  ProjectID: string;
  APISecret: string;
  FrontendAPI: string;
  BackendAPI: string;
  ShortSessionCookieName: string;
  CacheMaxAge: number;
  JWTIssuer: string;
}

export const DefaultBackendAPI = 'https://backendapi.blabla.io';
export const DefaultFrontendAPI = 'https://[projectID].frontendapi.blabla.io';
export const DefaultShortSessionCookieName = 'cbo_short_session';
export const DefaultCacheMaxAge = 60 * 1000; // 60 * 1000 = 60000 milliseconds, which is equivalent to 1 minute.

function validateProjectID(projectID: string): void {
  if (!projectID || !projectID.startsWith('pro-')) {
    throw new Error('ProjectID must not be empty and must start with "pro-".');
  }
}

function validateAPISecret(apiSecret: string): void {
  if (!apiSecret || !apiSecret.startsWith('corbado1_')) {
    throw new Error('APISecret must not be empty and must start with "corbado1_".');
  }
}

export function ConfigFactory(projectID: string, apiSecret: string): Config {
  validateProjectID(projectID);
  validateAPISecret(apiSecret);

  return {
    ProjectID: projectID,
    APISecret: apiSecret,
    BackendAPI: DefaultBackendAPI,
    FrontendAPI: DefaultFrontendAPI.replace('[projectID]', projectID),
    ShortSessionCookieName: DefaultShortSessionCookieName,
    CacheMaxAge: DefaultCacheMaxAge,
    JWTIssuer: '',
  };
}
