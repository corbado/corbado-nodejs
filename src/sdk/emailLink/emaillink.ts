import {
    EmailLinkGetRsp, EmailLinkSendReq, EmailLinkSendRsp, EmailLinksValidateReq, EmailLinkValidateRsp, EmailMagicLinksApi,
} from "../entity/api";
import {AxiosInstance, AxiosResponse} from "axios";

export default class EmailLink {

    #api: EmailMagicLinksApi

    constructor(axios: AxiosInstance) {
        this.#api = new EmailMagicLinksApi(undefined, '', axios)
    }

    Send(
        req: EmailLinkSendReq
    ) :Promise<AxiosResponse<EmailLinkSendRsp>> {
        return this.#api.emailLinkSend(
            req,
        )
    }

    Validate(
        emailLinkID: string,
        req: EmailLinksValidateReq
    ) :Promise<AxiosResponse<EmailLinkValidateRsp>> {
        return this.#api.emailLinkValidate(
            emailLinkID, req,
        )
    }

    Get(
        emailLinkID: string,
    ) :Promise<AxiosResponse<EmailLinkGetRsp>> {
        return this.#api.emailLinkGet(
            emailLinkID,
        )
    }

}
