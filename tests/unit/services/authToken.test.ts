import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Configuration, SDK } from '../../../src';
import { BaseError } from '../../../src/errors';
import { AuthToken } from '../../../src/services';

describe('AuthToken class', () => {
  let projectID;
  let apiSecret;
  let config: Configuration;
  let sdk: SDK;
  let axiosInstance: AxiosInstance;

  beforeEach(() => {
    projectID = process.env.PROJECT_ID;
    apiSecret = process.env.API_SECRET;

    if (!projectID || !apiSecret) {
      throw new BaseError('Env Error', 5001, 'Both projectID and apiSecret must be defined', true);
    }

    config = new Configuration(projectID, apiSecret);
    sdk = new SDK(config);

    axiosInstance = axios.create();
    const mock = new MockAdapter(axiosInstance);
    mock.onPost('/smsCodeSend').reply(200, {
      data: {
        httpStatusCode: 200,
        message: 'success',
        requestData: { requestID: '123', link: 'http://localhost' },
        runtime: 0,
        data: {},
      },
    });
  });

  it('should successfully validate a valid auth token', async () => {
    const authToken = new AuthToken(axiosInstance);

    const validationReq = {
      token: 'valid-auth-token', // Should be a valid auth token for test to pass
      requestID: '1',
      clientInfo: {
        remoteAddress: 'https://api.example.com',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ',
      },
    };

    const response = await authToken.validate(validationReq);

    expect(response).toBeDefined();
    expect(response.httpStatusCode).toBe(200);
    expect(response.message).toBe('Success');
    expect(response.requestData).toBeDefined();
    expect(response.runtime).toBeGreaterThan(0);
    expect(response.data).toBeDefined();
  });

  it('should throw an error when given an invalid auth token', async () => {
    const authToken = new AuthToken(axiosInstance);

    const validationReq = {
      token: 'inValid-auth-token',
      requestID: '1',
      clientInfo: {
        remoteAddress: 'https://api.example.com',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ',
      },
    };

    await expect(authToken.validate(validationReq)).rejects.toThrow(BaseError);
  });

  it('should throw an error when given an empty auth token', async () => {
    const authToken = new AuthToken(axiosInstance);

    const validationReq = {
      token: '',
      requestID: '1',
      clientInfo: {
        remoteAddress: 'https://api.example.com',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ',
      },
    };

    await expect(authToken.validate(validationReq)).rejects.toThrow(BaseError);
  });

  it('should throw an error when the server returns an error response without a message', async () => {
    const authToken = new AuthToken(axiosInstance);

    const validationReq = {
      token: 'error-token-1',
      requestID: '1',
      clientInfo: {
        remoteAddress: 'https://api.example.com',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ',
      },
    };

    await expect(authToken.validate(validationReq)).rejects.toThrow(BaseError);
  });

  it('should throw an error when the server returns an error response with a non-string message', async () => {
    const authToken = new AuthToken(axiosInstance);

    const validationReq = {
      token: 'error-token-2',
      requestID: '1',
      clientInfo: {
        remoteAddress: 'https://api.example.com',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ',
      },
    };

    await expect(authToken.validate(validationReq)).rejects.toThrow(BaseError);
  });

  it('should throw an error when the server returns an error response with an invalid http status code', async () => {
    const authToken = new AuthToken(axiosInstance);

    const validationReq = {
      token: 'error-token-3',
      requestID: '1',
      clientInfo: {
        remoteAddress: 'https://api.example.com',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ',
      },
    };

    await expect(authToken.validate(validationReq)).rejects.toThrow(BaseError);
  });
});
