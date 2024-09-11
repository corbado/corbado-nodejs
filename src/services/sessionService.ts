/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable class-methods-use-this */
import { JWTPayload, jwtVerify, createRemoteJWKSet, errors } from 'jose';
import { Assert } from '../helpers/index.js';
import JWTError, { JWTErrorNames } from '../errors/jwtError.js';
import { User, UserStatus } from '../generated/api.js';

export interface SessionInterface {
  getAndValidateCurrentUser(shortSession: string): Promise<User>;
}

interface MyJWTPayload extends JWTPayload {
  userID: string;
  fullName?: string;
  status: UserStatus;
  explicitWebauthnID?: string;
}

const MIN_SHORT_SESSION_LENGTH = 10;

class Session implements SessionInterface {
  private issuer: string;

  private cacheMaxAge: number;

  private jwkSet;

  constructor(shortSessionCookieName: string, issuer: string, jwksURI: string, cacheMaxAge: number, projectID: string) {
    if (!shortSessionCookieName || !issuer || !jwksURI) {
      throw new Error('Required parameter is empty');
    }

    this.issuer = issuer;
    this.cacheMaxAge = cacheMaxAge;
    this.jwkSet = createRemoteJWKSet(new URL(jwksURI), {
      cacheMaxAge: this.cacheMaxAge,
      cooldownDuration: this.cacheMaxAge,
      headers: { 'X-Corbado-ProjectID': projectID },
    });
  }

  public async getAndValidateCurrentUser(shortSession: string): Promise<User> {
    Assert.notEmptyString(shortSession, 'shortSession not given');

    if (shortSession.length < MIN_SHORT_SESSION_LENGTH) {
      throw new JWTError(JWTErrorNames.InvalidShortSession);
    }

    try {
      const { payload } = await jwtVerify(shortSession, this.jwkSet, { issuer: this.issuer });

      const { userID, fullName, status, explicitWebauthnID } = payload as MyJWTPayload;

      if (payload.iss && payload.iss !== this.issuer) {
        throw new JWTError(JWTErrorNames.InvalidIssuer);
      }

      return { userID, fullName, status, explicitWebauthnID };
    } catch (error) {
      if (error instanceof errors.JWTClaimValidationFailed) {
        throw new JWTError(JWTErrorNames.JWTClaimValidationFailed);
      }

      if (error instanceof errors.JWTExpired) {
        throw new JWTError(JWTErrorNames.JWTExpired);
      }

      if (error instanceof errors.JWTInvalid) {
        throw new JWTError(JWTErrorNames.JWTInvalid);
      }

      throw error;
    }
  }
}

export default Session;
