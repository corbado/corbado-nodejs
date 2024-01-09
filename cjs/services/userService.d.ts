import { AxiosInstance } from 'axios';
import { GenericRsp, UserCreateReq, UserCreateRsp, UserDeleteReq, UserGetRsp, UserListRsp } from '../generated/index.js';
export interface UserInterface {
    create(req: UserCreateReq): Promise<UserCreateRsp>;
    delete(id: string, req: UserDeleteReq): Promise<GenericRsp>;
    get(id: string, remoteAddr?: string, userAgent?: string): Promise<UserGetRsp>;
    list(remoteAddr?: string, userAgent?: string, sort?: string, filter?: string[], page?: number, pageSize?: number): Promise<UserListRsp>;
}
declare class User implements UserInterface {
    private client;
    constructor(axios: AxiosInstance);
    create(req: UserCreateReq): Promise<UserCreateRsp>;
    delete(id: string, req: UserDeleteReq): Promise<GenericRsp>;
    get(id: string, remoteAddr?: string, userAgent?: string): Promise<UserGetRsp>;
    list(remoteAddr?: string, userAgent?: string, sort?: string, filter?: never[], page?: number, pageSize?: number): Promise<UserListRsp>;
}
export default User;
