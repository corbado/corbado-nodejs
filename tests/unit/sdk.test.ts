import { BaseError } from '../../src/errors/index.js';
import { Config, SDK } from '../../src/index.js';

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

    config = new Config(projectID, apiSecret);
    sdk = new SDK(config);
  });

  it('should instantiate SDK with Configuration object', () => {
    expect(sdk).toBeDefined();
  });

  it('should create AxiosInstance with provided Configuration object', () => {
    const axiosInstance = sdk.createClient(config);
    expect(axiosInstance).toBeDefined();
  });

  it('should create AuthToken object with created AxiosInstance', () => {
    const authToken = sdk.authTokens();
    expect(authToken).toBeDefined();
  });

  it('should create EmailLink object with created AxiosInstance', () => {
    const emailLink = sdk.emailLinks();
    expect(emailLink).toBeDefined();
  });

  it('should create EmailOtp object with created AxiosInstance', () => {
    const emailOtp = sdk.emailOtp();
    expect(emailOtp).toBeDefined();
  });

  it('should create Sessions object with created AxiosInstance', () => {
    const sessions = sdk.sessions();
    expect(sessions).toBeDefined();
  });

  it('should create SmsOtp object with created AxiosInstance', () => {
    const smsOtp = sdk.smsOtp();
    expect(smsOtp).toBeDefined();
  });

  it('should create Users object with created AxiosInstance', () => {
    const users = sdk.getUsers();
    expect(users).toBeDefined();
  });

  it('should create Validations object with created AxiosInstance', () => {
    const validation = sdk.validations();
    expect(validation).toBeDefined();
  });
});
