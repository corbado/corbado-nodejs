import { AxiosInstance, AxiosResponse } from 'axios';
import { UserApi, UserListRsp, UserUpdateReq, UserUpdateRsp } from '../entity/api';

export default class User {
  #api: UserApi;

  constructor(axios: AxiosInstance) {
    this.#api = new UserApi(undefined, '', axios);
  }

  List(
    remoteAddress?: string,
    userAgent?: string,
    sort?: string,
    filter?: Array<string>,
    page?: number,
    pageSize?: number,
  ): Promise<AxiosResponse<UserListRsp>> {
    return this.#api.userList(remoteAddress, userAgent, sort, filter, page, pageSize);
  }

  Update(userID: string, req: UserUpdateReq): Promise<AxiosResponse<UserUpdateRsp>> {
    return this.#api.userUpdate(userID, req);
  }
}
