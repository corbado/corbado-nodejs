const CorbadoApi = require('./CorbadoApi');

class EmailLinkService {

    /**
     * Creates a new instance of the EmailLinkService.
     * @param {string} projectID - The project ID for the Corbado service.
     * @param {string} apiSecret - The API secret for the Corbado service.
     * @param {string} apiURL - The base URL for the Corbado service API.
     * @param {object} email_templates - An object containing the names of the email templates to use.
     */
    constructor(client, email_templates) {
        this.client = client;
        this.email_templates = email_templates;
    }

    /**
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
    send = async (email, redirect, create, additionalPayload, clientInfo, passkeySignUp = false, requestID = null) => {
        if (!email) {
            throw new Error('Email is required');
        }

        if (!redirect) {
            throw new Error('Redirect is required');
        }

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

        return await this.client.request('/emailLinks', 'POST', params);
    };

    /**
    * Creates a Request Corbado Service to confirm tha validity of the linkID and the token that was sent to the client.
    * Can be used after the user is redirected back to the via the email link.
    *
    * @param {string} emailLinkID - is sent to the client via the email link
    * @param {object} token - is sent to the client via the email link
    *
    * @returns {object} data - the response object from the server containing the username, status and creadentialID
    */
    validate = async (emailLinkID, token, requestID = null) => {
        if (!emailLinkID) {
            throw new Error('EmailLinkID is required');
        }

        if (!token) {
            throw new Error('Token is required');
        }

        let params = {
            token: token,
        }

        if (requestID) {
            params['requestID'] = requestID;
        }
        return await this.client.request('/emailLinks/' + emailLinkID + '/validate', 'PUT', params);

    }
}

module.exports = EmailLinkService;
