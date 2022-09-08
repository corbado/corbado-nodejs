const CorbadoPasskeyService  =  require('./services/passkeys/passkey.service');
const CorbadoEmailMagicLinkService  =  require('./services/email/emaillink.service');

const DEFAULT_API_VERSION = 'v1';
const DEFAULT_TIMEOUT = 80000;


const ALLOWED_CONFIG_PROPERTIES = [
    'origin',
    'projectId',
    'maxNetworkRetries',
    'httpAgent',
    'httpClient',
    'timeout',
    'host',
    'port',
    'protocol',
    'telemetry',
    'appInfo',
    'stripeAccount',
];

const EMAIL_TEMPLATES = {
    EMAIL_SIGN_UP_TEMPLATE : "email_signup_user",
    EMAIL_LOGIN_TEMPLATE : "email_login_user",
    PASSKEY_SIGN_UP_TEMPLATE : "webauthn_signup_user",
    PASSKEY_LOGIN_TEMPLATE : "webauthn_login_user",
}

const INTERNAL_CONFIG = {
    API_VERSION : "v1",
    API_URL :"https://api.corbado.com/v1/",
}

class Corbado {
    constructor(apiKey, config) {

        if (!apiKey) {
            throw new Error('API key is required');
        }

        if (!config) {
            throw new Error('Config is required');
        }

        if (!("projectId" in config)) {
            throw new Error('Project ID (projectId) field in Configuration Object is required');
        }

        if (!("origin" in config)) {
            throw new Error('Origin (origin) field in Configuration Object is required');
        }

        this.webauthnService = new CorbadoPasskeyService(apiKey, config);
        this.emailMagicLinkService = new CorbadoEmailMagicLinkService(apiKey, config);
    }
}

module.exports = Corbado;

// exports.printMsg = function() {
//     console.log("This is a message from the demo package");
// }