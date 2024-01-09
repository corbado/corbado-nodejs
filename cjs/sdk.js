"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable class-methods-use-this */
const axios_1 = require("axios");
const index_js_1 = require("./services/index.js");
class SDK {
    constructor(config) {
        this.authToken = new index_js_1.AuthToken(this.createClient(config));
        this.emailLink = new index_js_1.EmailLink(this.createClient(config));
        this.emailOTP = new index_js_1.EmailOTP(this.createClient(config));
        this.session = new index_js_1.Session(config.FrontendAPI, config.ShortSessionCookieName, config.JWTIssuer, config.CacheMaxAge);
        this.smsOTP = new index_js_1.SmsOTP(this.createClient(config));
        this.user = new index_js_1.User(this.createClient(config));
        this.validation = new index_js_1.Validation(this.createClient(config));
    }
    createClient(config) {
        const instance = axios_1.default.create();
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
exports.default = SDK;
//# sourceMappingURL=sdk.js.map