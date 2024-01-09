import CommonRequest from './commonRequest.js';
declare class PasswordVerifyRequest extends CommonRequest {
    data: string;
    constructor(data: string, id: string, projectId: string, action: string, requestId: string);
}
export default PasswordVerifyRequest;
