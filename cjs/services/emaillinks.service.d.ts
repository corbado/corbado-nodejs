declare class EmailLinks {
    client: any;
    email_templates: any;
    /**
     * Creates a new instance of the EmailLinks.
     * @param client
     * @param email_templates
     */
    constructor(client: any, email_templates: any);
    /**
     * Send an email magic link
     * @param email
     * @param redirect
     * @param create
     * @param additionalPayload
     * @param clientInfo
     * @param passkeySignUp
     * @param requestID
     * @returns {Promise<*>}
     */
    send: (email: any, redirect: any, create: any, additionalPayload: any, clientInfo: any, passkeySignUp?: boolean, requestID?: null) => Promise<any>;
    /**
     * Creates a Request SDK Service to confirm tha validity of the linkID and the token that was sent to the client.
     * Can be used after the user is redirected back to the via the email link.
     * @param emailLinkID
     * @param token
     * @param requestID
     * @returns {Promise<*>}
     */
    validate: (emailLinkID: string, token: any, requestID?: null) => Promise<any>;
}
export default EmailLinks;
