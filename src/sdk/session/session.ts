import jose, { FlattenedJWSInput, JWSHeaderParameters, KeyLike, RemoteJWKSetOptions } from 'jose';
import User from './user';

export default class Session {
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

    this.#jwks = jose.createRemoteJWKSet(jwkSetUrl, joseOptions);
  }

  async ValidateShortSessionValue(shortSession: string): Promise<User> {
    if (shortSession === '' || shortSession === undefined) {
      return this.createAnonymousUser();
    }

    let options = {};

    if (this.#issuer !== '') {
      options = Object.assign(options, { issuer: this.#issuer });
    }

    const { payload } = await jose.jwtVerify(shortSession, this.#jwks, options);

    let issuerValid = false;
    if (payload.iss === this.#issuer) {
      issuerValid = true;
    } else {
      throw new Error(`Mismatch in issuer (configured through Frontend API: "${this.#issuer}", JWT: "${payload.iss})`);
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
