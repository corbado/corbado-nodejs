import { AxiosInstance, AxiosResponse } from 'axios';
import Assert from 'src/heplers/assert';
import Helper from 'src/heplers/helpers';
import { ErrorRsp } from 'src/generated/api';
import { BaseError } from 'src/exceptions';
import { AuthTokensApi, AuthTokenValidateReq, AuthTokenValidateRsp } from '../generated';

function isErrorRsp(obj: unknown): obj is ErrorRsp {
  return typeof obj === 'object' && obj !== null && 'error' in obj && typeof (obj as ErrorRsp).error === 'string';
}

class AuthToken {
  #api: AuthTokensApi;

  constructor(axios: AxiosInstance) {
    Assert.notNull(axios);
    this.#api = new AuthTokensApi(undefined, '', axios);
  }

  async validate(req: AuthTokenValidateReq): Promise<AxiosResponse<AuthTokenValidateRsp>> {
    Assert.notNull(req);
    let response;

    try {
      response = await this.#api.authTokenValidate(req);
    } catch (error) {
      if (error instanceof Error) {
        throw Helper.convertToServerException(error);
      }
      throw new BaseError('Unknown auth token error', 500, 'Unknown auth error response received', true);
    }

    if (isErrorRsp(response)) {
      throw new BaseError('ErrorRsp', 500, 'Error response received', true);
    }

    return response;
  }
}

export default AuthToken;
