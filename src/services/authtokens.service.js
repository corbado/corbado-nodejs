
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

    async validate(corbadoAuthToken, clientInfo, requestID = null) {


        if (!corbadoAuthToken) {
            throw new Error('corbadoAuthToken is required');
        }

        const params = {
            token: corbadoAuthToken,
            clientInfo: clientInfo
        }

        if (requestID) {
            params.requestID = requestID;
        }

        return await this.#client.request('/authTokens/validate', 'POST', params); // path will be renamed
    }
}

export default AuthTokens;
