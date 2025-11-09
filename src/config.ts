import axios, { AxiosInstance } from 'axios';
import Assert from './helpers/assert.js';
import { BaseError } from './errors/index.js';

/* eslint-disable class-methods-use-this */
export interface ConfigInterface {
  ProjectID: string;
  APISecret: string;
  FrontendAPI: string;
  BackendAPI: string;
  SessionTokenCookieName: string;
  CacheMaxAge: number;
}

export const DefaultClient = axios.create();
export const DefaultSessionTokenCookieName = 'cbo_session_token';
export const DefaultCacheMaxAge = 10 * 60 * 1000; // 10 * 60 * 1000 = 60000 milliseconds, which is equivalent to 10 minutes.

class Config implements ConfigInterface {
  ProjectID: string;

  APISecret: string;

  FrontendAPI: string;

  BackendAPI: string;

  SessionTokenCookieName: string = DefaultSessionTokenCookieName;

  Client: AxiosInstance;

  CacheMaxAge: number = DefaultCacheMaxAge;

  constructor(projectID: string, apiSecret: string, frontendAPI: string, backendAPI: string) {
    this.validateProjectID(projectID);
    this.validateAPISecret(apiSecret);
    Assert.validURL(frontendAPI, 'frontendAPI');
    Assert.validURL(backendAPI, 'backendAPI');

    this.ProjectID = projectID;
    this.APISecret = apiSecret;
    this.Client = DefaultClient;
    this.FrontendAPI = frontendAPI;
    this.BackendAPI = backendAPI;
  }

  // @deprecated
  public setShortSessionCookieName(shortSessionCookieName: string): void {
    Assert.notEmptyString(shortSessionCookieName, 'shortSessionCookieName');

    this.SessionTokenCookieName = shortSessionCookieName;
  }

  public setSessionTokenCookieName(sessionTokenName: string): void {
    Assert.notEmptyString(sessionTokenName, 'sessionTokenName');

    this.SessionTokenCookieName = sessionTokenName;
  }

  public setHttpClient(client: AxiosInstance): void {
    this.Client = client;
  }

  private validateProjectID(projectID: string): void {
    if (!projectID || !projectID.startsWith('pro-')) {
      const description = 'ProjectID must not be empty and must start with "pro-".';
      throw new BaseError(description, 400, description, true);
    }
  }

  private validateAPISecret(apiSecret: string): void {
    if (!apiSecret || !apiSecret.startsWith('corbado1_')) {
      const description = 'APISecret must not be empty and must start with "corbado1_".';

      throw new BaseError(description, 400, description, true);
    }
  }
}

export default Config;
