import AxiosMockAdapter from 'axios-mock-adapter';
import axios, { AxiosInstance } from 'axios';
import { BaseError } from '../../../src/errors';
import { UserCreateReq } from '../../../src/generated';
import { User } from '../../../src/services';
import Utils from '../../utils';

describe('code snippet', () => {
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

  it('should create a user and return UserCreateRsp when User.create() is called with valid request', async () => {
    const UserApi = new User(axiosInstance);

    const req = { name: Utils.createRandomTestName() };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    mock.onPost().reply(200, {
      httpStatusCode: 200,
      message: 'Success',
      requestData: {
        requestID: '123',
        link: 'http://example.com',
      },
      runtime: 100,
      data: {
        userID: '123',
        emailID: 'test@example.com',
        phoneNumberID: '1234567890',
      },
    });

    const result = await UserApi.create(req);

    expect(result).toEqual({
      httpStatusCode: 200,
      message: 'Success',
      requestData: {
        requestID: '123',
        link: 'http://example.com',
      },
      runtime: 100,
      data: {
        userID: '123',
        emailID: 'test@example.com',
        phoneNumberID: '1234567890',
      },
    });
  });

  it('should throw BaseError when User.create() is called and UserApi.userCreate() returns an ErrorRsp', async () => {
    const UserApi = new User(axiosInstance);

    const req = null as unknown as UserCreateReq;

    await expect(UserApi.create(req)).rejects.toThrow(BaseError);
  });
});
