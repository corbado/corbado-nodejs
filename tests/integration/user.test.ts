import { SDK } from '../../src';
import { ServerError } from '../../src/errors';
import Utils from '../utils';

describe('User Validation Tests', () => {
  let sdk: SDK;

  beforeEach(() => {
    sdk = Utils.SDK();
  });

  test('should handle empty name and email error', async () => {
    expect.assertions(3);

    try {
      const req = { name: Utils.testConstants.TEST_EMPTY_STRING, email: Utils.testConstants.TEST_EMPTY_STRING };

      await sdk.getUsers().create(req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);
      expect((error as ServerError).httpStatusCode).toEqual(400);
      expect((error as ServerError).getValidationMessages()).toEqual(['name: cannot be blank']);
    }
  });

  test('should handle successful create', async () => {
    expect.assertions(1);

    const req = { name: Utils.createRandomTestName(), email: Utils.createRandomTestEmail() };

    const sendResponse = await sdk.getUsers().create(req);
    expect(sendResponse.httpStatusCode).toEqual(200);
  });

  test('should handle not found delete', async () => {
    expect.assertions(3);
    try {
      const req = {};

      await sdk.getUsers().delete(Utils.testConstants.TEST_USER_ID, req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);
      expect((error as ServerError).httpStatusCode).toEqual(400);
      expect((error as ServerError).getValidationMessages()).toEqual(['userID: does not exist']);
    }
  });

  test('should handle successful delete', async () => {
    const req = {};
    const userId = await Utils.createUser();

    const response = await sdk.getUsers().delete(userId, req);
    expect(response.httpStatusCode).toEqual(200);
  });

  test('should handle not found get', async () => {
    expect.assertions(2);

    try {
      await sdk.getUsers().get(Utils.testConstants.TEST_USER_ID);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);
      expect((error as ServerError).httpStatusCode).toEqual(404);
    }
  });

  test('should handle successful get', async () => {
    expect.assertions(1);

    const userId = await Utils.createUser();
    const getResponse = await sdk.getUsers().get(userId);
    expect(getResponse.httpStatusCode).toEqual(200);
  });

  test('should handle invalid list sort', async () => {
    expect.assertions(3);

    try {
      await sdk
        .getUsers()
        .list(Utils.testConstants.TEST_EMPTY_STRING, Utils.testConstants.TEST_EMPTY_STRING, 'foo:bar');
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);
      expect((error as ServerError).httpStatusCode).toEqual(422);
      expect((error as ServerError).getValidationMessages()).toEqual(["sort: Invalid order direction 'bar'"]);
    }
  });

  test('should handle successful list', async () => {
    expect.assertions(1);

    const userId = await Utils.createUser();
    const sendResponse = await sdk
      .getUsers()
      .list(Utils.testConstants.TEST_EMPTY_STRING, Utils.testConstants.TEST_EMPTY_STRING, 'created:desc');

    const found = sendResponse.data.users.some((user) => user.ID === userId);
    expect(found).toEqual(true);
  });
});
