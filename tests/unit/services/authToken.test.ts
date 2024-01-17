import AxiosMockAdapter from 'axios-mock-adapter';
import axios, { AxiosInstance } from 'axios';
import { ServerError } from '../../../src/errors';
import { AuthToken } from '../../../src/services';
import Utils from '../../utils';

describe('AuthToken class', () => {
  let axiosInstance: AxiosInstance;
  let mock: AxiosMockAdapter;

  beforeEach(() => {
    axiosInstance = axios.create();
    mock = new AxiosMockAdapter(axiosInstance);
  });

  afterEach(() => {
    // Necessary to disable the eslint rule for this line because of the way the mock is defined
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    mock.restore();
  });

  it('should throw an error when given an invalid auth token', async () => {
    const authToken = new AuthToken(axiosInstance);

    const validationReq = {
      token: 'inValid-auth-token',
      requestID: '1',
      clientInfo: {
        remoteAddress: Utils.testConstants.TEST_REMOTE_ADDRESS,
        userAgent: Utils.testConstants.TEST_USER_AGENT,
      },
    };

    await expect(authToken.validate(validationReq)).rejects.toThrow(ServerError);
  });

  it('should throw an error when given an empty auth token', async () => {
    const authToken = new AuthToken(axiosInstance);

    const validationReq = {
      token: Utils.testConstants.TEST_EMPTY_STRING,
      requestID: '1',
      clientInfo: {
        remoteAddress: Utils.testConstants.TEST_REMOTE_ADDRESS,
        userAgent: Utils.testConstants.TEST_USER_AGENT,
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
        remoteAddress: Utils.testConstants.TEST_REMOTE_ADDRESS,
        userAgent: Utils.testConstants.TEST_USER_AGENT,
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
        remoteAddress: Utils.testConstants.TEST_REMOTE_ADDRESS,
        userAgent: Utils.testConstants.TEST_USER_AGENT,
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
        remoteAddress: Utils.testConstants.TEST_REMOTE_ADDRESS,
        userAgent: Utils.testConstants.TEST_USER_AGENT,
      },
    };

    await expect(authToken.validate(validationReq)).rejects.toThrow(ServerError);
  });
});
