import {
  FlattenedJWSInput,
  JWSHeaderParameters,
  KeyLike,
  RemoteJWKSetOptions,
  createRemoteJWKSet,
  jwtVerify,
} from 'jose';
import { BaseError } from 'src/errors';
import httpStatusCodes from 'src/errors/httpStatusCodes';
import User from '../entities/user';

interface SessionInterface {
  validateShortSessionValue(shortSession: string): Promise<User>;
}

class Session implements SessionInterface {
  #shortSessionCookieName: string;

  #issuer: string;

  #jwks: (protectedHeader?: JWSHeaderParameters | undefined, token?: FlattenedJWSInput | undefined) => Promise<KeyLike>;

  constructor(
    version: string,
    projectID: string,
    frontendAPI: string,
    shortSessionCookieName: string,
    issuer: string,
    cacheMaxAge: number,
  ) {
    this.#shortSessionCookieName = shortSessionCookieName;
    this.#issuer = issuer;

    const jwkSetUrl = new URL(`${frontendAPI}/.well-known/jwks`);
    const joseOptions = new (class implements RemoteJWKSetOptions {
      cacheMaxAge: number = cacheMaxAge;

      headers: Record<string, string> = {
        'X-Corbado-SDK-Version': version,
        'X-Corbado-ProjectID': projectID,
      };
    })();

    this.#jwks = createRemoteJWKSet(jwkSetUrl, joseOptions);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ignore = this.#shortSessionCookieName;
  }

  async validateShortSessionValue(shortSession: string): Promise<User> {
    if (shortSession === '' || shortSession === undefined) {
      return this.createAnonymousUser();
    }

    let options = {};

    if (this.#issuer !== '') {
      options = Object.assign(options, { issuer: this.#issuer });
    }

    const { payload } = await jwtVerify(shortSession, this.#jwks, options);

    let issuerValid = false;
    if (payload.iss === this.#issuer) {
      issuerValid = true;
    } else {
      throw new BaseError(
        'Issuer mismatch',
        httpStatusCodes.ISSUER_MISMATCH_ERROR.code,
        `Mismatch in issuer (configured through Frontend API: "${this.#issuer}", JWT: "${payload.iss})`,
        httpStatusCodes.ISSUER_MISMATCH_ERROR.isOperational,
      );
    }

    if (issuerValid) {
      return new User(
        true,
        payload.sub as string,
        payload.name as string,
        payload.email as string,
        payload.phoneNumber as string,
      );
    }

    return this.createAnonymousUser();
  }

  protected createAnonymousUser(): User {
    return new User(false, '', '', '', '');
  }
}

export default Session;
