import {
    AuthTokensApi, AuthTokenValidateReq, AuthTokenValidateRsp,
} from "../entity/api";
import {AxiosInstance, AxiosResponse} from "axios";

export default class AuthToken {

    #api: AuthTokensApi

    constructor(axios: AxiosInstance) {
        this.#api = new AuthTokensApi(undefined, '', axios)
    }

    Validate(
        req: AuthTokenValidateReq
    ) :Promise<AxiosResponse<AuthTokenValidateRsp>> {
        return this.#api.authTokenValidate(
            req,
        )
    }

}
