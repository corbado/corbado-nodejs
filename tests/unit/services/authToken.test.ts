import axios, { AxiosInstance } from 'axios';
import { ServerError } from '../../../src/errors';
import { AuthToken } from '../../../src/services';

describe('AuthToken class', () => {
  let axiosInstance: AxiosInstance;

  beforeEach(() => {
    axiosInstance = axios.create({ baseURL: process.env.BACKEND_API_URL });
  });

  // TODO: Devise a way make this test work across our SDKS
  // it('should successfully validate a valid auth token', async () => {
  //   const authToken = new AuthToken(axiosInstance);

  //   const validationReq = {
  //     token: 'valid-auth-token', // Should be a valid auth token for test to pass
  //     requestID: '1',
  //     clientInfo: {
  //       remoteAddress: 'https://api.example.com',
  //       userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ',
  //     },
  //   };

  //   const response = await authToken.validate(validationReq);

  //   expect(response).toBeDefined();
  //   expect(response.httpStatusCode).toBe(200);
  //   expect(response.message).toBe('Success');
  //   expect(response.requestData).toBeDefined();
  //   expect(response.runtime).toBeGreaterThan(0);
  //   expect(response.data).toBeDefined();
  // });

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

    await expect(authToken.validate(validationReq)).rejects.toThrow(ServerError);
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

    await expect(authToken.validate(validationReq)).rejects.toThrow(ServerError);
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

    await expect(authToken.validate(validationReq)).rejects.toThrow(ServerError);
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

    await expect(authToken.validate(validationReq)).rejects.toThrow(ServerError);
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

    await expect(authToken.validate(validationReq)).rejects.toThrow(ServerError);
  });
});
