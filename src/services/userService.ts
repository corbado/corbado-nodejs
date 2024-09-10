import { AxiosInstance } from 'axios';
import { BaseError, httpStatusCodes } from '../errors/index.js';
import { Assert, Helper, isErrorRsp } from '../helpers/index.js';
import { UserCreateReq, UsersApi, User, UserStatus, GenericRsp } from '../generated/api.js';

export interface UserInterface {
  create(req: UserCreateReq): Promise<User>;
  create(fullName: string, status: UserStatus, explicitWebauthnID: string): Promise<User>;
  createActiveByName(fullName: string): Promise<User>;
  delete(id: string): Promise<GenericRsp>;
  get(id: string): Promise<User>;
}

class UserService implements UserInterface {
  private client: UsersApi;

  constructor(axios: AxiosInstance) {
    Assert.notNull(axios, 'User Axios instance must not be null');
    this.client = new UsersApi(undefined, '', axios);
  }

  async create(req: UserCreateReq): Promise<User>;
  async create(fullName: string, status: UserStatus, explicitWebauthnID: string): Promise<User>;
  async create(arg1: UserCreateReq | string, arg2?: UserStatus, arg3?: string): Promise<User> {
    if (typeof arg1 === 'string' && arg2 && arg3) {
      Assert.notEmptyString(arg1, 'User.create() "fullName" param must not be null');

      const request: UserCreateReq = {
        fullName: arg1,
        status: arg2,
        explicitWebauthnID: arg3,
      };

      return this.create(request);
    }

    try {
      const req = arg1 as UserCreateReq;
      Assert.notNull(req, 'User.create() "req" param must not be null');
      Assert.notEmptyString(req.fullName ? req.fullName : '', 'User.create() "fullName" param must not be empty');
      Assert.notNull(req.status, 'User.create() "status" param must not be null');

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
      throw Helper.convertToServerError(error, 'User.create()');
    }
  }

  async createActiveByName(fullName: string): Promise<User> {
    Assert.notEmptyString(fullName, 'User.create() "fullName" param must not be null');

    const request: UserCreateReq = {
      fullName,
      status: UserStatus.Active,
    };

    return this.create(request);
  }

  async delete(id: string): Promise<GenericRsp> {
    Assert.notEmptyString(id, 'User.delete() "id" param must not be empty');

    try {
      const deleteRsp = await this.client.userDelete(id);
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
      throw Helper.convertToServerError(error, 'User.delete()');
    }
  }

  async get(id: string): Promise<User> {
    Assert.notEmptyString(id, 'User.get() "id" param must not be an empty string');

    try {
      const getRsp = await this.client.userGet(id);
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
      throw Helper.convertToServerError(error, 'User.get()');
    }
  }
}

export default UserService;
