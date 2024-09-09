import { SDK } from '../../../src';
import { ServerError } from '../../../src/errors';
import {
  IdentifierCreateReq,
  IdentifierStatus,
  IdentifierType,
  IdentifierList,
  Identifier as IdentifierRsp,
} from '../../../src/generated';
import Utils from '../../utils';

describe('Identifier Service Tests', () => {
  let sdk: SDK;
  let TEST_USER_ID: string;
  let TEST_USER_EMAIL: string;
  let TEST_USER_EMAIL_IDENTIFIER: IdentifierRsp;

  beforeAll(async () => {
    sdk = Utils.SDK();

    // Create a test user and email identifier
    TEST_USER_ID = await Utils.createUserId();
    TEST_USER_EMAIL = Utils.createRandomTestEmail();

    // Create an email identifier for the user
    TEST_USER_EMAIL_IDENTIFIER = await sdk.identifiers().create(TEST_USER_ID, {
      identifierType: IdentifierType.Email,
      identifierValue: TEST_USER_EMAIL,
      status: IdentifierStatus.Primary,
    });
  });

  test('should check if existing email identifier is present', async () => {
    // Check if email identifier is present
    let ret: IdentifierList = await sdk.identifiers().listByValueAndType(TEST_USER_EMAIL, IdentifierType.Email);
    expect(ret.identifiers.length).not.toEqual(0);

    // Check if email is listed under phone identifiers (should not be found)
    ret = await sdk.identifiers().listByValueAndType(TEST_USER_EMAIL, IdentifierType.Phone);
    expect(ret.identifiers.length).toEqual(0);

    // Check existence using existsByValueAndType
    const emailExists = await sdk.identifiers().existsByValueAndType(TEST_USER_EMAIL, IdentifierType.Email);
    const phoneExists = await sdk.identifiers().existsByValueAndType(TEST_USER_EMAIL, IdentifierType.Phone);
    expect(emailExists).toBe(true);
    expect(phoneExists).toBe(false);
  });

  test('should throw error on empty identifier creation', async () => {
    expect.assertions(3);

    const userId = await Utils.createUserId();
    const req: IdentifierCreateReq = {
      identifierType: IdentifierType.Email,
      identifierValue: '', // Empty email value
      status: IdentifierStatus.Primary,
    };

    try {
      await sdk.identifiers().create(userId, req);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);
      expect((error as ServerError).httpStatusCode).toEqual(400);
      expect((error as ServerError).getValidationMessages()).toEqual(['identifierValue: cannot be blank']);
    }
  });

  test('should successfully create an identifier', async () => {
    const userId = await Utils.createUserId();
    const email = Utils.createRandomTestEmail();
    const req: IdentifierCreateReq = {
      identifierType: IdentifierType.Email,
      identifierValue: email,
      status: IdentifierStatus.Primary,
    };

    const createdIdentifier = await sdk.identifiers().create(userId, req);
    expect(createdIdentifier.userID).toEqual(userId);
    expect(createdIdentifier.value).toEqual(req.identifierValue);
    expect(createdIdentifier.type).toEqual(IdentifierType.Email);
  });

  test('should list all identifiers by userId', async () => {
    const ret = await sdk.identifiers().listAllByUserIdWithPaging(TEST_USER_ID);
    const identifierExists = ret.identifiers.some(
      (identifier) => identifier.identifierID === TEST_USER_EMAIL_IDENTIFIER.identifierID,
    );
    expect(identifierExists).toBe(true);
    expect(ret.identifiers.length).toEqual(1); // Only email identifier created so far
  });

  test('should list all identifiers', async () => {
    const ret = await sdk.identifiers().list(undefined, undefined, 1, 100);
    expect(ret).not.toBeNull();
  });

  test('should update identifier status successfully', async () => {
    await sdk
      .identifiers()
      .updateStatus(
        TEST_USER_EMAIL_IDENTIFIER.userID,
        TEST_USER_EMAIL_IDENTIFIER.identifierID,
        IdentifierStatus.Pending,
      );

    let ret = await sdk
      .identifiers()
      .listByValueAndType(TEST_USER_EMAIL_IDENTIFIER.value, TEST_USER_EMAIL_IDENTIFIER.type);
    expect(ret.identifiers[0].status).toEqual(IdentifierStatus.Pending);

    await sdk
      .identifiers()
      .updateStatus(
        TEST_USER_EMAIL_IDENTIFIER.userID,
        TEST_USER_EMAIL_IDENTIFIER.identifierID,
        IdentifierStatus.Primary,
      );

    ret = await sdk.identifiers().listByValueAndType(TEST_USER_EMAIL_IDENTIFIER.value, TEST_USER_EMAIL_IDENTIFIER.type);
    expect(ret.identifiers[0].status).toEqual(IdentifierStatus.Primary);
  });

  test('should list all emails by userId', async () => {
    const testSize = 7;

    // Create multiple email identifiers for the same user
    const promises: Promise<IdentifierRsp>[] = [];

    [...Array(testSize).keys()].forEach(() => {
      promises.push(
        sdk.identifiers().create(TEST_USER_ID, {
          identifierType: IdentifierType.Email,
          identifierValue: Utils.createRandomTestEmail(),
          status: IdentifierStatus.Verified,
        }),
      );
    });

    await Promise.all(promises);

    const allEmails = await sdk.identifiers().listAllEmailsByUserId(TEST_USER_ID);
    expect(allEmails.length).toEqual(testSize + 1); // One email was already created before
  });

  test('should successfully delete an identifier', async () => {
    expect.assertions(2);

    const identifier = await sdk.identifiers().create(TEST_USER_ID, {
      identifierType: IdentifierType.Email,
      identifierValue: Utils.createRandomTestEmail(),
      status: IdentifierStatus.Verified,
    });

    const identifiers = await sdk.identifiers().listByValueAndType(identifier.value, identifier.type);

    expect(identifiers.identifiers.findIndex((rsp) => rsp.identifierID === identifier.identifierID)).toBeGreaterThan(
      -1,
    );

    await sdk.identifiers().delete(TEST_USER_ID, identifier.identifierID);

    const newIdentifiers = await sdk.identifiers().listByValueAndType(identifier.value, identifier.type);

    expect(newIdentifiers.identifiers.findIndex((rsp) => rsp.identifierID === identifier.identifierID)).toEqual(-1);
  });
});
