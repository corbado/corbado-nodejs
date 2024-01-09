/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { AuthToken, EmailOTP, Session, SmsOTP, Validation, EmailLink, User } from './services/index.js';
class SDK {
    constructor(config) {
        this.authToken = new AuthToken(this.createClient(config));
        this.emailLink = new EmailLink(this.createClient(config));
        this.emailOTP = new EmailOTP(this.createClient(config));
        this.session = new Session(process.env.npm_package_version, config.ProjectID, config.FrontendAPI, config.ShortSessionCookieName, config.JWTIssuer, config.CacheMaxAge);
        this.smsOTP = new SmsOTP(this.createClient(config));
        this.user = new User(this.createClient(config));
        this.validation = new Validation(this.createClient(config));
    }
    createClient(config) {
        const instance = axios.create();
        instance.defaults.auth = new (class {
            constructor() {
                this.password = config.APISecret;
                this.username = config.ProjectID;
            }
        })();
        instance.defaults.baseURL = config.BackendAPI;
        instance.defaults.headers['X-Corbado-SDK-Version'] = JSON.stringify({
            name: 'Node.js SDK',
            sdkVersion: process.env.npm_package_version,
            languageVersion: process.version,
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