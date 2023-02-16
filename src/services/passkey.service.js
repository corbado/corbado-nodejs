const EmailLinkService = require('./emaillink.service');
const CorbadoApi = require('./CorbadoApi');

class PasskeyService {

    constructor(projectID, apiSecret, apiURL, email_templates) {

        this.corbadoApi = new CorbadoApi(projectID, apiSecret, apiURL);
        this.emailLinkService = new EmailLinkService(projectID, apiSecret, apiURL, email_templates);
    }

    /*
    * Creates a Request to Corbado Service to initialize the WebAuthn registration process
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
    registerStart = async (username, clientInfo, origin, requestID = null, credentialStatus = null) => {

        let params = {
            username: username,
            clientInfo: clientInfo,
            origin: origin,
            credentialStatus: 'active',
        }

        if (requestID) {
            params['requestID'] = requestID;
        }

        if (credentialStatus) {
            params['credentialStatus'] = credentialStatus;
        }

        return await this.corbadoApi.request('webauthn/register/start', 'POST', params);
    };

    /*
    * Creates a Request Corbado Service to finilize the WebAuthn registration process
    *
    * @param {string} publicKeyCredential - can be obtained from the browser WebAuthn create function by passing the publicKeyCredentialOptions
    * @param {object} clientInfo - the clientInfo object containing the browser and device information {remoteAddress, userAgent, origin}
    * @param {string} clientInfo.remoteAddress - IP of the user
    * @param {string} clientInfo.userAgent - User Agent of the user
    * @param {string} clientInfo.origin - Origin of the request
    * @param {string} requestID - the requestID, is set automatically if not provided
    *
    * @returns {object} - the response object from the server containing the username, status and credentialID
    */
    registerFinish = async (publicKeyCredential, clientInfo, origin, requestID = null) => {
        let params = {
            publicKeyCredential: JSON.stringify(publicKeyCredential),
            clientInfo: clientInfo,
            origin: origin,
        };


        if (requestID) {
            params['requestID'] = requestID;
        }

        return await this.corbadoApi.request('webauthn/register/finish', 'POST', params);
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
    emailLinkSend = async (email, redirect, create = true, additionalPayload, clientInfo, requestID = null) => {
        let params = {
            email: email,
            redirect: redirect,
            create: create,
            clientInfo: clientInfo,
            additionalPayload: additionalPayload,
        };

        try {
            let data = await this.emailLinkService.emailLinkSend(
                params.email,
                params.redirect,
                params.create,
                params.additionalPayload,
                params.clientInfo,
                true,
                requestID
            );
            return data;
        } catch (e) {
            throw new Error('Webauthn sending confirmation email link failed : ' + e.message);
        }
    }

    /*
    * Creates a Request Corbado Service to confirm tha validity of the linkID and the token that was sent to the client.
    * Can be used after the user is redirected back to the via the email link.
    *
    * @param {string} emailLinkID - is sent to the client via the email link
    * @param {object} token - is sent to the client via the email link
    *
    * @returns {object} data - the response object from the server containing the username, status and credentialID
    */
    emailLinkValidate = async (emailLinkID, token, requestID = null) => {
        try {
            let data = await this.emailLinkService.emailLinkValidate(emailLinkID, token, requestID);
            return data;
        } catch (e) {
            throw new Error('Webauthn email link validation failed : ' + e.message);
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
    credentialUpdate = async (credentialID, status) => {
        const params = {status};

        return await this.corbadoApi.request('webauthn/credential/${credentialID}', 'PUT', params);

    }

    /*
    * Creates a Request to Corbado Service to initialize the WebAuthn login process
    *
    * @param {string} username - the email of the user
    * @param {object} clientInfo - the clientInfo object containing the browser and device information {remoteAddress, userAgent, origin}
    * @param {string} clientInfo.remoteAddress - IP of the user
    * @param {string} clientInfo.userAgent - User Agent of the user
    * @param {string} clientInfo.origin - Origin of the request
    *
    * @returns {object} data - the response from the server containing the publicKeyCredentialOptions
    * @returns {object} data.publicKeyCredentialOptions - the publicKeyCredentialOptions object is needed to initialize the WebAuthn registration process from the client side
    */
    authenticateStart = async (username, clientInfo, origin, requestID = null) => {
        let params = {
            username: username,
            clientInfo: clientInfo,
            origin: origin,
        }
        if (requestID) {
            params['requestID'] = requestID;
        }

        return await this.corbadoApi.request('webauthn/authenticate/start', 'POST', params);
    }


    /*
    * Creates a Request to Corbado Service to finilize the WebAuthn login process
    *
    * @param {string} publicKeyCredential - can be obtained from the browser WebAuthn create function by passing the publicKeyCredentialOptions
    * @param {object} clientInfo - the clientInfo object containing the browser and device information {remoteAddress, userAgent, origin}
    * @param {string} clientInfo.remoteAddress - IP of the user
    * @param {string} clientInfo.userAgent - User Agent of the user
    * @param {string} clientInfo.origin - Origin of the request
    *
    * @param {string} requestID - the requestID, is set automatically if not provided
    *
    * @returns {object} data - the response object from the server containing the username, status and creadentialID
    */
    authenticateFinish = async (publicKeyCredential, clientInfo, origin, requestID = null) => {
        let params = {
            publicKeyCredential: JSON.stringify(publicKeyCredential),
            clientInfo: clientInfo,
            origin: origin,
        };

        if (requestID) {
            params['requestID'] = requestID;
        }


        return await this.corbadoApi.request('webauthn/authenticate/finish', 'POST', params);
    }
}

module.exports = PasskeyService;
