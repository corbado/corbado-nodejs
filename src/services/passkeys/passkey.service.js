const axios = require("axios");

class CorbadoPasskeyService {

    constructor(apiKey, config, email_templates, internal_config) {

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

        this.apiURL = internal_config.API_URL;

        this.email_templates = email_templates;
    }
    
    /*
    * Creates a Request to Corbado Service to initialize the Webatuhn registration process 
    * 
    * @param {string} username - the email of the user
    * @param {object} clientInfo - the clientInfo object containing the browser and device information {remoteAddress, userAgent, origin}
    * 
    * @returns {string} - the response from the server containing the publicKeyCredentialOptions
    */
    registerStart = async (username, clientInfo) => {
        try {
            let { data } = await axios.post(this.apiURL + 'webauthn/register/start', {
                username, origin: this.origin , clientInfo: clientInfo, credentialStatus: "active"
            }, {
                auth: {
                    username: this.projectId,
                    password: this.apiKey
                }
            });
            return data;
        } 
        catch (e) {
            console.log(e);
            throw new Error('Webauthn starting registration failed');
        }
        // return data["publicKeyCredentialCreationOptions"];
    };


    /*
    * Creates a Request Corbado Service to finilize the Webatuhn registration process 
    * 
    * @param {string} publicKeyCredential - can be obtained from the browser webatuhn create function by passing the publicKeyCredentialOptions 
    * @param {object} clientInfo - the clientInfo object containing the browser and device information {remoteAddress, userAgent, origin}
    * @param {string} requestID - the requestID, is set automatically if not provided
    * 
    * @returns {object} - the response object from the server containing the username, status and creadentialID
    */
    registerFinish = async (publicKeyCredential, clientInfo, requestID = null) => {
        let params = {
            publicKeyCredential: JSON.stringify(publicKeyCredential),
            origin: this.origin,
            clientInfo: clientInfo,
        };

    
        if (requestID) {
            params["requestID"] = requestID;
        }

        try {
            let { data } = await axios.post(this.apiURL + 'webauthn/register/finish', params, {
                auth: {
                    username: this.projectId,
                    password: this.apiKey
                }
            });
            return data;
        }
        catch (e) {
            console.log(e);
            throw new Error('Webauthn registration finish failed');
        }
    };

    /*
    * Creates a Request Corbado Service to send a confirmation email to the user, to confirm biometric device registration
    * 
    * @param {string} email - can be obtained from the browser webatuhn create function by passing the publicKeyCredentialOptions 
    * @param {object} redirec - the clientInfo object containing the browser and device information {remoteAddress, userAgent, origin}
    * @param {string} create - the requestID, is set automatically if not provided
    * @param {string} additionalPayload - the status of the credential, can be "active" or "inactive"
    * @param {string} clientInfo - the credentialID, is set automatically if not provided
    * 
    * @returns {object} - the response object from the server containing the username, status and creadentialID
    */
    emailLinkSend = async (email, redirect, create = true, additionalPayload, clientInfo) => {
        let params = {
            email: email,
            templateName: this.email_templates.PASSKEY_SIGN_UP_TEMPLATE, // webauthn_signup_user
            redirect: redirect,
            create: create, // true
            clientInfo: clientInfo,
            additionalPayload: JSON.stringify(additionalPayload),
        };

        try {
            let { data } = await axios.post(this.apiURL + "emailLinks", params, 
                {
                    auth: {
                        username: this.projectId,
                        password: this.apiKey,
                    },
                }
            )
            return data;
        } catch (e) {
            console.log(e);
            throw new Error('Webauthn seding confirmation email link failed');
        }

        // return {
        //     httpStatusCode: res.data.httpStatusCode, message: res.data.message,
        // };
    };

    emailLinkValidate = async (emailLinkID, token) => {
        try {
            let { data } = await axios.put(this.apiURL + "emailLinks/" + emailLinkID + "/validate", {token}, {
                auth: {
                    username: this.projectId,
                    password: this.apiKey,
                }
            });
            return data;
        }
        catch (e) {
            console.log(e);
            throw new Error('Webauthn email link validation failed');
        }       

        // return {
        //     httpStatusCode: res.data.httpStatusCode,
        //     message: res.data.message,
        //     additionalPayload: res.data.additionalPayload,
        // };
    }

    /*
    * Updates the credential status 
    * 
    * @param {credentialID} credentialID - the credentialID to update
    * @param {status} status - the status to update to
    * 
    * @returns {object} - the response object from the server containing the publicKeyCredentialOptions
    */
    credentialUpdate = (credentialID, status) => {

        try {
            let { data } = axios.put(this.apiURL + `webauthn/credential/${credentialID}`, {status}, {
                auth: {
                    username: this.projectId,
                    password: this.apiKey
                }
            });
            return data;
        }
        catch (e) {
            console.log(e);
            throw new Error('Webauthn credential update failed');
        }
    }

    /*
    * Creates a Request to Corbado Service to initialize the Webatuhn login process 
    * 
    * @param {string} username - the email of the user
    * @param {object} clientInfo - the clientInfo object containing the browser and device information {remoteAddress, userAgent, origin}
    * 
    * @returns {string} - the response from the server containing the publicKeyCredentialOptions
    */
    authenticateStart = async (username, clientInfo) => {
        try {
            let { data } = await axios.post(this.apiURL + 'webauthn/authenticate/start', {
                username, origin: this.origin, clientInfo: clientInfo
            },{
                auth: {
                    username: this.projectId,
                    password: this.apiKey
                }
            })
            return data;
        }
        catch (e) {
            console.log(e);
            throw new Error('Webauthn authenticate start failed');
        }
        
        // return data['publicKeyCredentialRequestOptions'];
    }

    /*
    * Creates a Request to Corbado Service to finilize the Webatuhn login process 
    * 
    * @param {string} publicKeyCredential - can be obtained from the browser webatuhn create function by passing the publicKeyCredentialOptions 
    * @param {object} clientInfo - the clientInfo object containing the browser and device information {remoteAddress, userAgent, origin}
    * @param {string} requestID - the requestID, is set automatically if not provided
    * 
    * @returns {object} - the response object from the server containing the username, status and creadentialID
    */
    authenticateFinish = async (publicKeyCredential, clientInfo, requestID = null) => {
        let params = {
            publicKeyCredential: JSON.stringify(publicKeyCredential),
            origin: this.origin,
            clientInfo: clientInfo
        };

        if (requestID) {
            params["requestID"] = requestID;
        }

        try {
            let { data } = await axios.post(this.apiURL + 'webauthn/authenticate/finish', params, {
                auth: {
                    username: this.projectId,
                     password: this.apiKey
                }
            });
            return data;
        }
        catch (e) {
            console.log(e);
            throw new Error('Webauthn authentication finish failed');
        }
    }
}

module.exports = CorbadoPasskeyService;