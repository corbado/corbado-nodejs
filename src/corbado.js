const CorbadoPasskeyService = require('./services/passkeys/passkey.service');
const CorbadoEmailLinkService = require('./services/email/emaillink.service');
const SessionService = require('./services/session/session.service');
const getClientInfo = require('./utils/clientInfo.utils');


const EMAIL_TEMPLATES = {
    EMAIL_SIGN_UP_TEMPLATE: 'email_signup_user',
    EMAIL_LOGIN_TEMPLATE: 'email_login_user',
    PASSKEY_SIGN_UP_TEMPLATE: 'webauthn_signup_user',
    PASSKEY_LOGIN_TEMPLATE: 'webauthn_login_user',
}

const API_URL = 'https://api.corbado.com/v1/';

class Corbado {
    constructor(projectID, apiSecret) {

        if (!projectID) {
            throw new Error('Project ID is required');
        }

        if (!apiSecret) {
            throw new Error('API secret is required');
        }

        this.passkeyService = new CorbadoPasskeyService(projectID, apiSecret, API_URL);
        this.emailLinkService = new CorbadoEmailLinkService(projectID, apiSecret, API_URL, EMAIL_TEMPLATES);
        this.sessionService = new SessionService(projectID, apiSecret, API_URL);
        this.utils = {getClientInfo};
    }
}

module.exports = Corbado;