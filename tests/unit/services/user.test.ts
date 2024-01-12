import axios, { AxiosInstance } from 'axios';
import { BaseError } from '../../../src/errors';
import { UserCreateReq } from '../../../src/generated';
import { User } from '../../../src/services';
import Utils from '../../utils';

describe('code snippet', () => {
  let axiosInstance: AxiosInstance;

  beforeEach(() => {
    axiosInstance = axios.create({
      baseURL: process.env.BACKEND_API_URL,
      auth: {
        username: process.env.PROJECT_ID!,
        password: process.env.API_SECRET!,
      },
    });
  });

  it('should create a user and return UserCreateRsp when User.create() is called with valid request', async () => {
    const UserApi = new User(axiosInstance);

    const req = { name: Utils.createRandomTestName() };

    const expectedResponse = {
      httpStatusCode: expect.any(Number) as number,
      message: expect.any(String) as string,
      requestData: {
        requestID: expect.any(String) as string,
        link: expect.any(String) as string,
      },
      runtime: expect.any(Number) as number,
      data: {
        userID: expect.any(String) as string,
        emailID: expect.any(String) as string,
        phoneNumberID: expect.any(String) as string,
      },
    };

    const result = await UserApi.create(req);

    expect(result).toEqual(expectedResponse);
  });

  it('should throw BaseError when User.create() is called and UserApi.userCreate() returns an ErrorRsp', async () => {
    const UserApi = new User(axiosInstance);

    const req = null as unknown as UserCreateReq;

    await expect(UserApi.create(req)).rejects.toThrow(BaseError);
  });
});
