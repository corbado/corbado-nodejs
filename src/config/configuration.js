const assert = require('assert');
const CorbadoApi = require("../services/CorbadoApi");

class Configuration {

    #projectID;
    #apiSecret;
    #apiURL = 'https://api.corbado.com/v1';
    #shortSessionCookieName = 'cbo_short_session';
    #authenticationURL = undefined
    #cacheMaxAge = 10 * 60 * 1000
    #client;
    #emailTemplates = {
        EMAIL_SIGN_UP_TEMPLATE: 'email_signup_user',
        EMAIL_LOGIN_TEMPLATE: 'email_login_user',
        PASSKEY_SIGN_UP_TEMPLATE: 'webauthn_signup_user',
        PASSKEY_LOGIN_TEMPLATE: 'webauthn_login_user',
    }

    #sessionVersion = 'v2';

    #webhookUsername;
    #webhookPassword;f

    constructor(projectID, apiSecret, sessionVersion = 'v2') {
        this.#projectID = projectID;
        this.#apiSecret = apiSecret;
        this.#sessionVersion = sessionVersion;
        this.#client = new CorbadoApi(this.#projectID,this.#apiSecret, this.#apiURL);
    }

    set projectID(value) {
        assert(value.startsWith('pro-'), 'ProjectID is incorrect')

        this.#projectID = value;
    }

    get projectID() {
        return this.#projectID;
    }

    set apiSecret(value) {
        assert(value.length > 0, 'API is invalid')

        this.#apiSecret = value;
    }

    get apiSecret() {
        return this.#apiSecret;
    }

    set apiURL(value) {
        assert(value.length > 0, 'API url is invalid')
        assert(value.startsWith('http://') || value.startsWith('https://'), 'API url is invalid')

        this.#apiURL = value;
    }


    get apiURL() {
        return this.#apiURL;
    }

    get shortSessionCookieName() {
        return this.#shortSessionCookieName;
    }

    set shortSessionCookieName(value) {
        assert(value.length > 0, 'Short session cookie name is invalid')

        this.#shortSessionCookieName = value;
    }

    get authenticationURL() {
        return this.#authenticationURL;
    }

    set authenticationURL(value) {
        assert(value.length > 0, 'Authentication url is invalid')
        assert(value.startsWith('http://') || value.startsWith('https://'), 'Authentication url is invalid')

        this.#authenticationURL = value;
    }

    get cacheMaxAge() {
        return this.#cacheMaxAge;
    }

    set cacheMaxAge(value) {
        assert(value > 0, 'Cache max age is invalid')

        this.#cacheMaxAge = value;
    }

    get client() {
        return this.#client;
    }

    set client(client) {
        this.#client = client;
    }

    get emailTemplates() {
        return this.#emailTemplates;
    }

    set emailTemplates(value) {
        assert(typeof value === "object", 'Email templates is invalid')

        this.#emailTemplates = value;
    }

    get webhookUsername(){
        return this.#webhookUsername;
    }

    set webhookUsername(webhookUsername) {
        this.#webhookUsername = webhookUsername;
    }

    get webhookPassword(){
        return this.#webhookPassword;
    }

    set webhookPassword(webhookPassword){
        this.#webhookPassword = webhookPassword;
    }

    get sessionVersion(){
        return this.#sessionVersion;
    }

    set sessionVersion(sessionVersion){
        this.#sessionVersion = sessionVersion;
    }
}

module.exports = Configuration
