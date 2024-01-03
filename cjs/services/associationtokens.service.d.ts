export type ClientInfoType = {
    remoteAddress: string;
    userAgent: string;
};
export type ClientType = {
    request: (url: string, method: 'POST' | 'GET' | 'PUT' | 'DELETE', //Only POST was used in the original code below. Are others necessary?
    params: {
        loginIdentifier: string;
        loginIdentifierType: string;
        clientInfo: ClientInfoType;
        requestID: string | null;
    }) => Promise<any>;
};
declare class AssociationTokens {
    #private;
    constructor(client: ClientType);
    create(loginIdentifier: string, loginIdentifierType: string, clientInfo: ClientInfoType, requestID: string | null): Promise<any>;
}
export default AssociationTokens;
