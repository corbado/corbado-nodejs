export declare const utils: {
    getClientInfo: (req: {
        get?: any;
        headers?: {
            [x: string]: any;
        } | undefined;
        socket?: {
            remoteAddress: any;
        } | undefined;
    }) => {
        remoteAddress: any;
        userAgent: any;
    };
};
