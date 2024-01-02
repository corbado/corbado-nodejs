// convert this file to typescript (.ts) and add types
const ALLOWED_METHOD = "POST";

/**
 * Checks authentication, the method and sets a header
 *
 */
function webhookMiddleware(webhookUsername: string, webhookPassword: string) {
    return function (req: { headers: { authorization: string }, method: string }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any; }; json: { (arg0: { message: string; }): any; new(): any; }; }; setHeader: (arg0: string, arg1: string) => void; }, next: () => void) {
        const { headers, method } = req;

        // Check if request has been made with POST. For SDK webhooks
        // only POST is allowed/used.
        if (method !== ALLOWED_METHOD) {
            return res.status(405).send("Method Not Allowed");
        }

        // Check for basic auth header
        const authHeader = headers.authorization;
        if (!authHeader || !authHeader.startsWith("Basic ")) {
            return res.status(401).json({ message: "Missing Authorization Header" });
        }

        // Verify auth credentials
        const encodedCredentials = authHeader.replace("Basic ", "");
        const decodedCredentials = Buffer.from(
            encodedCredentials,
            "base64"
        ).toString();
        const [username, password] = decodedCredentials.split(":");
        if (username !== webhookUsername || password !== webhookPassword) {
            return res
                .status(401)
                .json({ message: "Invalid Authentication Credentials" });
        }

        // prepare response header
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        next();
    };
}

export default webhookMiddleware;
