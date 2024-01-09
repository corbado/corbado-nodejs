import { AxiosInstance } from 'axios';
import { ValidateEmailReq, ValidateEmailRsp, ValidatePhoneNumberReq, ValidatePhoneNumberRsp } from '../generated/index.js';
export interface ValidationInterface {
    validateEmail(req: ValidateEmailReq): Promise<ValidateEmailRsp>;
    validatePhoneNumber(req: ValidatePhoneNumberReq): Promise<ValidatePhoneNumberRsp>;
}
declare class Validation implements ValidationInterface {
    private client;
    constructor(axios: AxiosInstance);
    validateEmail(req: ValidateEmailReq): Promise<ValidateEmailRsp>;
    validatePhoneNumber(req: ValidatePhoneNumberReq): Promise<ValidatePhoneNumberRsp>;
}
export default Validation;
