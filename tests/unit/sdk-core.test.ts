import { Config, SDK } from '../../src/index.js';
import { BaseError } from '../../src/errors/index.js';

describe('SDK Core Functionality', () => {
  let projectID: string;
  let apiSecret: string;
  let frontendAPI: string;
  let backendAPI: string;
  let config: Config;

  beforeEach(() => {
    projectID = process.env.CORBADO_PROJECT_ID as string;
    apiSecret = process.env.CORBADO_API_SECRET as string;
    frontendAPI = process.env.CORBADO_FRONTEND_API as string;
    backendAPI = process.env.CORBADO_BACKEND_API as string;

    if (!projectID || !apiSecret) {
      throw new BaseError('Env Error', 5001, 'Both projectID and apiSecret must be defined', true);
    }

    config = new Config(projectID, apiSecret, frontendAPI, backendAPI);
  });

  it('should create SDK instance successfully', () => {
    const sdk = new SDK(config);

    expect(sdk).toBeDefined();
    expect(sdk.sessions()).toBeDefined();
    expect(sdk.users()).toBeDefined();
    expect(sdk.identifiers()).toBeDefined();
  });

  it('should create axios client with correct configuration', () => {
    const sdk = new SDK(config);
    const axiosClient = sdk.createClient(config);

    expect(axiosClient).toBeDefined();
    expect(axiosClient.defaults.baseURL).toBe(`${backendAPI}/v2`);
    expect(axiosClient.defaults.auth).toEqual({
      username: projectID,
      password: apiSecret,
    });
    expect(axiosClient.defaults.headers['X-Corbado-ProjectID']).toBe(projectID);
    expect(axiosClient.defaults.headers['X-Corbado-SDK']).toBeDefined();
  });

  it('should set correct SDK headers', () => {
    const sdk = new SDK(config);
    const axiosClient = sdk.createClient(config);

    const sdkHeader = JSON.parse(axiosClient.defaults.headers['X-Corbado-SDK'] as string);
    expect(sdkHeader.name).toBe('Node.js SDK');
    expect(sdkHeader.languageVersion).toBe(process.version);
  });

  it('should throw error in browser environment', () => {
    // Mock browser environment
    const originalWindow = global.window;
    const originalDocument = global.document;

    // @ts-ignore
    global.window = { document: {} };
    // @ts-ignore
    global.document = {};

    expect(() => new SDK(config)).toThrow('This SDK is not supported in browser environment');

    // Restore original environment
    global.window = originalWindow;
    global.document = originalDocument;
  });

  it('should return correct service instances', () => {
    const sdk = new SDK(config);

    const sessionService = sdk.sessions();
    const userService = sdk.users();
    const identifierService = sdk.identifiers();

    expect(sessionService).toBeDefined();
    expect(userService).toBeDefined();
    expect(identifierService).toBeDefined();

    // Should return the same instances on subsequent calls
    expect(sdk.sessions()).toBe(sessionService);
    expect(sdk.users()).toBe(userService);
    expect(sdk.identifiers()).toBe(identifierService);
  });
});
