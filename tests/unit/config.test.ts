import { BaseError } from '../../src/errors/index.js';
import {
  Configuration,
  DefaultBackendAPI,
  DefaultShortSessionCookieName,
  DefaultCacheMaxAge,
} from '../../src/index.js';

describe('Configuration class', () => {
  let projectID: string;
  let apiSecret: string;

  beforeEach(() => {
    projectID = process.env.PROJECT_ID as string; // necessary to mitigate TS error
    apiSecret = process.env.API_SECRET as string; // Same here
    if (!projectID || !apiSecret) {
      throw new BaseError('Env Error', 5001, 'Both projectID and apiSecret must be defined', true);
    }
  });

  const createAndAssertConfig = (config: Configuration) => {
    expect(config).toBeInstanceOf(Configuration);
    expect(config.ProjectID).toBe(projectID);
    expect(config.APISecret).toBe(apiSecret);
    expect(config.FrontendAPI).toBe(`https://${projectID}.frontendapi.corbado.io`);
    expect(config.BackendAPI).toBe(DefaultBackendAPI);
    expect(config.ShortSessionCookieName).toBe(DefaultShortSessionCookieName);
    expect(config.CacheMaxAge).toBe(DefaultCacheMaxAge);
    expect(config.JWTIssuer).toBe(`https://${projectID}.frontendapi.corbado.io/.well-known/jwks`);
  };

  it('should instantiate Configuration with valid project ID and API secret', () => {
    const config = new Configuration(projectID, apiSecret);
    createAndAssertConfig(config);
  });

  it('should assign default values to BackendAPI, ShortSessionCookieName, CacheMaxAge, and JWTIssuer', () => {
    const config = new Configuration(projectID, apiSecret);
    expect(config.BackendAPI).toBe(DefaultBackendAPI);
    expect(config.ShortSessionCookieName).toBe(DefaultShortSessionCookieName);
    expect(config.CacheMaxAge).toBe(DefaultCacheMaxAge);
    expect(config.JWTIssuer).toBe(`https://${projectID}.frontendapi.corbado.io/.well-known/jwks`);
  });

  it('should generate DefaultFrontendAPI using process.env.PROJECT_ID and provided project ID', () => {
    const config = new Configuration(projectID, apiSecret);
    expect(config.FrontendAPI).toBe(`https://${projectID}.frontendapi.corbado.io`);
  });

  it('should throw an error when instantiated with an invalid project ID', () => {
    expect(() => new Configuration('invalid', apiSecret)).toThrowError(
      'ProjectID must not be empty and must start with "pro-".',
    );
  });

  it('should throw an error when instantiated with an invalid API secret', () => {
    expect(() => new Configuration(projectID, 'invalid')).toThrowError(
      'APISecret must not be empty and must start with "corbado1_".',
    );
  });

  it('should throw an error when project ID is undefined', () => {
    expect(() => new Configuration(undefined as unknown as string, apiSecret)).toThrowError(
      'ProjectID must not be empty and must start with "pro-".',
    );
  });
});
