import { AxiosInstance, AxiosResponse } from 'axios';
import { AuthTokensApi, AuthTokenValidateReq, AuthTokenValidateRsp } from '../../generated';

export default class AuthToken {
  #api: AuthTokensApi;

  constructor(axios: AxiosInstance) {
    this.#api = new AuthTokensApi(undefined, '', axios);
  }

  Validate(req: AuthTokenValidateReq): Promise<AxiosResponse<AuthTokenValidateRsp>> {
    return this.#api.authTokenValidate(req);
  }
}
