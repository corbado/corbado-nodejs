const axios = require("axios");

// //helper function
// async function webAuthnRegisterFinish(publicKeyCredential, clientInfo, requestID = null, projectId, apiURL, apiKey, origin){
//     let data = {
//         publicKeyCredential: JSON.stringify(publicKeyCredential),
//         origin: origin,
//         clientInfo: clientInfo,
//     };

//     if (requestID) {
//         data["requestID"] = requestID;
//     }

//     return axios.post(apiURL + 'webauthn/register/finish', data, {
//         auth: {
//             username: projectId,
//             password: apiKey
//         }
//     }).catch(e=> console.log(e))
// };

//helper function
// async function webAuthnLoginFinish(publicKeyCredential, clientInfo, projectId, apiURL, apiKey, origin){
//     let data = {
//         publicKeyCredential: JSON.stringify(publicKeyCredential),
//         origin: origin,
//         clientInfo: clientInfo
//     };

//     return axios.post(apiURL + 'webauthn/authenticate/finish', data, {
//         auth: {
//             username: projectId,
//             password: apiKey
//         }
//     })
//     .catch(e => console.log(e))
// } 

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
        // let {data} = await webAuthnRegisterFinish(
        //     publicKeyCredential, 
        //     clientInfo, 
        //     requestID, 
        //     this.projectId, 
        //     this.apiURL, 
        //     this.apiKey, 
        //     this.origin
        //     );

        // //Updates the credential status to "active"
        // await this.credentialUpdate(data["credentialID"], 'active');

        // return data;

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
        let data = {
            email: email,
            templateName: this.email_templates.PASSKEY_SIGN_UP_TEMPLATE, // webauthn_signup_user
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

    /*
    * Updates the credential status 
    * 
    * @param {credentialID} credentialID - the credentialID to update
    * @param {status} status - the status to update to
    * 
    * @returns {object} - the response object from the server containing the publicKeyCredentialOptions
    */
    credentialUpdate = (credentialID, status) => {
        return axios.put(this.apiURL + `webauthn/credential/${credentialID}`, {status}, {
            auth: {
                username: this.projectId,
                password: this.apiKey
            }
        });
    };

    /*
    * Creates a Request to Corbado Service to initialize the Webatuhn login process 
    * 
    * @param {string} username - the email of the user
    * @param {object} clientInfo - the clientInfo object containing the browser and device information {remoteAddress, userAgent, origin}
    * 
    * @returns {string} - the response from the server containing the publicKeyCredentialOptions
    */
    authenticateStart = async (username, clientInfo) => {

        let { data } = await axios.post(this.apiURL + 'webauthn/authenticate/start', {
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
        // let { data } = await webAuthnLoginFinish(publicKeyCredential, clientInfo, this.projectId, this.apiURL, this.apiKey, this.origin);
        // return data;
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
    
        // return axios.post(apiURL + 'webauthn/authenticate/finish', data, {
        //     auth: {
        //         username: projectId,
        //         password: apiKey
        //     }
        // })
        // .catch(e => console.log(e))
    };
}

module.exports = CorbadoPasskeyService;