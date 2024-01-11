import { Configuration, SDK } from '../../src';
import { BaseError, ServerError } from '../../src/errors';

describe('AuthToken Validate Tests', () => {
  let projectID;
  let apiSecret;
  let config: Configuration;
  let sdk: SDK;
  // let axiosInstance: AxiosInstance;

  beforeEach(() => {
    projectID = process.env.PROJECT_ID;
    apiSecret = process.env.API_SECRET;

    if (!projectID || !apiSecret) {
      throw new BaseError('Env Error', 5001, 'Both projectID and apiSecret must be defined', true);
    }

    config = new Configuration(projectID, apiSecret);
    sdk = new SDK(config);
  });
  test('AuthToken Validate ValidationError Empty Token', async () => {
    let error: ServerError | null = null;

    try {
      const req = {
        token: '',
        // clientInfo: createClient('124.0.0.1', 'IntegrationTest'),
        clientInfo: { remoteAddress: '124.0.0.1', userAgent: 'IntegrationTest' },
      };

      await sdk.authTokens().validate(req);
    } catch (e) {
      error = e;
    }

    expect(error).not.toBeNull();
  });

  test('AuthToken Validate ValidationError Invalid Token', async () => {
    let error: ServerError | null = null;

    try {
      const req = {
        token: 'x',
        clientInfo: { remoteAddress: '124.0.0.1', userAgent: 'IntegrationTest' },
      };

      await sdk.authTokens().validate(req);
    } catch (e) {
      error = e;
    }
    console.log({ error });

    expect(error).not.toBeNull();
    expect(error?.getRequestData()).toEqual(['token: the length must be exactly 64']);
  });

  // test('AuthToken Validate ValidationError Not Existing Token', async () => {
  //   let error: ServerError | null = null;

  //   try {
  //     const req = {
  //       token: generateString(64),
  //       clientInfo: createClientInfo('124.0.0.1', 'IntegrationTest'),
  //     };

  //     await sdk.authTokens().validate(req);
  //   } catch (e) {
  //     error = e;
  //   }

  //   expect(error).not.toBeNull();
  //   expect(error?.getHttpStatusCode()).toBe(404);
  // });
});
