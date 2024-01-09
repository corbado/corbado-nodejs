import { AuthMethodsDataResponseStatusEnum } from './authMethodsDataResponse.js';
import CommonResponse from './commonResponse.js';
declare class AuthMethodsResponse extends CommonResponse {
    data: AuthMethodsDataResponseStatusEnum;
    constructor(data: AuthMethodsDataResponseStatusEnum, responseId: string);
}
export default AuthMethodsResponse;
