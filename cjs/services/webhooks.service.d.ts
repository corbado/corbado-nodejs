declare class Webhooks {
    #private;
    WEBHOOK_ACTION: {
        AUTH_METHODS: string;
        PASSWORD_VERIFY: string;
    };
    ALLOWED_STATUS: string[];
    /**
     *
     * @param version
     * @param shortSessionCookieName
     * @param issuer
     * @param jwksURI
     * @param cacheMaxAge
     * @param client
     */
    constructor(webhookMiddleware: (req: {
        headers: {
            authorization: string;
        };
        method: string;
    }, res: {
        status: (arg0: number) => {
            (): any;
            new (): any;
            send: {
                (arg0: string): any;
                new (): any;
            };
            json: {
                (arg0: {
                    message: string;
                }): any;
                new (): any;
            };
        };
        setHeader: (arg0: string, arg1: string) => void;
    }, next: () => void) => any);
    /**
     * Returns webhook action (by reading the header field X-SDK-Action)
     *
     * @return {Object}
     */
    getAction(req: {
        get: (arg0: string) => string;
    }): string;
    /**
     * Returns auth methods request model
     *
     * @param {Object} req
     * @return {object}
     */
    getAuthMethodsRequest(req: {
        body: any;
    }): {
        id: any;
        projectID: any;
        action: any;
        data: {
            username: any;
        };
    };
    /**
     * Sends auth methods response
     *
     * @param {string} status
     * @param {Object} res
     * @param {string} responseID
     */
    getAuthMethodsResponse(status: string, responseID?: string): {
        responseID: string;
        data: {
            status: string;
        };
    };
    /**
     * Returns password verify request model
     *
     * @param {Object} req
     * @return {Object}
     */
    getPasswordVerifyRequest(req: {
        body: any;
    }): {
        id: any;
        projectID: any;
        action: string;
        data: {
            username: any;
            password: any;
        };
    };
    /**
     * Sends password verify response
     *
     * @param {boolean} success
     * @param {Object} res
     * @param {string} responseID
     */
    getPasswordVerifyResponse(success: any, responseID?: string): {
        responseID: string;
        data: {
            success: any;
        };
    };
    get middleware(): (req: {
        headers: {
            authorization: string;
        };
        method: string;
    }, res: {
        status: (arg0: number) => {
            (): any;
            new (): any;
            send: {
                (arg0: string): any;
                new (): any;
            };
            json: {
                (arg0: {
                    message: string;
                }): any;
                new (): any;
            };
        };
        setHeader: (arg0: string, arg1: string) => void;
    }, next: () => void) => any;
}
export default Webhooks;
