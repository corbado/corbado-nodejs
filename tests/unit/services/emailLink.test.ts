import axios, { AxiosInstance } from 'axios';
import { EmailLink } from '../../../src/services';
import { EmailLinkSendReq, EmailLinksValidateReq } from '../../../src/generated';
import Utils from '../../utils';

interface SendEmailExpectedResponse {
  httpStatusCode: number;
  message: string;
  requestData: {
    requestID: string;
    link: string;
  };
  runtime: number;
  data: {
    emailLinkID: string;
  };
}

describe('EmailLink class', () => {
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

  it('should create an EmailLink instance with an AxiosInstance', () => {
    const emailLink = new EmailLink(axiosInstance);

    expect(emailLink).toBeDefined();
  });

  it('should send an email link and return the response', async () => {
    const emailLink = new EmailLink(axiosInstance);
    const req = {
      email: Utils.createRandomTestEmail(),
      create: true,
      redirect: Utils.testConstants.REDIRECT_URL,
    };

    const expectedResponse: SendEmailExpectedResponse = {
      httpStatusCode: expect.any(Number) as number,
      message: expect.any(String) as string,
      requestData: {
        requestID: expect.any(String) as string,
        link: expect.any(String) as string,
      },
      runtime: expect.any(Number) as number,
      data: { emailLinkID: expect.any(String) as string },
    };

    const response = await emailLink.send(req);

    expect(response).toEqual(expectedResponse);
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
    const emailLinkID = '';
    const req = null as unknown as EmailLinksValidateReq;

    await expect(emailLink.validate(emailLinkID, req)).rejects.toThrow();
  });
});
