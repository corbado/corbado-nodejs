/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { AuthToken, EmailOTP, Session, SmsOTP, Validation, EmailLink, User } from './services/index.js';
class SDK {
    constructor(config) {
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
    createClient(config) {
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
        return instance;
    }
    authTokens() {
        return this.authToken;
    }
    emailLinks() {
        return this.emailLink;
    }
    emailOtp() {
        return this.emailOTP;
    }
    sessions() {
        return this.session;
    }
    smsOtp() {
        return this.smsOTP;
    }
    getusers() {
        return this.user;
    }
    validations() {
        return this.validation;
    }
}
export default SDK;
//# sourceMappingURL=sdk.js.map