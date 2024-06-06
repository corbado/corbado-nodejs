import axios, { AxiosInstance } from 'axios';
import Assert from './helpers/assert.js';

/* eslint-disable class-methods-use-this */
export interface ConfigInterface {
  ProjectID: string;
  APISecret: string;
  FrontendAPI: string;
  BackendAPI: string;
  ShortSessionCookieName: string;
  CacheMaxAge: number;
}

export const DefaultClient = axios.create();
export const DefaultBackendAPI = 'https://backendapi.corbado.io';
export const DefaultFrontendAPI = 'https://[projectID].frontendapi.corbado.io';
export const DefaultShortSessionCookieName = 'cbo_short_session';
export const DefaultCacheMaxAge = 10 * 60 * 1000; // 10 * 60 * 1000 = 60000 milliseconds, which is equivalent to 10 minutes.

class Config implements ConfigInterface {
  ProjectID: string;

  APISecret: string;

  FrontendAPI: string;

  FrontendAPIWithCName: string;

  BackendAPI: string = DefaultBackendAPI;

  ShortSessionCookieName: string = DefaultShortSessionCookieName;

  Client: AxiosInstance;

  CacheMaxAge: number = DefaultCacheMaxAge;

  constructor(projectID: string, apiSecret: string, cname?: string) {
    this.validateProjectID(projectID);
    this.validateAPISecret(apiSecret);

    this.ProjectID = projectID;
    this.APISecret = apiSecret;
    this.Client = DefaultClient;
    this.FrontendAPI = DefaultFrontendAPI.replace('[projectID]', projectID);
    this.FrontendAPIWithCName = cname ?? this.FrontendAPI;
  }

  public setFrontendAPI(frontendApi: string): void {
    Assert.validURL(frontendApi, 'frontendApi');
    this.FrontendAPI = frontendApi;
  }

  public setBackendAPI(backendAPI: string): void {
    Assert.validURL(backendAPI, 'backendAPI');
    this.BackendAPI = backendAPI;
  }

  public setShortSessionCookieName(shortSessionCookieName: string): void {
    Assert.notEmptyString(shortSessionCookieName, 'shortSessionCookieName');

    this.ShortSessionCookieName = shortSessionCookieName;
  }

  public setHttpClient(client: AxiosInstance): void {
    this.Client = client;
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
