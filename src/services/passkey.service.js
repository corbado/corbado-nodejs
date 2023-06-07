const EmailLinkService = require('./emaillink.service');
const CorbadoApi = require('./CorbadoApi');

class PasskeyService {

    constructor(client, emailLinkService) {
        this.client = client;
        this.emailLinkService = emailLinkService
    }

    /**
     *
     * @param username
     * @param clientInfo
     * @param origin
     * @param requestID
     * @param credentialStatus
     * @returns {Promise<any|undefined>}
     */
    registerStart = async (username, clientInfo, origin, requestID = null, credentialStatus = null) => {
        if (!username) {
            throw new Error('Username is required');
        }

        if (!clientInfo) {
            throw new Error('ClientInfo is required');
        }

        if (!origin) {
            throw new Error('Origin is required');
        }

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

        return await this.client.request('/webauthn/register/start', 'POST', params);
    };

    /**
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
        if (!publicKeyCredential) {
            throw new Error('PublicKeyCredential is required');
        }

        if (!clientInfo) {
            throw new Error('ClientInfo is required');
        }

        if (!origin) {
            throw new Error('Origin is required');
        }

        let params = {
            publicKeyCredential: JSON.stringify(publicKeyCredential),
            clientInfo: clientInfo,
            origin: origin,
        };


        if (requestID) {
            params['requestID'] = requestID;
        }

        return await this.client.request('/webauthn/register/finish', 'POST', params);
    };

    /**
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
        return await this.emailLinkService.send(email,
            redirect,
            create,
            additionalPayload,
            clientInfo,
            true,
            requestID
        );

    }

    /**
    * Creates a Request Corbado Service to confirm tha validity of the linkID and the token that was sent to the client.
    * Can be used after the user is redirected back to the via the email link.
    *
    * @param {string} emailLinkID - is sent to the client via the email link
    * @param {object} token - is sent to the client via the email link
    *
    * @returns {object} data - the response object from the server containing the username, status and credentialID
    */
    emailLinkValidate = async (emailLinkID, token, requestID = null) => {
        return await this.emailLinkService.validate(emailLinkID, token, requestID);
    }

    /**
    * Updates the credential status
    *
    * @param {credentialID} credentialID - the credentialID to update
    * @param {status} status - the status to update to
    *
    * @returns {object} data - the response object from the server containing the new credential status
    */
    credentialUpdate = async (credentialID, status) => {
        const params = {status};

        return await this.client.request('/webauthn/credential/${credentialID}', 'PUT', params);

    }

    /**
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
        if (!username) {
            throw new Error('Username is required');
        }

        if (!clientInfo) {
            throw new Error('ClientInfo is required');
        }

        if (!origin) {
            throw new Error('Origin is required');
        }

        let params = {
            username: username,
            clientInfo: clientInfo,
            origin: origin,
        }
        if (requestID) {
            params['requestID'] = requestID;
        }

        return await this.client.request('/webauthn/authenticate/start', 'POST', params);
    }

    /**
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
        if (!publicKeyCredential) {
            throw new Error('Username is required');
        }

        if (!clientInfo) {
            throw new Error('ClientInfo is required');
        }

        if (!origin) {
            throw new Error('Origin is required');
        }

        let params = {
            publicKeyCredential: JSON.stringify(publicKeyCredential),
            clientInfo: clientInfo,
            origin: origin,
        };

        if (requestID) {
            params['requestID'] = requestID;
        }


        return await this.client.request('/webauthn/authenticate/finish', 'POST', params);
    }
}

module.exports = PasskeyService;
