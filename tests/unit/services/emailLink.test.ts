import axios, { AxiosInstance } from 'axios';
import { EmailLink } from '../../../src/services';
import { EmailLinkSendReq, EmailLinksValidateReq } from '../../../src/generated';
import Utils from '../../utils';

describe('EmailLink class', () => {
  let axiosInstance: AxiosInstance;

  beforeEach(() => {
    axiosInstance = axios.create({ baseURL: process.env.BACKEND_API_URL });
    // const mock = new MockAdapter(axiosInstance);

    // mock.onPost(process.env.BACKEND_API_URL).reply(200, {
    //   data: {
    //     httpStatusCode: 200,
    //     message: 'success',
    //     requestData: { requestID: '123', link: 'http://localhost' },
    //     runtime: 0,
    //     data: {},
    //   },
    // });
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
    const emailLink = new EmailLink(axiosInstance);
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
