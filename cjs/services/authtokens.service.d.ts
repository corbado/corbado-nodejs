import { ClientInfoType } from "./associationtokens.service";
type AuthTokensClientType = {
    request: (path: string, method: 'POST' | 'GET' | 'PUT' | 'DELETE', //Only POST was used in the original code below. Are others necessary?
    params: {
        corbadoAuthToken: string;
        clientInfo: ClientInfoType;
        requestID: string | null;
    }) => Promise<any>;
};
declare class AuthTokens {
    #private;
    /**
     *
     * @param client
     */
    constructor(client: AuthTokensClientType);
    /**
     * Verifies a session token by sending a request to SDK.
     * @param authToken
     * @param clientInfo
     * @param requestID
     * @returns {Promise<*>}
     */
    validate(corbadoAuthToken: string, clientInfo: ClientInfoType, requestID?: string | null): Promise<any>;
}
export default AuthTokens;
