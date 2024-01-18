import AxiosMockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import { EmailLink } from '../../../src/services';
import { EmailLinkSendReq, EmailLinksValidateReq } from '../../../src/generated';
import Utils from '../../utils';

const emailLinkSendResponse = {
  httpStatusCode: 200,
  message: 'Success',
  requestData: {
    requestID: Utils.testConstants.TEST_EMAILLINK_ID,
    link: Utils.testConstants.TEST_REDIRECT_URL,
  },
  runtime: Utils.testConstants.TEST_RUNTIME,
  data: { emailLinkID: Utils.testConstants.TEST_EMAILLINK_ID },
};

describe('EmailLink class', () => {
  let axiosInstance: AxiosInstance;
  let mock: AxiosMockAdapter;

  beforeEach(() => {
    ({ axiosInstance, mock } = Utils.MockAxiosInstance());
  });

  afterEach(() => {
    Utils.restoreMock(mock);
  });

  it('should create an EmailLink instance with an AxiosInstance', () => {
    const emailLink = new EmailLink(axiosInstance);

    expect(emailLink).toBeDefined();
  });

  it('should send an email link and return the response', async () => {
    const emailLink = new EmailLink(axiosInstance);
    const req = {
      email: Utils.createRandomTestEmail(),
      create: true,
      redirect: Utils.testConstants.TEST_REDIRECT_URL,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    mock.onPost().reply(200, emailLinkSendResponse);

    const response = await emailLink.send(req);

    expect(response).toEqual(emailLinkSendResponse);
  });

  it('should throw an error when creating an EmailLink instance without an AxiosInstance', () => {
    const undefinedAxiosInstance = undefined as unknown as AxiosInstance;

    expect(() => new EmailLink(undefinedAxiosInstance)).toThrow();
  });

  it('should throw an error when sending an email link with null or undefined req', async () => {
    const emailLink = new EmailLink(axiosInstance);
    const req = null as unknown as EmailLinkSendReq;

    await expect(emailLink.send(req)).rejects.toThrow();
  });

  it('should throw an error when validating an email link with an empty string emailLinkID or null/undefined req', async () => {
    const emailLink = new EmailLink(axiosInstance);
    const emailLinkID = Utils.testConstants.TEST_EMPTY_STRING;
    const req = null as unknown as EmailLinksValidateReq;

    await expect(emailLink.validate(emailLinkID, req)).rejects.toThrow();
  });
});
