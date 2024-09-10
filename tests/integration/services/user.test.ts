import { SDK } from '../../../src';
import { ServerError } from '../../../src/errors';
import { UserCreateReq, UserStatus } from '../../../src/generated';
import Utils from '../../utils';

describe('User Validation Tests', () => {
  let sdk: SDK;

  beforeEach(() => {
    sdk = Utils.SDK();
  });

  test('should handle null full name', async () => {
    expect.assertions(2);

    try {
      const req = { name: Utils.testConstants.TEST_EMPTY_STRING, status: UserStatus.Active };

      await sdk.users().create(req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);
      expect((error as ServerError).httpStatusCode).toEqual(500);
    }
  });

  test('should handle successful create', async () => {
    expect.assertions(1);

    const req: UserCreateReq = { fullName: Utils.createRandomTestName(), status: UserStatus.Active };

    const sendResponse = await sdk.users().create(req);
    expect(sendResponse.fullName).toEqual(req.fullName);
  });

  test('should handle not found delete', async () => {
    expect.assertions(3);
    try {
      await sdk.users().delete(Utils.testConstants.TEST_USER_ID);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);
      expect((error as ServerError).httpStatusCode).toEqual(400);
      expect((error as ServerError).getValidationMessages()).toEqual(['userID: does not exist']);
    }
  });

  test('should handle successful delete', async () => {
    expect.assertions(2);

    const userId = await Utils.createUserId();

    await sdk.users().delete(userId);

    try {
      await sdk.users().get(userId);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);
      expect((error as ServerError).httpStatusCode).toEqual(400);
    }
  });

  test('should handle not found get', async () => {
    expect.assertions(2);

    try {
      await sdk.users().get(Utils.testConstants.TEST_USER_ID);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);
      expect((error as ServerError).httpStatusCode).toEqual(400);
    }
  });

  test('should handle successful get', async () => {
    expect.assertions(1);

    const userId = await Utils.createUserId();
    const getResponse = await sdk.users().get(userId);
    expect(getResponse.userID).toEqual(userId);
  });
});
