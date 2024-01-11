/* eslint-disable class-methods-use-this */
import axios, { AxiosInstance } from 'axios';
import Configuration from './config.js';
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

  constructor(config: Configuration) {
    this.axiosClient = this.createClient(config);

    this.authToken = new AuthToken(this.axiosClient);

    this.emailLink = new EmailLink(this.axiosClient);

    this.emailOTP = new EmailOTP(this.axiosClient);

    this.session = new Session(config.FrontendAPI, config.ShortSessionCookieName, config.JWTIssuer, config.CacheMaxAge);

    this.smsOTP = new SmsOTP(this.axiosClient);

    this.user = new User(this.axiosClient);

    this.validation = new Validation(this.axiosClient);
  }

  // createClient(config: Configuration): AxiosInstance {
  //   const instance = axios.create();

  //   instance.defaults.auth = new (class implements AxiosBasicCredentials {
  //     password: string = config.APISecret;

  //     username: string = config.ProjectID;
  //   })();

  //   instance.defaults.baseURL = config.BackendAPI;
  //   instance.defaults.headers['X-Corbado-SDK-Version'] = JSON.stringify({
  //     name: 'Node.js SDK',
  //     sdkVersion: process.env.npm_package_version,
  //     languageVersion: process.version,
  //   });
  //   console.log({ BACKEND_API: config.BackendAPI });

  //   return instance;
  // }

  createClient(config: Configuration): AxiosInstance {
    const instance = axios.create({
      baseURL: config.BackendAPI,
      auth: {
        username: config.ProjectID,
        password: config.APISecret,
      },
      headers: {
        'X-Corbado-SDK-Version': JSON.stringify({
          name: 'Node.js SDK',
          sdkVersion: process.env.npm_package_version,
          languageVersion: process.version,
        }),
      },
    });

    // Consider removing this console.log for security purposes
    console.log({ BACKEND_API: config.BackendAPI });

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
