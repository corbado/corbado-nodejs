import { AxiosInstance } from 'axios';
import { AuthTokenValidateReq, AuthTokenValidateRsp } from '../generated/index.js';
export interface AuthTokenInterface {
    validate(req: AuthTokenValidateReq): Promise<AuthTokenValidateRsp>;
}
declare class AuthToken implements AuthTokenInterface {
    private client;
    constructor(axios: AxiosInstance);
    validate(req: AuthTokenValidateReq): Promise<AuthTokenValidateRsp>;
}
export default AuthToken;
