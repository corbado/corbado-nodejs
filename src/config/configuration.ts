// convert this file to typescript (.ts) and add types

import * as assert from 'assert';

class Configuration {

    #projectID = '';
    #apiSecret = '';
    #frontendAPI = '';
    #backendAPI = 'https://backendapi.corbado.io/v1';
    #shortSessionCookieName = 'cbo_short_session';
    #cacheMaxAge = 10 * 60 * 1000 // What are these magic numbers? ):
    #client = null;
    #emailTemplates = {
        EMAIL_SIGN_UP_TEMPLATE: 'email_signup_user',
        EMAIL_LOGIN_TEMPLATE: 'email_login_user',
        PASSKEY_SIGN_UP_TEMPLATE: 'webauthn_signup_user',
        PASSKEY_LOGIN_TEMPLATE: 'webauthn_login_user',
    }


    #webhookUsername = '';
    #webhookPassword = '';

    constructor(projectID: string, apiSecret = '') {
        if (!projectID.startsWith('pro-')) {
            throw new Error('Invalid project ID "' + projectID + '" given, needs to start with "pro-"');
        }

        if (apiSecret !== '' && !apiSecret.startsWith('corbado1_')) {
            throw new Error('Invalid API secret "' + apiSecret + '" given, needs to start with "corbado1_"');
        }

        this.#projectID = projectID;
        this.#apiSecret = apiSecret;
    }

    get projectID() {
        return this.#projectID;
    }

    get apiSecret() {
        return this.#apiSecret;
    }

    set backendAPI(value) {
        assert(value.length > 0, 'Backend API is invalid')
        assert(value.startsWith('http://') || value.startsWith('https://'), 'Backend API url is invalid')

        this.#backendAPI = value;
    }


    get backendAPI() {
        return this.#backendAPI;
    }

    set frontendAPI(value) {
        assert(value.length > 0, 'Frontend API is invalid')
        assert(value.startsWith('http://') || value.startsWith('https://'), 'Frontend API is invalid')

        this.#frontendAPI = value;
    }

    get frontendAPI() {
        if (this.#frontendAPI === '') {
            if (this.#projectID === '') {
                throw new Error('Project ID empty, set Project ID first');
            }

            this.#frontendAPI = 'https://' + this.#projectID + '.frontendapi.corbado.io';
        }
        return this.#frontendAPI;
    }

    get shortSessionCookieName() {
        return this.#shortSessionCookieName;
    }

    set shortSessionCookieName(value) {
        assert(value.length > 0, 'Short session cookie name is invalid')

        this.#shortSessionCookieName = value;
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

    get webhookUsername() {
        return this.#webhookUsername;
    }

    set webhookUsername(webhookUsername) {
        this.#webhookUsername = webhookUsername;
    }

    get webhookPassword() {
        return this.#webhookPassword;
    }

    set webhookPassword(webhookPassword) {
        this.#webhookPassword = webhookPassword;
    }

}

export default Configuration