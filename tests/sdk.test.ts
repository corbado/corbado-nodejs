import { BaseError } from '../src/errors/index.js';
import { Config, SDK } from '../src/index.js';

describe('SDK class', () => {
  let projectID;
  let apiSecret;
  let config: Config;
  let sdk: SDK;

  beforeEach(() => {
    projectID = process.env.CORBADO_PROJECT_ID;
    apiSecret = process.env.CORBADO_API_SECRET;

    if (!projectID || !apiSecret) {
      throw new BaseError('Env Error', 5001, 'Both projectID and apiSecret must be defined', true);
    }

    config = new Config(
      projectID,
      apiSecret,
      `https://${projectID}.frontendapi.cloud.corbado.io`,
      `https://backendapi.cloud.corbado.io`,
    );
    sdk = new SDK(config);
  });

  it('should instantiate SDK with Configuration object', () => {
    expect(sdk).toBeDefined();
  });

  it('should create AxiosInstance with provided Configuration object', () => {
    const axiosInstance = sdk.createClient(config);
    expect(axiosInstance).toBeDefined();
  });

  it('should create Sessions object with created AxiosInstance', () => {
    const sessions = sdk.sessions();
    expect(sessions).toBeDefined();
  });

  it('should create Users object with created AxiosInstance', () => {
    const users = sdk.users();
    expect(users).toBeDefined();
  });

  it('should create Identifiers object with created AxiosInstance', () => {
    const identifiers = sdk.identifiers();
    expect(identifiers).toBeDefined();
  });
});
