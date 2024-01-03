"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// convert this file to typescript (.ts) and add types
class Passkeys {
    constructor(client, emailLinkService) {
        /**
         * Start the WebAuthn register flow.
         * @param username
         * @param clientInfo
         * @param origin
         * @param requestID
         * @param credentialStatus
         * @returns {Promise<*>}
         */
        this.registerStart = async (username, clientInfo, origin, requestID = null, credentialStatus = null) => {
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
                requestID: requestID
            };
            // if (requestID) {
            //     params['requestID'] = requestID;
            // }
            if (credentialStatus) {
                params['credentialStatus'] = credentialStatus;
            }
            return await this.client.request('/webauthn/register/start', 'POST', params);
        };
        /**
         * Finishes the WebAuthn register flow.
         * @param publicKeyCredential
         * @param clientInfo
         * @param origin
         * @param requestID
         * @returns {Promise<*>}
         */
        this.registerFinish = async (publicKeyCredential, clientInfo, origin, requestID = null) => {
            if (!publicKeyCredential) {
                throw new Error("PublicKeyCredential is required");
            }
            if (!clientInfo) {
                throw new Error("ClientInfo is required");
            }
            if (!origin) {
                throw new Error("Origin is required");
            }
            let params = {
                publicKeyCredential: publicKeyCredential,
                clientInfo: clientInfo,
                origin: origin,
                requestID: requestID
            };
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
        this.emailLinkSend = async (email, redirect, create = true, additionalPayload, clientInfo, requestID = null) => {
            return await this.emailLinkService.send(email, redirect, create, additionalPayload, clientInfo, true, requestID);
        };
        /**
         * Validate an email magic link
         * @param emailLinkID
         * @param token
         * @param requestID
         * @returns {Promise<*>}
         */
        this.emailLinkValidate = async (emailLinkID, token, requestID = null) => {
            return await this.emailLinkService.validate(emailLinkID, token, requestID);
        };
        /**
         * Update WebAuthn credentials' state
         * @param credentialID
         * @param status
         * @returns {Promise<*>}
         */
        this.credentialUpdate = async (credentialID, status) => {
            const params = { status };
            return await this.client.request('/webauthn/credential/${credentialID}', 'PUT', params);
        };
        /**
         * Start the WebAuthn authentication flow.
         * @param username
         * @param clientInfo
         * @param origin
         * @param requestID
         * @returns {Promise<*>}
         */
        this.authenticateStart = async (username, clientInfo, origin, requestID = null) => {
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
                requestID: requestID
            };
            // if (requestID) {
            //     params['requestID'] = requestID;
            // }
            return await this.client.request('/webauthn/authenticate/start', 'POST', params);
        };
        /**
         * Finish the WebAuthn authentication flow.
         * @param publicKeyCredential
         * @param clientInfo
         * @param origin
         * @param requestID
         * @returns {Promise<*>}
         */
        this.authenticateFinish = async (publicKeyCredential, clientInfo, origin, requestID = null) => {
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
                requestID: requestID
            };
            // if (requestID) {
            //     params['requestID'] = requestID;
            // }
            return await this.client.request('/webauthn/authenticate/finish', 'POST', params);
        };
        this.client = client;
        this.emailLinkService = emailLinkService;
    }
}
exports.default = Passkeys;
//# sourceMappingURL=passkeys.service.js.map