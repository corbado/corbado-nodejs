/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable class-methods-use-this */
import { AxiosInstance } from 'axios';
import { JWTPayload, jwtVerify, createRemoteJWKSet } from 'jose';
import User from '../entities/user.js';
import { Assert } from '../helpers/index.js';

export interface SessionInterface {
  validateShortSessionValue(shortSession: string): Promise<User>;
  getCurrentUser(shortSession: string): Promise<User>;
  getLastShortSessionValidationResult(): string;
}

interface MyJWTPayload extends JWTPayload {
  name?: string;
  email?: string;
  phoneNumber?: string;
}

const MIN_SHORT_SESSION_LENGTH = 10;

class Session implements SessionInterface {
  private client: AxiosInstance;

  private issuer: string;

  private cacheMaxAge: number;

  private lastShortSessionValidationResult: string = '';

  private jwkSet;

  constructor(
    client: AxiosInstance,
    shortSessionCookieName: string,
    issuer: string,
    jwksURI: string,
    cacheMaxAge: number
  ) {
    if (!shortSessionCookieName || !issuer || !jwksURI) {
      throw new Error('Required parameter is empty');
    }

    this.client = client;
    this.issuer = issuer;
    this.cacheMaxAge = cacheMaxAge;
    this.jwkSet = createRemoteJWKSet(new URL(jwksURI), { cacheMaxAge: this.cacheMaxAge, cooldownDuration: this.cacheMaxAge});
  }

  public async validateShortSessionValue(shortSession: string): Promise<User> {
    Assert.notEmptyString(shortSession, 'shortSession not given');

    if (!shortSession) {
      return new User(false);
    }

    try {
      const { payload } = await jwtVerify(shortSession, this.jwkSet, { issuer: this.issuer });

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

  public async getCurrentUser(shortSession: string): Promise<User> {
    if (!shortSession || shortSession.length < MIN_SHORT_SESSION_LENGTH) {
      return new User(false);
    }

    const user = await this.validateShortSessionValue(shortSession);
    return user ?? new User(false);
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
