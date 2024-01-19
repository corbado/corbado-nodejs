/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Session } from '../../../src/services';
import Utils from '../../utils';

describe('Session', () => {
  let issuer: string;
  let shortSessionCookieName: string;
  let jwksURI: string;
  let createSession: () => Session;

  beforeEach(() => {
    issuer = Utils.testConstants.TEST_REDIRECT_URL;
    shortSessionCookieName = 'session';
    jwksURI = `${Utils.testConstants.TEST_REDIRECT_URL}/jwks`;
    createSession = () => new Session(Utils.MockAxiosInstance().axiosInstance, shortSessionCookieName, issuer, jwksURI, 60 * 1000);
  });

  it('should create a Session instance with valid parameters', () => {
    const session = createSession();

    expect(session).toBeDefined();
    expect(session).toBeInstanceOf(Session);
  });
});
