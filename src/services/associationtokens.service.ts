// convert this file to typescript (.ts) and add types

export type ClientInfoType = {
    remoteAddress: string,
    userAgent: string,
}

export type ClientType = {
    request: (
        url: string,
        method: 'POST' | 'GET' | 'PUT' | 'DELETE', //Only POST was used in the original code below. Are others necessary?
        params: {
            loginIdentifier: string;
            loginIdentifierType: string;
            clientInfo: ClientInfoType;
            requestID: string | null;
        }
    ) => Promise<any>
};

class AssociationTokens {
    #client: ClientType

    constructor(client: ClientType) {
        if (!client) {
            throw new Error('Invalid argument(s)');
        }
        this.#client = client;

    }

    async create(loginIdentifier: string, loginIdentifierType: string, clientInfo: ClientInfoType, requestID: string | null) {

        if (!loginIdentifier) {
            throw new Error('loginIdentifier is required');
        }

        if (!loginIdentifierType) {
            throw new Error('loginIdentifierType is required');
        }

        const params = {
            loginIdentifier,
            loginIdentifierType,
            clientInfo,
            requestID
        }

        return await this.#client.request('/associationTokens', 'POST', params);
    }
}

export default AssociationTokens;
