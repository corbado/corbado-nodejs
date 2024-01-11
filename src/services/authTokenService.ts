import { AxiosInstance } from 'axios';
import { Assert, Helper, isErrorRsp } from '../heplers/index.js';
import { BaseError, httpStatusCodes } from '../errors/index.js';
import { AuthTokensApi, AuthTokenValidateReq, AuthTokenValidateRsp } from '../generated/index.js';

export interface AuthTokenInterface {
  validate(req: AuthTokenValidateReq): Promise<AuthTokenValidateRsp>;
}

class AuthToken implements AuthTokenInterface {
  private client: AuthTokensApi;

  constructor(axios: AxiosInstance) {
    Assert.notNull(axios, 'AuthToken Axios instance must not be null');
    this.client = new AuthTokensApi(undefined, '', axios);
  }

  async validate(req: AuthTokenValidateReq): Promise<AuthTokenValidateRsp> {
    Assert.notNull(req, 'AuthToken.validate() param must not be null');

    try {
      const validateRsp = await this.client.authTokenValidate(req);
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
