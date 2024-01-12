import { Request } from 'express';
import { Session } from '../../../src/services';

describe('Session', () => {
  const issuer = 'example.com';
  const shortSessionCookieName = 'session';
  const jwksURI = 'https://example.com/jwks';
  const cacheMaxAge = 3600;

  const createSession = () => new Session(issuer, shortSessionCookieName, jwksURI, cacheMaxAge);

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
    } as jest.Mocked<Request>;

    const shortSessionValue = session.getShortSessionValue(req);

    expect(shortSessionValue).toBe('short-session-value');
  });
});
