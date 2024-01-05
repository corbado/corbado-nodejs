import axios, { AxiosInstance, AxiosBasicCredentials } from 'axios';
import { Config } from './config';
import AuthToken from './services/authTokenService';
import Validation from './sdk/validation/validation';
import User from './sdk/user/user';
import Session from './services/sessionService';
import EmailLink from './sdk/emailLink/emailLink';

export default class SDK {
  #authToken: AuthToken;

  #emailLink: EmailLink;

  #session: Session;

  #user: User;

  #validation: Validation;

  constructor(config: Config) {
    this.#emailLink = new EmailLink(this.#createClient(config));

    this.#authToken = new AuthToken(this.#createClient(config));

    this.#session = new Session(
      process.env.npm_package_version as string,
      config.ProjectID,
      config.FrontendAPI,
      config.ShortSessionCookieName,
      config.JWTIssuer,
      config.CacheMaxAge,
    );
    this.#user = new User(this.#createClient(config));

    this.#validation = new Validation(this.#createClient(config));
  }

  #createClient(config: Config): AxiosInstance {
    const instance = axios.create();
    instance.defaults.auth = new (class implements AxiosBasicCredentials {
      password: string = config.APISecret;

      username: string = config.ProjectID;
    })();

    instance.defaults.baseURL = config.BackendAPI;
    instance.defaults.headers['X-Corbado-SDK-Version'] = JSON.stringify({
      name: 'Node.js SDK',
      sdkVersion: process.env.npm_package_version,
      languageVersion: process.version,
    });

    return instance;
  }

  get authTokens(): AuthToken {
    return this.#authToken;
  }

  get emailLinks(): EmailLink {
    return this.#emailLink;
  }

  get sessions(): Session {
    return this.#session;
  }

  get users(): User {
    return this.#user;
  }

  get validations(): Validation {
    return this.#validation;
  }
}
