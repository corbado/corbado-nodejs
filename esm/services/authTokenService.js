import { Assert, Helper, isErrorRsp } from '../heplers/index.js';
import { BaseError, httpStatusCodes } from '../errors/index.js';
import { AuthTokensApi } from '../generated/index.js';
class AuthToken {
    constructor(axios) {
        Assert.notNull(axios);
        this.client = new AuthTokensApi(undefined, '', axios);
    }
    async validate(req) {
        Assert.notNull(req);
        try {
            const validateRsp = await this.client.authTokenValidate(req);
            const response = validateRsp.data;
            if (isErrorRsp(response)) {
                throw new BaseError('ErrorRsp', httpStatusCodes.AUTH_RSP_ERROR.code, httpStatusCodes.AUTH_RSP_ERROR.description, httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return response;
        }
        catch (error) {
            if (error instanceof Error) {
                throw Helper.convertToServerException(error);
            }
            throw new BaseError('Unknown auth token error', httpStatusCodes.AUTH_TOKEN_ERROR.code, httpStatusCodes.AUTH_TOKEN_ERROR.description, httpStatusCodes.AUTH_TOKEN_ERROR.isOperational);
        }
    }
}
export default AuthToken;
//# sourceMappingURL=authTokenService.js.map