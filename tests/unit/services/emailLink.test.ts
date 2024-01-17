import AxiosMockAdapter from 'axios-mock-adapter';
import axios, { AxiosInstance } from 'axios';
import { EmailLink } from '../../../src/services';
import { EmailLinkSendReq, EmailLinksValidateReq } from '../../../src/generated';
import Utils from '../../utils';

describe('EmailLink class', () => {
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
    mock.onPost().reply(200, {
      httpStatusCode: 200,
      message: 'Success',
      requestData: {
        requestID: '123',
        link: 'http://example.com',
      },
      runtime: 100,
      data: { emailLinkID: '123' },
    });

    const response = await emailLink.send(req);

    expect(response).toEqual({
      httpStatusCode: 200,
      message: 'Success',
      requestData: {
        requestID: '123',
        link: 'http://example.com',
      },
      runtime: 100,
      data: { emailLinkID: '123' },
    });
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
