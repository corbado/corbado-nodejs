/* eslint-disable class-methods-use-this */
import axios, { AxiosInstance } from 'axios';
import Config from './config.js';
import { Identifier, Session, User } from './services/index.js';

class SDK {
  private axiosClient: AxiosInstance;

  private user: User;

  private session: Session;

  private identifier: Identifier;

  constructor(config: Config) {
    this.validateEnvironment();

    this.axiosClient = this.createClient(config);

    this.session = new Session(
      config.ShortSessionCookieName,
      config.FrontendAPIWithCName,
      `${config.FrontendAPI}/.well-known/jwks`,
      config.CacheMaxAge,
      config.ProjectID,
    );

    this.user = new User(this.axiosClient);

    this.identifier = new Identifier(this.axiosClient);
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
        'X-Corbado-ProjectID': config.ProjectID,
      },
    });

    return instance;
  }

  sessions(): Session {
    return this.session;
  }

  users(): User {
    return this.user;
  }

  identifiers(): Identifier {
    return this.identifier;
  }

  private validateEnvironment(): void {
    const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
    if (isBrowser) {
      throw new Error('This SDK is not supported in browser environment');
    }
  }
}

export default SDK;
