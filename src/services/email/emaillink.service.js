const axios = require('axios');

class CorbadoEmailLinkService {

    constructor(projectID, apiSecret, email_templates, internal_config) {

        this.projectID = projectID;
        this.apiSecret = apiSecret;

        this.apiURL = internal_config.BASE_API_URL + '/' + internal_config.API_VERSION + '/';

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
    emailLinkSend = async (email, redirect, create, additionalPayload, clientInfo, passkeySignUp = false, requestID = null) => {
        let params = {
            email: email,
            templateName: this.email_templates.EMAIL_LOGIN_TEMPLATE, 
            redirect: redirect,
            create: create, 
            additionalPayload: JSON.stringify(additionalPayload), 
            clientInfo: clientInfo,
        };

        if (passkeySignUp) {
            params.templateName = this.email_templates.PASSKEY_SIGN_UP_TEMPLATE;
        }

        if (requestID) {
            params['requestID'] = requestID;
        }

        try {
            let { data } = await axios.post(this.apiURL + 'emailLinks', params, {
                auth: {
                    username: this.projectID,
                    password: this.apiSecret
                }
            });
            return data;
        }
        catch (e) {
            throw new Error('Email link sending failed from EmailLinkService : ' + e.message);
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
    emailLinkValidate = async (emailLinkID, token, requestID = null) => {

        try {
            let params = {
                token: token,
            }

            if (requestID) {
                params['requestID'] = requestID;
            }

            let { data } = await axios.put(this.apiURL + 'emailLinks/' + emailLinkID + '/validate', params, {
                auth: {
                    username: this.projectID,
                    password: this.apiSecret
                }
            });
    
            return data;
        }
        catch (e) {
            throw new Error('Email link validation failed from EmailLinkService ' + e.message);
        }
    }
}

module.exports =  CorbadoEmailLinkService;