import assert from 'assert';

class Configuration {

    #projectID = '';
    #apiSecret = '';
    #frontendAPI = '';
    #backendAPI = 'https://backendapi.corbado.io';
    #shortSessionCookieName = 'cbo_short_session';
    #cacheMaxAge = 10 * 60 * 1000
    #client;
    #emailTemplates = {
        EMAIL_SIGN_UP_TEMPLATE: 'email_signup_user',
        EMAIL_LOGIN_TEMPLATE: 'email_login_user',
        PASSKEY_SIGN_UP_TEMPLATE: 'webauthn_signup_user',
        PASSKEY_LOGIN_TEMPLATE: 'webauthn_login_user',
    }


    #webhookUsername;
    #webhookPassword;

    constructor(projectID, apiSecret) {
        if (!projectID || !apiSecret) {
            throw new Error('Missing environment variables project ID and/or API secret.');
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
        console.log("this frontend api: ", this.#frontendAPI)
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
