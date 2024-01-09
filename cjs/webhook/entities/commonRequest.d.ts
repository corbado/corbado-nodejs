declare class CommonRequest {
    id: string;
    projectID: string;
    action: string;
    /**
     * @deprecated
     */
    requestID: string;
    constructor(id: string, projectID: string, action: string, requestID: string);
}
export default CommonRequest;
