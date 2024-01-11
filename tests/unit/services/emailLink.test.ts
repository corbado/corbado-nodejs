import { AxiosInstance } from 'axios';
import { Configuration, SDK } from '../../../src';
import { BaseError } from '../../../src/errors';
import { EmailLink } from '../../../src/services';
import { EmailLinkSendReq, EmailLinksValidateReq } from '../../../src/generated';

describe('EmailLink class', () => {
  let projectID;
  let apiSecret;
  let config: Configuration;
  let sdk: SDK;

  beforeEach(() => {
    projectID = process.env.PROJECT_ID;
    apiSecret = process.env.API_SECRET;

    if (!projectID || !apiSecret) {
      throw new BaseError('Env Error', 5001, 'Both projectID and apiSecret must be defined', true);
    }

    config = new Configuration(projectID, apiSecret);
    sdk = new SDK(config);
  });

  it('should create an EmailLink instance with an AxiosInstance', () => {
    const emailLink = new EmailLink(sdk.createClient(config));

    expect(emailLink).toBeDefined();
  });

  it('should send an email link and return the response', async () => {
    const emailLink = new EmailLink(sdk.createClient(config));
    const req = {
      email: 'test@example.com',
      create: true,
      redirect: 'https://example.com',
    };
    const expectedResponse = {
      httpStatusCode: 200,
      message: 'Email link sent successfully',
      requestData: {
        requestID: '1234567890',
        link: 'https://example.com',
      },
      runtime: 100,
      data: {},
    };

    const response = await emailLink.send(req);

    expect(response).toEqual(expectedResponse);
  });

  it('should validate an email link and return the response', async () => {
    const emailLink = new EmailLink(sdk.createClient(config));
    const emailLinkID = '1234567890';
    const req = { token: 'abcdefg' };
    const expectedResponse = {
      httpStatusCode: 200,
      message: 'Email link validated successfully',
      requestData: {
        requestID: '1234567890',
        link: 'https://example.com',
      },
      runtime: 100,
      userID: '123',
      userFullName: 'John Doe',
      userEmail: 'test@example.com',
    };

    const response = await emailLink.validate(emailLinkID, req);

    expect(response).toEqual(expectedResponse);
  });

  it('should throw an error when creating an EmailLink instance without an AxiosInstance', () => {
    const axiosInstance = undefined as unknown as AxiosInstance;

    expect(() => new EmailLink(axiosInstance)).toThrow();
  });

  it('should throw an error when sending an email link with null or undefined req', async () => {
    const emailLink = new EmailLink(sdk.createClient(config));
    const req = null as unknown as EmailLinkSendReq;

    await expect(emailLink.send(req)).rejects.toThrow();
  });

  it('should throw an error when validating an email link with an empty string emailLinkID or null/undefined req', async () => {
    const emailLink = new EmailLink(sdk.createClient(config));
    const emailLinkID = '';
    const req = null as unknown as EmailLinksValidateReq;

    await expect(emailLink.validate(emailLinkID, req)).rejects.toThrow();
  });
});
