import { AxiosInstance } from 'axios';
import { EmailLinkGetRsp, EmailLinkSendReq, EmailLinkSendRsp, EmailLinksValidateReq, EmailLinkValidateRsp } from '../generated/index.js';
export interface EmailLinkInterface {
    send(req: EmailLinkSendReq): Promise<EmailLinkSendRsp>;
    validate(emailLinkID: string, req: EmailLinksValidateReq): Promise<EmailLinkValidateRsp>;
    get(emailLinkID: string): Promise<EmailLinkGetRsp>;
}
declare class EmailLink implements EmailLinkInterface {
    private client;
    constructor(axios: AxiosInstance);
    send(req: EmailLinkSendReq): Promise<EmailLinkSendRsp>;
    validate(emailLinkID: string, req: EmailLinksValidateReq): Promise<EmailLinkValidateRsp>;
    get(emailLinkID: string): Promise<EmailLinkGetRsp>;
}
export default EmailLink;
