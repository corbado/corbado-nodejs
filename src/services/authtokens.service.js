
class AuthTokens {

    #client;

    /**
     *
     * @param client
     */
    constructor(client) {
        if (!client) {
            throw new Error('Invalid argument(s)');
        }
        this.#client = client;

    }

    /**
     * Verifies a session token by sending a request to SDK.
     * @param authToken
     * @param clientInfo
     * @param requestID
     * @returns {Promise<*>}
     */

    async validate(authToken, clientInfo, requestID = null) {


        if (!authToken) {
            throw new Error('authToken is required');
        }

        const params = {
            token: authToken,
            clientInfo: clientInfo
        }

        if (requestID) {
            params.requestID = requestID;
        }

        return await this.#client.request('/sessions/verify', 'POST', params); // path will be renamed
    }
}

export default AuthTokens;
