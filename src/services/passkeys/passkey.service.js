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

async function webAuthnRegisterFinish(publicKeyCredential, clientInfo, requestID = null, projectId, apiURL, apiKey, origin){
    let data = {
        publicKeyCredential: JSON.stringify(publicKeyCredential),
        origin: origin,
        clientInfo: clientInfo,
    };

    if (requestID) {
        data["requestID"] = requestID;
    }

    return axios.post(apiURL + 'webauthn/register/finish', data, {
        auth: {
            username: projectId,
            password: apiKey
        }
    }).catch(e=> console.log(e))
};

async function webAuthnLoginFinish(publicKeyCredential, clientInfo, projectId, apiURL, apiKey, origin){
    let data = {
        publicKeyCredential: JSON.stringify(publicKeyCredential),
        origin: origin,
        clientInfo: clientInfo
    };

    return axios.post(apiURL + 'webauthn/authenticate/finish', data, {
        auth: {
            username: projectId,
            password: apiKey
        }
    })
    .catch(e => console.log(e))
} 

class CorbadoPasskeyService {

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
    
    /*
    * Creates an HTTP client for issuing Stripe API requests which uses the Web
    * Fetch API.
    *
    * A fetch function can optionally be passed in as a parameter. If none is
    * passed, will default to the default `fetch` function in the global scope.
    */
    // @Route("/api/signup/webauthn/init")
    registerStart = async (username, clientInfo) => {
        let {data} = await axios.post(this.apiURL + 'webauthn/register/start', {
            username, origin: this.origin , clientInfo: clientInfo, credentialStatus: "active"
        }, {
            auth: {
                username: this.projectId,
                password: this.apiKey
            }
        });
        return data["publicKeyCredentialCreationOptions"];
    };


    // @Route("/api/signup/webauthn/finish")
    registerFinish = async (publicKeyCredential, clientInfo, requestID = null) => {
        let {data} = await webAuthnRegisterFinish(publicKeyCredential, clientInfo, requestID, this.projectId, this.apiURL, this.apiKey, this.origin);
        await this.webAuthnConfirmDevice(data["credentialID"], 'active');
        return data;
    };

    emailLinkSend = async (email, redirect, create = true, additionalPayload, clientInfo) => {
        let data = {
            email: email,
            templateName: EMAIL_TEMPLATES.PASSKEY_SIGN_UP_TEMPLATE, // webauthn_signup_user
            redirect: redirect,
            create: create, // true
            clientInfo: clientInfo,
            additionalPayload: JSON.stringify(additionalPayload),
        };

        let res = await axios.post(this.apiURL + "emailLinks", data, 
            {
                auth: {
                    username: this.projectId,
                    password: this.apiKey,
                },
            }
        )

        return {
            httpStatusCode: res.data.httpStatusCode, message: res.data.message,
        };
    };

    // @Route("process.env.REDIRECT")
    confirmSignup = async (emailLinkId, token) => {
        let response = await this.emailLinkValidate(emailLinkId, token);
        let {credentialId} = JSON.parse(response.additionalPayload);
        return this.webAuthnConfirmDevice(credentialId, 'active');
    }

    emailLinkValidate = async (emailLinkID, token) => {
        let res = await axios.put(this.apiURL + "emailLinks/" + emailLinkID + "/validate", {token}, {
            auth: {
                username: this.projectId,
                password: this.apiKey,
            }
        });

        return {
            httpStatusCode: res.data.httpStatusCode,
            message: res.data.message,
            additionalPayload: res.data.additionalPayload,
        };
    }

    webAuthnConfirmDevice = (credentialID, status) => {
        return axios.put(this.apiURL + `webauthn/credential/${credentialID}`, {status}, {
            auth: {
                username: this.projectId,
                password: this.apiKey
            }
        });
    };

    // @Route("/api/login/webauthn/start")
    authenticateStart = async (username, clientInfo) => {

        let {data} = await axios.post(this.apiURL + 'webauthn/authenticate/start', {
            username, origin: this.origin, clientInfo: clientInfo
        },{
            auth: {
                username: this.projectId,
                password: this.apiKey
            }
        })
        .catch(e => console.log(e))
        return data['publicKeyCredentialRequestOptions'];
    };

    // @Route("/api/login/webauthn/finish")
    authenticateFinish = async (publicKeyCredential, clientInfo) => {
        let { data } = await webAuthnLoginFinish(publicKeyCredential, clientInfo, this.projectId, this.apiURL, this.apiKey, this.origin);
        return data;
    };
}

module.exports = CorbadoPasskeyService;