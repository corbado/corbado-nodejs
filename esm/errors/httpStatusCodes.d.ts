type HttpStatusCode = {
    description: string;
    code: number;
    isOperational: boolean;
};
declare const httpStatusCodes: {
    [x: string]: HttpStatusCode;
};
export default httpStatusCodes;
