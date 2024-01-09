import { AxiosInstance } from 'axios';
import { SmsCodeSendReq, SmsCodeSendRsp, SmsCodeValidateReq, SmsCodeValidateRsp } from '../generated/index.js';
export interface SmsOTPInterface {
    send(req: SmsCodeSendReq): Promise<SmsCodeSendRsp>;
    validate(id: string, req: SmsCodeValidateReq): Promise<SmsCodeValidateRsp>;
}
declare class SmsOTP implements SmsOTPInterface {
    private client;
    constructor(axios: AxiosInstance);
    send(req: SmsCodeSendReq): Promise<SmsCodeSendRsp>;
    validate(id: string, req: SmsCodeValidateReq): Promise<SmsCodeValidateRsp>;
}
export default SmsOTP;
