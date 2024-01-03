declare class CorbadoApiError extends Error {
    httpStatusCode: any;
    statusText: any;
    method: any;
    url: any;
    data: any;
    constructor(httpStatusCode: any, statusText: any, method: any, url: any, data: any);
}
export default CorbadoApiError;
