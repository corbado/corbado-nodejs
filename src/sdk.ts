/* eslint-disable class-methods-use-this */
import axios, { AxiosInstance } from 'axios';
import Config from './config.js';
import { AuthToken, EmailOTP, Session, SmsOTP, Validation, EmailLink, User } from './services/index.js';

class SDK {
  private axiosClient: AxiosInstance;

  private authToken: AuthToken;

  private emailLink: EmailLink;

  private emailOTP: EmailOTP;

  private session: Session;

  private smsOTP: SmsOTP;

  private user: User;

  private validation: Validation;

  constructor(config: Config) {
    this.axiosClient = this.createClient(config);

    this.authToken = new AuthToken(this.axiosClient);

    this.emailLink = new EmailLink(this.axiosClient);

    this.emailOTP = new EmailOTP(this.axiosClient);

    this.session = new Session(
      this.axiosClient,
      config.ShortSessionCookieName,
      config.FrontendAPI,
      `${config.FrontendAPI}/.well-known/jwks`,
    );

    this.smsOTP = new SmsOTP(this.axiosClient);

    this.user = new User(this.axiosClient);

    this.validation = new Validation(this.axiosClient);
  }

  createClient(config: Config): AxiosInstance {
    const instance = axios.create({
      baseURL: config.BackendAPI,
      auth: {
        username: config.ProjectID,
        password: config.APISecret,
      },
      headers: {
        'X-Corbado-SDK': JSON.stringify({
          name: 'Node.js SDK',
          sdkVersion: process.env.npm_package_version,
          languageVersion: process.version,
        }),
      },
    });

    return instance;
  }

  authTokens(): AuthToken {
    return this.authToken;
  }

  emailLinks(): EmailLink {
    return this.emailLink;
  }

  emailOtps(): EmailOTP {
    return this.emailOTP;
  }

  sessions(): Session {
    return this.session;
  }

  smsOtps(): SmsOTP {
    return this.smsOTP;
  }

  users(): User {
    return this.user;
  }

  validations(): Validation {
    return this.validation;
  }
}

export default SDK;
