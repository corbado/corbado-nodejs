
class AssociationTokens {

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

    async create(loginIdentifier, loginIdentifierType, clientInfo, requestID = null) {


        if (!loginIdentifier) {
            throw new Error('loginIdentifier is required');
        }

        if (!loginIdentifierType) {
            throw new Error('loginIdentifierType is required');
        }

        const params = {
            loginIdentifer: loginIdentifier,
            loginIdentifierType: loginIdentifierType,
            clientInfo: clientInfo
        }

        if (requestID) {
            params.requestID = requestID;
        }

        return await this.#client.request('/associationTokens', 'POST', params);
    }
}

export default AssociationTokens;
