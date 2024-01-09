import { AxiosInstance } from 'axios';
import { EmailCodeSendReq, EmailCodeSendRsp, EmailCodeValidateReq, EmailCodeValidateRsp } from '../generated/index.js';
export interface EmailOTPInterface {
    send(req: EmailCodeSendReq): Promise<EmailCodeSendRsp>;
    validate(id: string, req: EmailCodeValidateReq): Promise<EmailCodeValidateRsp>;
}
declare class EmailOTP implements EmailOTPInterface {
    private client;
    constructor(axios: AxiosInstance);
    send(req: EmailCodeSendReq): Promise<EmailCodeSendRsp>;
    validate(id: string, req: EmailCodeValidateReq): Promise<EmailCodeValidateRsp>;
}
export default EmailOTP;
