import {
  DefaultBackendAPI,
  DefaultCacheMaxAge,
  DefaultJwksCache,
  DefaultShortSessionCookieName,
} from '../../src/config.js';
import { BaseError } from '../../src/errors/index.js';
import { Config } from '../../src/index.js';

describe('Configuration class', () => {
  let projectID: string;
  let apiSecret: string;

  beforeEach(() => {
    projectID = process.env.CORBADO_PROJECT_ID as string; // necessary to mitigate TS error
    apiSecret = process.env.CORBADO_API_SECRET as string; // Same here
    if (!projectID || !apiSecret) {
      throw new BaseError('Env Error', 5001, 'Both projectID and apiSecret must be defined', true);
    }
  });
  const createAndAssertConfig = (config: Config) => {
    expect(config).toBeInstanceOf(Config);
    expect(config.ProjectID).toBe(projectID);
    expect(config.APISecret).toBe(apiSecret);
    expect(config.FrontendAPI).toBe(`https://${projectID}.frontendapi.corbado.io`);
    expect(config.BackendAPI).toBe(DefaultBackendAPI);
    expect(config.ShortSessionCookieName).toBe(DefaultShortSessionCookieName);
    expect(config.CacheMaxAge).toBe(DefaultCacheMaxAge);
  };

  it('should instantiate Configuration with valid project ID and API secret', () => {
    const config = new Config(projectID, apiSecret);
    createAndAssertConfig(config);
  });

  it('should assign default values to BackendAPI, ShortSessionCookieName, CacheMaxAge, and JWTIssuer', () => {
    const config = new Config(projectID, apiSecret);
    expect(config.BackendAPI).toBe(DefaultBackendAPI);
    expect(config.ShortSessionCookieName).toBe(DefaultShortSessionCookieName);
    expect(config.CacheMaxAge).toBe(DefaultCacheMaxAge);
  });

  it('should generate DefaultFrontendAPI using process.env.CORBADO_PROJECT_ID and provided project ID', () => {
    const config = new Config(projectID, apiSecret);
    expect(config.FrontendAPI).toBe(`https://${projectID}.frontendapi.corbado.io`);
  });

  it('should throw an error when instantiated with an invalid project ID', () => {
    expect(() => new Config('invalid', apiSecret)).toThrow('ProjectID must not be empty and must start with "pro-".');
  });

  it('should throw an error when instantiated with an invalid API secret', () => {
    expect(() => new Config(projectID, 'invalid')).toThrow(
      'APISecret must not be empty and must start with "corbado1_".',
    );
  });

  it('should throw an error when project ID is undefined', () => {
    expect(() => new Config(undefined as unknown as string, apiSecret)).toThrow(
      'ProjectID must not be empty and must start with "pro-".',
    );
  });
});
