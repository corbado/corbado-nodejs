/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable class-methods-use-this */
import { AxiosInstance } from 'axios';
import { MemoryCache } from 'memory-cache-node';
import { JWTPayload, jwtVerify, createRemoteJWKSet } from 'jose';
import User from '../entities/user.js';
import { Assert } from '../helpers/index.js';

export interface SessionInterface {
  getShortSessionValue(req: RequestWithCookies): string;
  validateShortSessionValue(req: RequestWithCookies): Promise<User>;
  getCurrentUser(req: RequestWithCookies): Promise<User>;
  getLastShortSessionValidationResult(): string;
}

export interface RequestWithCookies extends Request {
  cookies: {
    [key: string]: string;
  };
  headers: Headers & {
    authorization: string;
    [key: string]: string;
  };
}

interface MyJWTPayload extends JWTPayload {
  name?: string;
  email?: string;
  phoneNumber?: string;
}

const MIN_TOKEN_LENGTH = 10;

const itemsExpirationCheckIntervalInSecs = 10 * 60;
const maxItemCount = 1000000;

class Session implements SessionInterface {
  private client: AxiosInstance;

  private shortSessionCookieName: string;

  private issuer: string;

  private jwksURI: string;

  private cacheMaxAge: number;

  private lastShortSessionValidationResult: string = '';

  constructor(
    client: AxiosInstance,
    shortSessionCookieName: string,
    issuer: string,
    jwksURI: string,
    cacheMaxAge = 10 * 60, // 10 minutes
  ) {
    if (!shortSessionCookieName || !issuer || !jwksURI) {
      throw new Error('Required parameter is empty');
    }

    this.client = client;
    this.shortSessionCookieName = shortSessionCookieName;
    this.issuer = issuer;
    this.jwksURI = jwksURI;
    this.cacheMaxAge = cacheMaxAge;
  }

  public getShortSessionValue(req: RequestWithCookies): string {
    return req.cookies?.[this.shortSessionCookieName] ?? this.extractBearerToken(req.headers);
  }

  public async validateShortSessionValue(req: RequestWithCookies): Promise<User> {
    Assert.notNull(typeof req === 'object' && req !== null, 'RequestObject not given');

    const jwks = createRemoteJWKSet(new URL(this.jwksURI), { cacheMaxAge: this.cacheMaxAge });
    const token = this.getShortSessionValue(req);

    if (!token) {
      return new User(false);
    }

    try {
      const { payload } = await jwtVerify(token, jwks, { issuer: this.issuer });

      const { sub, name, email, phoneNumber } = payload as MyJWTPayload;

      if (payload.iss && payload.iss !== this.issuer) {
        this.setIssuerMismatchError(payload.iss);
        return new User(false);
      }

      return new User(true, sub, name, email, phoneNumber);
    } catch (error) {
      this.setValidationError(error);
      return new User(false);
    }
  }

  public getLastShortSessionValidationResult(): string {
    return this.lastShortSessionValidationResult;
  }

  public async getCurrentUser(req: RequestWithCookies): Promise<User> {
    const value = this.getShortSessionValue(req);

    if (!value || value.length < MIN_TOKEN_LENGTH) {
      return new User(false);
    }

    const user = await this.validateShortSessionValue(req);
    return user ?? new User(false);
  }

  private extractBearerToken(header?: { authorization: string }): string {
    if (!header?.authorization) {
      return '';
    }
    if (header?.authorization.startsWith('Bearer ')) {
      return header.authorization.split(' ')[1];
    }
    return '';
  }

  private setIssuerMismatchError(issuer: string): void {
    this.lastShortSessionValidationResult = `Mismatch in issuer (configured: ${this.issuer}, JWT: ${issuer})`;
  }

  private setValidationError(error: unknown): void {
    if (error instanceof Error) {
      this.lastShortSessionValidationResult = `JWT validation failed: ${error.message}`;
    } else {
      this.lastShortSessionValidationResult = `JWT validation failed: ${error}`;
    }
  }
}

export default Session;
