"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable class-methods-use-this */
const axios_1 = require("axios");
const index_js_1 = require("./services/index.js");
class SDK {
    constructor(config) {
        this.axiosClient = this.createClient(config);
        this.authToken = new index_js_1.AuthToken(this.axiosClient);
        this.emailLink = new index_js_1.EmailLink(this.axiosClient);
        this.emailOTP = new index_js_1.EmailOTP(this.axiosClient);
        this.session = new index_js_1.Session(config.FrontendAPI, config.ShortSessionCookieName, config.JWTIssuer, config.CacheMaxAge);
        this.smsOTP = new index_js_1.SmsOTP(this.axiosClient);
        this.user = new index_js_1.User(this.axiosClient);
        this.validation = new index_js_1.Validation(this.axiosClient);
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
        const instance = axios_1.default.create({
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
exports.default = SDK;
//# sourceMappingURL=sdk.js.map