declare class Passkeys {
    client: any;
    emailLinkService: any;
    constructor(client: any, emailLinkService: any);
    /**
     * Start the WebAuthn register flow.
     * @param username
     * @param clientInfo
     * @param origin
     * @param requestID
     * @param credentialStatus
     * @returns {Promise<*>}
     */
    registerStart: (username: any, clientInfo: any, origin: any, requestID?: null, credentialStatus?: null) => Promise<any>;
    /**
     * Finishes the WebAuthn register flow.
     * @param publicKeyCredential
     * @param clientInfo
     * @param origin
     * @param requestID
     * @returns {Promise<*>}
     */
    registerFinish: (publicKeyCredential: any, clientInfo: any, origin: any, requestID?: null) => Promise<any>;
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
    emailLinkSend: (email: any, redirect: any, create: boolean | undefined, additionalPayload: any, clientInfo: any, requestID?: null) => Promise<any>;
    /**
     * Validate an email magic link
     * @param emailLinkID
     * @param token
     * @param requestID
     * @returns {Promise<*>}
     */
    emailLinkValidate: (emailLinkID: any, token: any, requestID?: null) => Promise<any>;
    /**
     * Update WebAuthn credentials' state
     * @param credentialID
     * @param status
     * @returns {Promise<*>}
     */
    credentialUpdate: (credentialID: any, status: any) => Promise<any>;
    /**
     * Start the WebAuthn authentication flow.
     * @param username
     * @param clientInfo
     * @param origin
     * @param requestID
     * @returns {Promise<*>}
     */
    authenticateStart: (username: any, clientInfo: any, origin: any, requestID?: null) => Promise<any>;
    /**
     * Finish the WebAuthn authentication flow.
     * @param publicKeyCredential
     * @param clientInfo
     * @param origin
     * @param requestID
     * @returns {Promise<*>}
     */
    authenticateFinish: (publicKeyCredential: any, clientInfo: any, origin: any, requestID?: null) => Promise<any>;
}
export default Passkeys;
