/**
 * Checks authentication, the method and sets a header
 *
 */
declare function webhookMiddleware(webhookUsername: string, webhookPassword: string): (req: {
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
export default webhookMiddleware;
