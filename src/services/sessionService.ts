/* eslint-disable class-methods-use-this */
import { JWTPayload, createRemoteJWKSet, jwtVerify } from 'jose';

import { Request } from 'express';
import User from '../entities/user.js';
import { Assert } from '../helpers/index.js';

export interface SessionInterface {
  validateShortSessionValue(shortSession: string): Promise<object | null>;
}

interface DecodedValue extends JWTPayload {
  name?: string;
  email?: string;
  phone_number?: string;
  sub?: string;
}

interface RequestWithCookies extends Request {
  cookies: {
    [key: string]: string;
  };
}

const MIN_TOKEN_LENGTH = 10;

class Session implements SessionInterface {
  private shortSessionCookieName: string;

  private issuer: string;

  private jwksURI: string;

  private cacheMaxAge: number;

  private lastShortSessionValidationResult = '';

  constructor(issuer: string, shortSessionCookieName: string, jwksURI: string, cacheMaxAge: number) {
    Assert.notEmptyString(
      shortSessionCookieName,
      'Session instance "shortSessionCookieName" param must not be an empty string',
    );
    Assert.notEmptyString(issuer, 'Session instance "issuer" param must not be an empty string');
    Assert.notEmptyString(jwksURI, 'Session instance "jwksURI" param must not be an empty string');

    // this.client = client;
    this.shortSessionCookieName = shortSessionCookieName;
    this.issuer = issuer;
    this.jwksURI = jwksURI;
    this.cacheMaxAge = cacheMaxAge;
  }

  public getShortSessionValue(req: RequestWithCookies): string {
    return req.cookies?.[this.shortSessionCookieName] ?? this.extractBearerToken(req.headers.authorization);
  }

  public async validateShortSessionValue(value: string): Promise<DecodedValue | null> {
    Assert.notEmptyString(value, 'Session.validateShotSessionValue() "value" param must not be an empty string');

    try {
      const keySet = createRemoteJWKSet(new URL(this.jwksURI));
      const { payload } = await jwtVerify(value, keySet);

      if (payload.iss && payload.iss !== this.issuer) {
        this.setIssuerMismatchError(payload.iss);
        return null;
      }

      return payload;
    } catch (error) {
      this.setValidationError(error);
      return null;
    }
  }

  public getLastShortSessionValidationResult(): string {
    return this.lastShortSessionValidationResult;
  }

  public async getCurrentUser(req: Request): Promise<User> {
    const value = this.getShortSessionValue(req);

    if (value.length < MIN_TOKEN_LENGTH) {
      return new User(false);
    }

    const decoded = await this.validateShortSessionValue(value);
    if (decoded) {
      return this.createUserFromDecodedValue(decoded);
    }

    return new User(false);
  }

  private extractBearerToken(header?: string): string {
    if (header?.startsWith('Bearer ')) {
      return header.split(' ')[1];
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

  private createUserFromDecodedValue(decoded: DecodedValue): User {
    return new User(true, decoded.sub, decoded.name ?? '', decoded.email ?? '', decoded.phone_number ?? '');
  }
}

export default Session;
