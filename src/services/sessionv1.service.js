
class SessionV1 {

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
     * Verifies a session token by sending a request to Corbado.
     * @param corbadoSessionToken
     * @param clientInfo
     * @param requestID
     * @returns {Promise<*>}
     */

    async verify(corbadoSessionToken, clientInfo, requestID = null) {


        if (!corbadoSessionToken) {
            throw new Error('SessionToken is required');
        }

        const params = {
            token: corbadoSessionToken,
            clientInfo: clientInfo
        }

        if (requestID) {
            params.requestID = requestID;
        }

        return await this.#client.request('/sessions/verify', 'POST', params);
    }
}

module.exports = SessionV1;
