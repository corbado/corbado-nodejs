import {DefaultCacheMaxAge, DefaultSessionTokenCookieName} from '../src/config.js';
import { BaseError } from '../src/errors/index.js';
import { Config } from '../src/index.js';

describe('Configuration class', () => {
  let projectID: string;
  let apiSecret: string;
  let frontendAPI: string;
  let backendAPI: string;

  beforeEach(() => {
    projectID = process.env.CORBADO_PROJECT_ID as string; // necessary to mitigate TS error
    apiSecret = process.env.CORBADO_API_SECRET as string; // Same here
    frontendAPI = process.env.CORBADO_FRONTEND_API as string; // Same here
    backendAPI = process.env.CORBADO_BACKEND_API as string; // Same here

    if (!projectID || !apiSecret) {
      throw new BaseError('Env Error', 5001, 'Both projectID and apiSecret must be defined', true);
    }
  });

  const createAndAssertConfig = (config: Config) => {
    expect(config).toBeInstanceOf(Config);
    expect(config.ProjectID).toBe(projectID);
    expect(config.APISecret).toBe(apiSecret);
    expect(config.FrontendAPI).toBe(`https://${projectID}.frontendapi.cloud.corbado.io`);
    expect(config.BackendAPI).toBe(backendAPI);
    expect(config.SessionTokenCookieName).toBe(DefaultSessionTokenCookieName);
    expect(config.CacheMaxAge).toBe(DefaultCacheMaxAge);
  };

  it('should instantiate Configuration with valid project ID and API secret and APIs', () => {
    const config = new Config(projectID, apiSecret, frontendAPI, backendAPI);
    createAndAssertConfig(config);
  });

  it('should assign default values to BackendAPI, ShortSessionCookieName, CacheMaxAge, and JWTIssuer', () => {
    const config = new Config(projectID, apiSecret, frontendAPI, backendAPI);
    expect(config.BackendAPI).toBe(backendAPI);
    expect(config.FrontendAPI).toBe(frontendAPI);
    expect(config.SessionTokenCookieName).toBe(DefaultSessionTokenCookieName);
    expect(config.CacheMaxAge).toBe(DefaultCacheMaxAge);
  });

  it('should throw an error when instantiated with an invalid project ID', () => {
    expect(() => new Config('invalid', apiSecret, frontendAPI, backendAPI)).toThrow(
      'ProjectID must not be empty and must start with "pro-".',
    );
  });

  it('should throw an error when instantiated with an invalid API secret', () => {
    expect(() => new Config(projectID, 'invalid', frontendAPI, backendAPI)).toThrow(
      'APISecret must not be empty and must start with "corbado1_".',
    );
  });

  it('should throw an error when project ID is undefined', () => {
    expect(() => new Config(undefined as unknown as string, apiSecret, frontendAPI, backendAPI)).toThrow(
      'ProjectID must not be empty and must start with "pro-".',
    );
  });

  it('should throw an error when frontendAPI is wrong', () => {
    expect(() => new Config(projectID, apiSecret, `${frontendAPI}/v2`, backendAPI)).toThrow('path needs to be empty');
  });

  it('should throw an error when backendAPI is wrong', () => {
    expect(() => new Config(projectID, apiSecret, frontendAPI, `${backendAPI}/v2`)).toThrow('path needs to be empty');
  });
});
