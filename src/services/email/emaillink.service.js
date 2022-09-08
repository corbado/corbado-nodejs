const axios = require("axios");

class CorbadoEmailMagicLinkService {

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
    * Creates a Request Corbado Service to send a Email Magic Link for login to the user
    * 
    * @param {string} email - the email of the user
    * @param {object} redirect - the URL to redirect the user to from the confirmation email
    * @param {boolean} create - create a new user with the given email if not found
    * @param {object} additionalPayload - additional payload to be added to the email
    * @param {string} additionalPayload.UserFullName - Full Name of the user to be added to the email
    * 
    * @param {object} clientInfo - the clientInfo object containing the browser and device information {remoteAddress, userAgent, origin}
    * @param {string} clientInfo.remoteAddress - IP of the user
    * @param {string} clientInfo.userAgent - User Agent of the user
    * @param {string} clientInfo.origin - Origin of the request
    * 
    * @returns {object} data - the response object from the server 
    */
    emailLinkSend = async (email, redirect, create, additionalPayload, clientInfo) => {
        let data = {
            email: email,
            templateName: this.email_templates.EMAIL_LOGIN_TEMPLATE, // email_login_user OR email_signup_user
            redirect: redirect,
            create: create, // true
            additionalPayload: JSON.stringify(additionalPayload), 
            clientInfo: clientInfo,
        };

        try {
            let { data } = await axios.post(this.apiURL + "emailLinks", data, {
                auth: {
                    username: this.projectId,
                    password: this.apiKey
                }
            })
    
            return data;
        }
        catch (e) {
            console.log(e);
            throw new Error('Email link sending failed from EmailMagicLinkService');
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
            let { data } = await axios.put(this.apiURL + "emailLinks/" + emailLinkID + "/validate", {token}, {
                auth: {
                    username: this.projectId,
                    password: this.apiKey
                }
            });
    
            return data;
        }
        catch (e) {
            console.log(e);
            throw new Error('Email link validation failed from EmailMagicLinkService');
        }
    }
}


module.exports =  CorbadoEmailMagicLinkService;