// convert this file to typescript (.ts) and add types
class EmailLinks {
    client: any;
    email_templates: any;

    /**
     * Creates a new instance of the EmailLinks.
     * @param client
     * @param email_templates
     */
    constructor(client: any, email_templates: any) {
        this.client = client;
        this.email_templates = email_templates;
    }

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
    send = async (email: any, redirect: any, create: any, additionalPayload: any, clientInfo: any, passkeySignUp = false, requestID = null) => {
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
            requestID: requestID,
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
     * Creates a Request SDK Service to confirm tha validity of the linkID and the token that was sent to the client.
     * Can be used after the user is redirected back to the via the email link.
     * @param emailLinkID
     * @param token
     * @param requestID
     * @returns {Promise<*>}
     */
    validate = async (emailLinkID: string, token: any, requestID = null) => {
        if (!emailLinkID) {
            throw new Error('EmailLinkID is required');
        }

        if (!token) {
            throw new Error('Token is required');
        }

        let params = {
            token: token,
            requestID: requestID,
        }

        // if (requestID) {
        //     params['requestID'] = requestID;
        // }
        return await this.client.request('/emailLinks/' + emailLinkID + '/validate', 'PUT', params);

    }
}

export default EmailLinks;