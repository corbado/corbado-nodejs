/* eslint-disable class-methods-use-this */
import axios, { AxiosInstance, AxiosBasicCredentials } from 'axios';
import Configuration from './config.js';
import { AuthToken, EmailOTP, Session, SmsOTP, Validation, EmailLink, User } from './services/index.js';

class SDK {
  private authToken: AuthToken;

  private emailLink: EmailLink;

  private emailOTP: EmailOTP;

  private session: Session;

  private smsOTP: SmsOTP;

  private user: User;

  private validation: Validation;

  constructor(config: Configuration) {
    this.authToken = new AuthToken(this.createClient(config));

    this.emailLink = new EmailLink(this.createClient(config));

    this.emailOTP = new EmailOTP(this.createClient(config));

    this.session = new Session(
      process.env.npm_package_version as string,
      config.ProjectID,
      config.FrontendAPI,
      config.ShortSessionCookieName,
      config.JWTIssuer,
      config.CacheMaxAge,
    );

    this.smsOTP = new SmsOTP(this.createClient(config));

    this.user = new User(this.createClient(config));

    this.validation = new Validation(this.createClient(config));
  }

  createClient(config: Configuration): AxiosInstance {
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

  authTokens(): AuthToken {
    return this.authToken;
  }

  emailLinks(): EmailLink {
    return this.emailLink;
  }

  emailOtp(): EmailOTP {
    return this.emailOTP;
  }

  sessions(): Session {
    return this.session;
  }

  smsOtp(): SmsOTP {
    return this.smsOTP;
  }

  getusers(): User {
    return this.user;
  }

  validations(): Validation {
    return this.validation;
  }
}

export default SDK;
