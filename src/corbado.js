const CorbadoPasskeyService = require('./services/passkeys/passkey.service');
const CorbadoEmailMagicLinkService = require('./services/email/emaillink.service');
const SessionService = require('./services/session/session.service');
const getClientInfo = require('./utils/clientInfo.utils');


const EMAIL_TEMPLATES = {
    EMAIL_SIGN_UP_TEMPLATE: 'email_signup_user',
    EMAIL_LOGIN_TEMPLATE: 'email_login_user',
    PASSKEY_SIGN_UP_TEMPLATE: 'webauthn_signup_user',
    PASSKEY_LOGIN_TEMPLATE: 'webauthn_login_user',
}

const INTERNAL_CONFIG = {
    API_VERSION: 'v1',
    BASE_API_URL: 'https://api.corbado.com',
}

class Corbado {
    constructor(projectID, apiSecret) {

        if (!projectID) {
            throw new Error('Project ID is required');
        }

        if (!apiSecret) {
            throw new Error('API secret is required');
        }

        this.webauthnService = new CorbadoPasskeyService(projectID, apiSecret, EMAIL_TEMPLATES, INTERNAL_CONFIG);
        this.emailMagicLinkService = new CorbadoEmailMagicLinkService(projectID, apiSecret, EMAIL_TEMPLATES, INTERNAL_CONFIG);
        this.sessionService = new SessionService(projectID, apiSecret, INTERNAL_CONFIG);
        this.utils = {
            getClientInfo: getClientInfo
        }
    }
}

module.exports = Corbado;