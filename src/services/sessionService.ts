/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable class-methods-use-this */
import { createRemoteJWKSet, errors, JWTPayload, jwtVerify } from 'jose';
import { Assert } from '../helpers/index.js';
import ValidationError, { ValidationErrorNames } from '../errors/validationError.js';

export interface SessionInterface {
  validateToken(shortSession: string): Promise<{ userId: string; fullName: string }>;
}

interface MyJWTPayload extends JWTPayload {
  name: string;
  iss: string;
  sub: string;
}

const MIN_SHORT_SESSION_LENGTH = 10;

class Session implements SessionInterface {
  private issuer: string;

  private cacheMaxAge: number;

  private jwkSet;

  private projectID: string;

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
    this.projectID = projectID;
  }

  /**
   * Validate the short session token and return the user ID and full name
   * @param {any} shortSession:string
   * @returns {any} { userId: string; fullName: string }
   */
  public async validateToken(shortSession: string): Promise<{ userId: string; fullName: string }> {
    Assert.notEmptyString(shortSession, 'shortSession not given');

    if (shortSession.length < MIN_SHORT_SESSION_LENGTH) {
      throw new ValidationError(ValidationErrorNames.InvalidShortSession);
    }

    try {
      const { payload } = await jwtVerify(shortSession, this.jwkSet);

      const { iss, name, sub } = payload as MyJWTPayload;

      this.validateIssuer(iss);

      return {
        userId: sub,
        fullName: name,
      };
    } catch (error) {
      if (error instanceof errors.JWTClaimValidationFailed) {
        throw new ValidationError(ValidationErrorNames.JWTClaimValidationFailed);
      }

      if (error instanceof errors.JWTExpired) {
        throw new ValidationError(ValidationErrorNames.JWTExpired);
      }

      if (error instanceof errors.JWTInvalid  || error instanceof errors.JWSSignatureVerificationFailed) {
        throw new ValidationError(ValidationErrorNames.JWTInvalid);
      }

      throw error;
    }
  }

  private validateIssuer(jwtIssuer: string) {
    if (!jwtIssuer) {
      throw new ValidationError(ValidationErrorNames.EmptyIssuer, false);
    }

    if (jwtIssuer === `https://${this.projectID}.frontendapi.corbado.io`) {
      return;
    }

    if (jwtIssuer === `https://${this.projectID}.frontendapi.cloud.corbado.io`) {
      return;
    }

    if (jwtIssuer !== this.issuer) {
      throw new ValidationError(
        ValidationErrorNames.InvalidIssuer,
        false,
        `JWT issuer mismatch (configured trough FrontendAPI: '${this.issuer}', JWT issuer: '${jwtIssuer}')`,
      );
    }
  }
}

export default Session;
