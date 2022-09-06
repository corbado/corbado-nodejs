const axios = require("axios");

class CorbadoPasskeyService {

    constructor(projectId, apiKey, origin) {
        this.projectId = projectId;
        this.apiKey = apiKey;
        this.origin = origin;
        this.apiURL = "https://api.corbado.com/v1/";
    }
    
    /*
    * Creates an HTTP client for issuing Stripe API requests which uses the Web
    * Fetch API.
    *
    * A fetch function can optionally be passed in as a parameter. If none is
    * passed, will default to the default `fetch` function in the global scope.
    */
    // @Route("/api/signup/webauthn/init")
    startSignup = async (username, clientInfo) => {
        let {data} = await axios.post(process.env.API_URL + 'webauthn/register/start', {
            username, origin: process.env.ORIGIN , clientInfo: clientInfo, credentialStatus: "active"
        }, {
            auth: {
                username: this.projectId,
                password: this.apiKey
            }
        });
        return data["publicKeyCredentialCreationOptions"];
    };


    // @Route("/api/signup/webauthn/finish")
    finishSignup = async (publicKeyCredential, clientInfo, requestID) => {
        let {data} = await this.webAuthnRegisterFinish(publicKeyCredential, clientInfo);
        await this.webAuthnConfirmDevice(data["credentialID"], 'active');
        return data;
    };

    webAuthnRegisterFinish = async (publicKeyCredential, clientInfo, requestID = null) => {
        let data = {
            publicKeyCredential: JSON.stringify(publicKeyCredential),
            origin: this.origin,
            clientInfo: clientInfo,
        };

        if (requestID) {
            data["requestID"] = requestID;
        }

        return axios.post(this.apiURL + 'webauthn/register/finish', data, {
            auth: {
                username: this.projectId,
                password: this.apiKey
            }
        }).catch(e=> console.log(e))
    };

    emailLinkSend = async (email, templateName, redirect, create, additionalPayload, clientInfo, projectId, apiSecret) => {
        let data = {
            email: email,
            templateName: templateName, // webauthn_signup_user
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
    startLogin = async (username, clientInfo) => {

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
    finishLogin = async (publicKeyCredential, clientInfo) => {
        let { data } = await this.webAuthnLoginFinish(publicKeyCredential, clientInfo);
        return data;
    };

    webAuthnLoginFinish = async (publicKeyCredential, clientInfo) => {
        let data = {
            publicKeyCredential: JSON.stringify(publicKeyCredential),
            origin: this.origin,
            clientInfo: clientInfo
        };

        return axios.post(this.apiURL + 'webauthn/authenticate/finish', data, {
            auth: {
                username: this.projectId,
                password: this.apiKey
            }
        })
        .catch(e => console.log(e))
    }
}

module.exports = CorbadoPasskeyService;