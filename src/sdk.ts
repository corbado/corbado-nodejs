import axios, { AxiosInstance, AxiosBasicCredentials } from 'axios';
import { Config } from './config';
import { EmailLink, EmailOTP, Session, SmsOTP, User, Validation } from './services';
import AuthToken from './services/authTokenService';

class SDK {
  private authToken: AuthToken;

  private emailLink: EmailLink;

  private emailOTP: EmailOTP;

  private session: Session;

  private smsOTP: SmsOTP;

  private user: User;

  private validation: Validation;

  constructor(config: Config) {
    this.authToken = new AuthToken(SDK.createClient(config));

    this.emailLink = new EmailLink(SDK.createClient(config));

    this.emailOTP = new EmailOTP(SDK.createClient(config));

    this.session = new Session(
      process.env.npm_package_version as string,
      config.ProjectID,
      config.FrontendAPI,
      config.ShortSessionCookieName,
      config.JWTIssuer,
      config.CacheMaxAge,
    );

    this.smsOTP = new SmsOTP(SDK.createClient(config));

    this.user = new User(SDK.createClient(config));

    this.validation = new Validation(SDK.createClient(config));
  }

  static createClient(config: Config): AxiosInstance {
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
