const axios = require("axios");

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

class CorbadoEmailMagicLinkService {

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

        this.apiKey = apiKey;
        this.config = config;

        this.projectId = config.projectId;
        this.origin = config.origin;

        this.apiURL = INTERNAL_CONFIG.API_URL;
    }

    // @Route("/api/emailLinkSend")
    emailLinkSend = async (email, redirect, create, additionalPayload, clientInfo) => {
        let data = {
            email: email,
            templateName: EMAIL_TEMPLATES.EMAIL_LOGIN_TEMPLATE, // email_login_user OR email_signup_user
            redirect: redirect,
            create: create, // true
            additionalPayload: JSON.stringify(additionalPayload), 
            clientInfo: clientInfo,
        };

        let res = await axios.post(this.apiURL + "emailLinks", data, {
            auth: {
                username: this.projectId,
                password: this.apiKey
            }
        })

        return {
            httpStatusCode: res.data.httpStatusCode, message: res.data.message,
        };
    };


    // @Route("/api/emailLinkValidate/{emailLinkID}
    emailLinkValidate = async (emailLinkID, token) => {
        let res = await axios.put(this.apiURL + "emailLinks/" + emailLinkID + "/validate", {token}, {
            auth: {
                username: this.projectId,
                password: this.apiKey
            }
        });

        return {
            httpStatusCode: res.data.httpStatusCode,
            message: res.data.message,
            additionalPayload: res.data.additionalPayload,
        };
    }
}


module.exports =  CorbadoEmailMagicLinkService;