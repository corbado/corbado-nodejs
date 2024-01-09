import CommonResponse from './commonResponse.js';
declare class PasswordVerifyResponse extends CommonResponse {
    data: string;
    constructor(data: string, responseId: string);
}
export default PasswordVerifyResponse;
