import httpStatusCodes from 'src/errors/httpStatusCodes';
import { BaseError } from 'src/errors';
import Assert, { isErrorRsp } from 'src/heplers/assert';
import Helper from 'src/heplers/helpers';
import { AxiosInstance } from 'axios';
import {
  GenericRsp,
  UserApi,
  UserCreateReq,
  UserCreateRsp,
  UserDeleteReq,
  UserGetRsp,
  UserListRsp,
} from '../generated';

export interface UserInterface {
  create(req: UserCreateReq): Promise<UserCreateRsp>;
  delete(id: string, req: UserDeleteReq): Promise<GenericRsp>;
  get(id: string, remoteAddr?: string, userAgent?: string): Promise<UserGetRsp>;
  list(
    remoteAddr?: string,
    userAgent?: string,
    sort?: string,
    filter?: string[],
    page?: number,
    pageSize?: number,
  ): Promise<UserListRsp>;
}

class User implements UserInterface {
  private client: UserApi;

  constructor(axios: AxiosInstance) {
    Assert.notNull(axios);
    this.client = new UserApi(undefined, '', axios);
  }

  async create(req: UserCreateReq): Promise<UserCreateRsp> {
    Assert.notNull(req);

    try {
      const createRsp = await this.client.userCreate(req);
      const createResponse = createRsp.data;

      if (isErrorRsp(createResponse)) {
        throw new BaseError(
          'ErrorRsp',
          httpStatusCodes.AUTH_RSP_ERROR.code,
          httpStatusCodes.AUTH_RSP_ERROR.description,
          httpStatusCodes.AUTH_RSP_ERROR.isOperational,
        );
      }

      return createResponse;
    } catch (error) {
      throw Helper.convertToServerException(error);
    }
  }

  async delete(id: string, req: UserDeleteReq): Promise<GenericRsp> {
    Assert.notEmptyString(id);
    Assert.notNull(req);

    try {
      const deleteRsp = await this.client.userDelete(id, req);
      const deleteResponse = deleteRsp.data;

      if (isErrorRsp(deleteResponse)) {
        throw new BaseError(
          'ErrorRsp',
          httpStatusCodes.AUTH_RSP_ERROR.code,
          httpStatusCodes.AUTH_RSP_ERROR.description,
          httpStatusCodes.AUTH_RSP_ERROR.isOperational,
        );
      }

      return deleteResponse;
    } catch (error) {
      throw Helper.convertToServerException(error);
    }
  }

  async get(id: string, remoteAddr = '', userAgent = ''): Promise<UserGetRsp> {
    Assert.notEmptyString(id);

    try {
      const getRsp = await this.client.userGet(id, remoteAddr, userAgent);
      const getResponse = getRsp.data;

      if (isErrorRsp(getResponse)) {
        throw new BaseError(
          'User get ErrorRsp',
          httpStatusCodes.AUTH_RSP_ERROR.code,
          httpStatusCodes.AUTH_RSP_ERROR.description,
          httpStatusCodes.AUTH_RSP_ERROR.isOperational,
        );
      }

      return getResponse;
    } catch (error) {
      throw Helper.convertToServerException(error);
    }
  }

  async list(remoteAddr = '', userAgent = '', sort = '', filter = [], page = 1, pageSize = 10): Promise<UserListRsp> {
    try {
      const listRsp = await this.client.userList(remoteAddr, userAgent, sort, filter, page, pageSize);
      const listResponse = listRsp.data;

      if (isErrorRsp(listResponse)) {
        throw new BaseError(
          'User list ErrorRsp',
          httpStatusCodes.AUTH_RSP_ERROR.code,
          httpStatusCodes.AUTH_RSP_ERROR.description,
          httpStatusCodes.AUTH_RSP_ERROR.isOperational,
        );
      }

      return listResponse;
    } catch (error) {
      throw Helper.convertToServerException(error);
    }
  }
}

export default User;
