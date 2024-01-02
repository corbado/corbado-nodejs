import { ClientInfoType } from "./associationtokens.service";

// convert this file to typescript (.ts) and add types
type AuthTokensClientType = {
    request: (path: string,
        method: 'POST' | 'GET' | 'PUT' | 'DELETE', //Only POST was used in the original code below. Are others necessary?
        params: {
            corbadoAuthToken: string;
            clientInfo: ClientInfoType;
            requestID: string | null;
        }) => Promise<any>
}

class AuthTokens {

    #client: AuthTokensClientType;

    /**
     *
     * @param client
     */
    constructor(client: AuthTokensClientType) {
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

    async validate(corbadoAuthToken: string, clientInfo: ClientInfoType, requestID: string | null = null) {


        if (!corbadoAuthToken) {
            throw new Error('corbadoAuthToken is required');
        }

        const params = {
            corbadoAuthToken,
            clientInfo,
            requestID
        }

        return await this.#client.request('/authTokens/validate', 'POST', params); // path will be renamed
    }
}

export default AuthTokens;
