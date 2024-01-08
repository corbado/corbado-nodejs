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

function ConfigFactory(projectID: string, apiSecret: string): Config {
  validateProjectID(projectID);
  validateAPISecret(apiSecret);

  return {
    ProjectID: projectID,
    APISecret: apiSecret,
    FrontendAPI: DefaultFrontendAPI.replace('[projectID]', projectID),
    BackendAPI: DefaultBackendAPI,
    ShortSessionCookieName: DefaultShortSessionCookieName,
    CacheMaxAge: DefaultCacheMaxAge,
    JWTIssuer: '',
  };
}

// class ConfigFactory {
//   ProjectID: string;

//   APISecret: string;

//   FrontendAPI: string;

//   BackendAPI: string = DefaultBackendAPI;

//   ShortSessionCookieName: string = DefaultShortSessionCookieName;

//   CacheMaxAge: number = DefaultCacheMaxAge;

//   JWTIssuer: string = '';

//   // private httpClient?: ClientInterface;

//   // private jwksCachePool?: CacheItemPoolInterface;

//   constructor(projectID: string, apiSecret: string) {
//     validateProjectID(projectID);
//     validateAPISecret(apiSecret);

//     this.ProjectID = projectID;
//     this.APISecret = apiSecret;
//     this.FrontendAPI = DefaultFrontendAPI.replace('[projectID]', projectID);
//   }

//   // Getters and Setters for httpClient and jwksCachePool if needed

//   // setHttpClient(httpClient: ClientInterface): this {
//   //   this.httpClient = httpClient;
//   //   return this;
//   // }

//   // setJwksCachePool(jwksCachePool: CacheItemPoolInterface): this {
//   //   this.jwksCachePool = jwksCachePool;
//   //   return this;
//   // }

//   // getHttpClient(): ClientInterface | undefined {
//   //   return this.httpClient;
//   // }

//   // getJwksCachePool(): CacheItemPoolInterface | undefined {
//   //   return this.jwksCachePool;
//   // }

//   // Additional methods if needed
// }

export default ConfigFactory;
