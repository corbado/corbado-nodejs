class Passkeys {

    constructor(client, emailLinkService) {
        this.client = client;
        this.emailLinkService = emailLinkService
    }

    /**
     * Start the WebAuthn register flow.
     * @param username
     * @param clientInfo
     * @param origin
     * @param requestID
     * @param credentialStatus
     * @returns {Promise<*>}
     */
    registerStart = async (username, clientInfo, origin, requestID = null, credentialStatus = null) => {
        if (!username) {
            throw new Error('Username is required');
        }

        if (!clientInfo) {
            throw new Error("ClientInfo is required");
        }

        if (!origin) {
            throw new Error("Origin is required");
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
    }
    ;

    /**
     * Finishes the WebAuthn register flow.
     * @param publicKeyCredential
     * @param clientInfo
     * @param origin
     * @param requestID
     * @returns {Promise<*>}
     */
    registerFinish = async (
        publicKeyCredential,
        clientInfo,
        origin,
        requestID = null
    ) => {
        if (!publicKeyCredential) {
            throw new Error("PublicKeyCredential is required");
        }

        if (!clientInfo) {
            throw new Error("ClientInfo is required");
        }

        if (!origin) {
            throw new Error("Origin is required");
        }

        return await this.client.request('/webauthn/register/finish', 'POST', params);
    };

    /**
     * Sends an email magic link.
     * @param email
     * @param redirect
     * @param create
     * @param additionalPayload
     * @param clientInfo
     * @param requestID
     * @returns {Promise<*>}
     */
    emailLinkSend = async (
        email,
        redirect,
        create = true,
        additionalPayload,
        clientInfo,
        requestID = null
    ) => {
        return await this.emailLinkService.send(
            email,
            redirect,
            create,
            additionalPayload,
            clientInfo,
            true,
            requestID
        );
    };

    /**
     * Validate an email magic link
     * @param emailLinkID
     * @param token
     * @param requestID
     * @returns {Promise<*>}
     */
    emailLinkValidate = async (emailLinkID, token, requestID = null) => {
        return await this.emailLinkService.validate(emailLinkID, token, requestID);
    };


    /**
     * Update WebAuthn credentials' state
     * @param credentialID
     * @param status
     * @returns {Promise<*>}
     */
    credentialUpdate = async (credentialID, status) => {
        const params = {status};

        return await this.client.request('/webauthn/credential/${credentialID}', 'PUT', params);

    }

    /**
     * Start the WebAuthn authentication flow.
     * @param username
     * @param clientInfo
     * @param origin
     * @param requestID
     * @returns {Promise<*>}
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
     * Finish the WebAuthn authentication flow.
     * @param publicKeyCredential
     * @param clientInfo
     * @param origin
     * @param requestID
     * @returns {Promise<*>}
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

export default Passkeys;
