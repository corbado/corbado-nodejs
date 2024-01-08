import { AxiosInstance } from 'axios';
import Assert, { isErrorRsp } from 'src/heplers/assert';
import Helper from 'src/heplers/helpers';
import { BaseError } from 'src/errors';
import httpStatusCodes from 'src/errors/httpStatusCodes';
import { AuthTokensApi, AuthTokenValidateReq, AuthTokenValidateRsp } from '../generated';

interface AuthTokenInterface {
  validate(req: AuthTokenValidateReq): Promise<AuthTokenValidateRsp>;
}

class AuthToken implements AuthTokenInterface {
  #api: AuthTokensApi;

  constructor(axios: AxiosInstance) {
    Assert.notNull(axios);
    this.#api = new AuthTokensApi(undefined, '', axios);
  }

  async validate(req: AuthTokenValidateReq): Promise<AuthTokenValidateRsp> {
    Assert.notNull(req);

    try {
      const validateRsp = await this.#api.authTokenValidate(req);
      const response = validateRsp.data;

      if (isErrorRsp(response)) {
        throw new BaseError(
          'ErrorRsp',
          httpStatusCodes.AUTH_RSP_ERROR.code,
          httpStatusCodes.AUTH_RSP_ERROR.description,
          httpStatusCodes.AUTH_RSP_ERROR.isOperational,
        );
      }

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw Helper.convertToServerException(error);
      }
      throw new BaseError(
        'Unknown auth token error',
        httpStatusCodes.AUTH_TOKEN_ERROR.code,
        httpStatusCodes.AUTH_TOKEN_ERROR.description,
        httpStatusCodes.AUTH_TOKEN_ERROR.isOperational,
      );
    }
  }
}

export default AuthToken;
