/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MemoryCache } from 'memory-cache-node';
import { Session } from '../../../src/services';
import { RequestWithCookies } from '../../../src/services/sessionService';
import Utils from '../../utils';

describe('Session', () => {
  let issuer: string;
  let shortSessionCookieName: string;
  let jwksURI: string;
  let jwksCache: MemoryCache<string, string>;
  let createSession: () => Session;

  beforeEach(() => {
    issuer = Utils.testConstants.TEST_REDIRECT_URL;
    shortSessionCookieName = 'session';
    jwksURI = `${Utils.testConstants.TEST_REDIRECT_URL}/jwks`;
    jwksCache = new MemoryCache<string, string>(1, 100);
    createSession = () =>
      new Session(Utils.MockAxiosInstance().axiosInstance, shortSessionCookieName, issuer, jwksURI, jwksCache);
  });

  afterAll(() => {
    jwksCache.destroy();
  });

  it('should create a Session instance with valid parameters', () => {
    const session = createSession();

    expect(session).toBeDefined();
    expect(session).toBeInstanceOf(Session);
  });

  it('should return the short session value from the request cookie or authorization header', () => {
    const session = createSession();

    const req = {
      cookies: { [shortSessionCookieName]: 'short-session-value' },
      headers: { authorization: 'Bearer token' },
    } as unknown as RequestWithCookies;

    const shortSessionValue = session.getShortSessionValue(req);

    expect(shortSessionValue).toBe('short-session-value');
  });
});
