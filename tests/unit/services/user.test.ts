import AxiosMockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import { BaseError } from '../../../src/errors';
import { UserCreateReq } from '../../../src/generated';
import { User } from '../../../src/services';
import Utils from '../../utils';

const userCreateResponse = {
  httpStatusCode: 200,
  message: 'Success',
  requestData: {
    requestID: Utils.testConstants.TEST_USER_ID,
    link: Utils.testConstants.TEST_REDIRECT_URL,
  },
  runtime: Utils.testConstants.TEST_RUNTIME,
  data: {
    userID: Utils.testConstants.TEST_USER_ID,
    emailID: Utils.createRandomTestEmailID(),
    phoneNumberID: Utils.createRandomTestPhoneNumber(),
  },
};

describe('code snippet', () => {
  let axiosInstance: AxiosInstance;
  let mock: AxiosMockAdapter;

  beforeEach(() => {
    ({ axiosInstance, mock } = Utils.MockAxiosInstance());
  });

  afterEach(() => {
    Utils.restoreMock(mock);
  });

  it('should create a user and return UserCreateRsp when User.create() is called with valid request', async () => {
    const UserApi = new User(axiosInstance);

    const req = { name: Utils.createRandomTestName() };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    mock.onPost().reply(200, userCreateResponse);

    const result = await UserApi.create(req);

    expect(result).toEqual(userCreateResponse);
  });

  it('should throw BaseError when User.create() is called and UserApi.userCreate() returns an ErrorRsp', async () => {
    const UserApi = new User(axiosInstance);

    const req = null as unknown as UserCreateReq;

    await expect(UserApi.create(req)).rejects.toThrow(BaseError);
  });
});
