const axios = require('axios');

class CorbadoPasskeyService {

    constructor(apiKey, config, email_templates, internal_config) {

        if (!apiKey) {
            throw new Error('API key is required');
        }

        if (!config) {
            throw new Error('Config is required');
        }

        if (!('projectID' in config)) {
            throw new Error('Project ID (projectID) field in Configuration Object is required');
        }

        if (!('origin' in config)) {
            throw new Error('Origin (origin) field in Configuration Object is required');
        }

        this.apiKey = apiKey;
        this.config = config;

        this.projectID = config.projectID;
        this.origin = config.origin;

        this.apiURL = internal_config.BASE_API_URL + '/' + internal_config.API_VERSION + '/';

        this.email_templates = email_templates;
    }
    
    /*
    * Creates a Request to Corbado Service to initialize the Webatuhn registration process 
    * 
    * @param {string} username - the email of the user
    * @param {object} clientInfo - the clientInfo object containing the browser and device information {remoteAddress, userAgent, origin}
    * @param {string} clientInfo.remoteAddress - IP of the user
    * @param {string} clientInfo.userAgent - User Agent of the user
    * @param {string} clientInfo.origin - Origin of the request
    * 
    * @returns {object} data - the response from the server containing the publicKeyCredentialOptions
    * @returns {object} data.publicKeyCredentialOptions - the publicKeyCredentialOptions object is needed to initialize the Webauthn registration process from the client side
    */
    registerStart = async (username, clientInfo) => {
        try {
            let { data } = await axios.post(this.apiURL + 'webauthn/register/start', {
                username, origin: this.origin , clientInfo: clientInfo, credentialStatus: 'active'
            }, {
                auth: {
                    username: this.projectID,
                    password: this.apiKey
                }
            });
            return data;
        } 
        catch (e) {
            console.log(e);
            throw new Error('Webauthn starting registration failed');
        }
    };

    /*
    * Creates a Request Corbado Service to finilize the Webatuhn registration process 
    * 
    * @param {string} publicKeyCredential - can be obtained from the browser webatuhn create function by passing the publicKeyCredentialOptions 
    * @param {object} clientInfo - the clientInfo object containing the browser and device information {remoteAddress, userAgent, origin}
    * @param {string} clientInfo.remoteAddress - IP of the user
    * @param {string} clientInfo.userAgent - User Agent of the user
    * @param {string} clientInfo.origin - Origin of the request
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
            params['requestID'] = requestID;
        }

        try {
            let { data } = await axios.post(this.apiURL + 'webauthn/register/finish', params, {
                auth: {
                    username: this.projectID,
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
    * @param {string} email - the email of the user
    * @param {object} redirect - the URL to redirect the user to from the confirmation email
    * @param {boolean} create - create a new user with the given email if not found
    * @param {object} additionalPayload - additional payload to be added to the email
    * @param {string} additionalPayload.UserFullName - Full Name of the user to be added to the email
    * @param {object} clientInfo - the clientInfo object containing the browser and device information {remoteAddress, userAgent, origin}
    * @param {string} clientInfo.remoteAddress - IP of the user
    * @param {string} clientInfo.userAgent - User Agent of the user
    * @param {string} clientInfo.origin - Origin of the request
    * 
    * @returns {object} data - the response object from the server 
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
            let { data } = await axios.post(this.apiURL + 'emailLinks', params, 
                {
                    auth: {
                        username: this.projectID,
                        password: this.apiKey,
                    },
                }
            )
            return data;
        } catch (e) {
            console.log(e);
            throw new Error('Webauthn seding confirmation email link failed');
        }
    };

    /*
    * Creates a Request Corbado Service to confirm tha validity of the linkID and the token that was sent to the client. 
    * Can be used after the user is redirected back to the via the email link.
    * 
    * @param {string} emailLinkID - is sent to the client via the email link
    * @param {object} token - is sent to the client via the email link
    * 
    * @returns {object} data - the response object from the server containing the username, status and creadentialID
    */
    emailLinkValidate = async (emailLinkID, token) => {
        try {
            let { data } = await axios.put(this.apiURL + 'emailLinks/' + emailLinkID + '/validate', {token}, {
                auth: {
                    username: this.projectID,
                    password: this.apiKey,
                }
            });
            return data;
        }
        catch (e) {
            console.log(e);
            throw new Error('Webauthn email link validation failed');
        }       
    }

    /*
    * Updates the credential status 
    * 
    * @param {credentialID} credentialID - the credentialID to update
    * @param {status} status - the status to update to
    * 
    * @returns {object} data - the response object from the server containing the new credential status
    */
    credentialUpdate = (credentialID, status) => {

        try {
            let { data } = axios.put(this.apiURL + `webauthn/credential/${credentialID}`, {status}, {
                auth: {
                    username: this.projectID,
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
    * @param {string} clientInfo.remoteAddress - IP of the user
    * @param {string} clientInfo.userAgent - User Agent of the user
    * @param {string} clientInfo.origin - Origin of the request
    * 
    * @returns {object} data - the response from the server containing the publicKeyCredentialOptions
    * @returns {object} data.publicKeyCredentialOptions - the publicKeyCredentialOptions object is needed to initialize the Webauthn registration process from the client side
    */
    authenticateStart = async (username, clientInfo) => {
        try {
            let { data } = await axios.post(this.apiURL + 'webauthn/authenticate/start', {
                username, origin: this.origin, clientInfo: clientInfo
            },{
                auth: {
                    username: this.projectID,
                    password: this.apiKey
                }
            })
            return data;
        }
        catch (e) {
            console.log(e);
            throw new Error('Webauthn authenticate start failed');
        }        
    }

    /*
    * Creates a Request to Corbado Service to finilize the Webatuhn login process 
    * 
    * @param {string} publicKeyCredential - can be obtained from the browser webatuhn create function by passing the publicKeyCredentialOptions 
    * @param {object} clientInfo - the clientInfo object containing the browser and device information {remoteAddress, userAgent, origin}
    * @param {string} clientInfo.remoteAddress - IP of the user
    * @param {string} clientInfo.userAgent - User Agent of the user
    * @param {string} clientInfo.origin - Origin of the request
    * 
    * @param {string} requestID - the requestID, is set automatically if not provided
    * 
    * @returns {object} data - the response object from the server containing the username, status and creadentialID
    */
    authenticateFinish = async (publicKeyCredential, clientInfo, requestID = null) => {
        let params = {
            publicKeyCredential: JSON.stringify(publicKeyCredential),
            origin: this.origin,
            clientInfo: clientInfo
        };

        if (requestID) {
            params['requestID'] = requestID;
        }

        try {
            let { data } = await axios.post(this.apiURL + 'webauthn/authenticate/finish', params, {
                auth: {
                    username: this.projectID,
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
