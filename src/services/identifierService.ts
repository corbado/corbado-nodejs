import { AxiosInstance } from 'axios';
import {
  IdentifierCreateReq,
  Identifier as IdentifierRsp,
  GenericRsp,
  IdentifierType,
  IdentifierUpdateReq,
  IdentifierStatus,
  IdentifiersApi,
  IdentifierList,
} from '../generated/index.js';
import { Assert, Helper, isErrorRsp } from '../helpers';
import httpStatusCodes from '../errors/httpStatusCodes.js';
import BaseError from '../errors/baseError.js';

export interface IdentifierInterface {
  create(userId: string, req: IdentifierCreateReq): Promise<IdentifierRsp>;
  delete(userId: string, identifierId: string): Promise<GenericRsp>;
  list(sort?: string, filter?: string[], page?: number, pageSize?: number): Promise<IdentifierList>;
  listAllWithPaging(page?: number, pageSize?: number): Promise<IdentifierList>;
  listByValueAndType(value: string, type: IdentifierType): Promise<IdentifierList>;
  listByValueAndTypeWithPaging(
    value: string,
    type: IdentifierType,
    sort?: string,
    page?: number,
    pageSize?: number,
  ): Promise<IdentifierList>;
  existsByValueAndType(value: string, type: IdentifierType): Promise<boolean>;
  listAllByUserIdWithPaging(userId: string, page?: number, pageSize?: number): Promise<IdentifierList>;
  listAllByUserIdAndTypeWithPaging(
    userId: string,
    type: IdentifierType,
    page?: number,
    pageSize?: number,
  ): Promise<IdentifierList>;
  listAllEmailsByUserId(userId: string): Promise<IdentifierRsp[]>;
  updateIdentifier(
    userId: string,
    identifierId: string,
    identifierUpdateReq: IdentifierUpdateReq,
  ): Promise<IdentifierRsp>;
  updateStatus(userId: string, identifierId: string, status: IdentifierStatus): Promise<IdentifierRsp>;
}

/** The user id prefix. */
const USER_ID_PREFIX = 'usr-';

class Identifier implements IdentifierInterface {
  private client: IdentifiersApi;

  constructor(axios: AxiosInstance) {
    Assert.notNull(axios, 'IdentifierRsp Axios instance must not be null');
    this.client = new IdentifiersApi(undefined, '', axios);
  }

  async create(userId: string, req: IdentifierCreateReq): Promise<IdentifierRsp> {
    Assert.notNull(req, 'IdentifierRsp.create() "req" param must not be null');

    try {
      const createRsp = await this.client.identifierCreate(userId, req);
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
      throw Helper.convertToServerError(error, 'IdentifierRsp.create()');
    }
  }

  async delete(userId: string, identifierId: string): Promise<GenericRsp> {
    Assert.notEmptyString(userId, 'Identifier.delete() "id" param must not be empty');
    Assert.notEmptyString(identifierId, 'Identifier.delete() "identifierId" param must not be empty');

    try {
      const deleteRsp = await this.client.identifierDelete(userId, identifierId);
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
      throw Helper.convertToServerError(error, 'Identifier.delete()');
    }
  }

  async list(sort = '', filter?: string[], page = 1, pageSize = 10): Promise<IdentifierList> {
    try {
      const listRsp = await this.client.identifierList(sort, filter, page, pageSize);
      const listResponse = listRsp.data;

      if (isErrorRsp(listResponse)) {
        throw new BaseError(
          'Identifier list ErrorRsp',
          httpStatusCodes.AUTH_RSP_ERROR.code,
          httpStatusCodes.AUTH_RSP_ERROR.description,
          httpStatusCodes.AUTH_RSP_ERROR.isOperational,
        );
      }

      return listResponse;
    } catch (error) {
      throw Helper.convertToServerError(error, 'Identifier.list()');
    }
  }

  async listAllWithPaging(page?: number, pageSize?: number): Promise<IdentifierList> {
    return this.list(undefined, undefined, page, pageSize);
  }

  async listByValueAndType(value: string, type: IdentifierType): Promise<IdentifierList> {
    return this.list(undefined, [`identifierValue:eq:${value}`, `identifierType:eq:${type}`], undefined, undefined);
  }

  async listByValueAndTypeWithPaging(
    value: string,
    type: IdentifierType,
    sort?: string,
    page?: number,
    pageSize?: number,
  ): Promise<IdentifierList> {
    return this.list(sort, [`identifierValue:eq:${value}`, `identifierType:eq:${type}`], page, pageSize);
  }

  async existsByValueAndType(value: string, type: IdentifierType): Promise<boolean> {
    const list = await this.listByValueAndType(value, type);

    return list.identifiers.length > 0;
  }

  async listAllByUserIdWithPaging(userId: string, page?: number, pageSize?: number): Promise<IdentifierList> {
    let id = userId;

    // filter queries are using userID without prefix
    if (userId.startsWith(USER_ID_PREFIX)) {
      id = userId.substring(USER_ID_PREFIX.length);
    }

    return this.list(undefined, [`userID:eq:${id}`], page, pageSize);
  }

  listAllByUserIdAndTypeWithPaging(
    userId: string,
    type: IdentifierType,
    page?: number,
    pageSize?: number,
  ): Promise<IdentifierList> {
    let id = userId;

    // filter queries are using userID without prefix
    if (userId.startsWith(USER_ID_PREFIX)) {
      id = userId.substring(USER_ID_PREFIX.length);
    }

    return this.list(undefined, [`userID:eq:${id}`, `identifierType:eq:${type}`], page, pageSize);
  }

  async listAllEmailsByUserId(userId: string): Promise<IdentifierRsp[]> {
    const list: IdentifierRsp[] = [];

    const firstRes = await this.listAllByUserIdAndTypeWithPaging(userId, IdentifierType.Email);

    list.push(...firstRes.identifiers);

    const { paging } = firstRes;

    const listPromise: Promise<IdentifierList>[] = [];
    while (paging.page < paging.totalPages) {
      const currentPage = paging.page;
      paging.page = currentPage + 1;

      const temp = this.listAllByUserIdAndTypeWithPaging(userId, IdentifierType.Email, paging.page);

      listPromise.push(temp);
    }

    const listRes = await Promise.all(listPromise);
    list.push(...listRes.flatMap((res) => res.identifiers));

    return list;
  }

  async updateIdentifier(
    userId: string,
    identifierId: string,
    identifierUpdateReq: IdentifierUpdateReq,
  ): Promise<IdentifierRsp> {
    Assert.notEmptyString(userId, 'Identifier.update() "userId" param must not be empty');
    Assert.notEmptyString(identifierId, 'Identifier.update() "identifierId" param must not be empty');
    Assert.notNull(identifierUpdateReq, 'Identifier.update() "identifierUpdateReq" param must not be null');

    try {
      const updateRsp = await this.client.identifierUpdate(userId, identifierId, identifierUpdateReq);
      const updateResponse = updateRsp.data;

      if (isErrorRsp(updateResponse)) {
        throw new BaseError(
          'ErrorRsp',
          httpStatusCodes.AUTH_RSP_ERROR.code,
          httpStatusCodes.AUTH_RSP_ERROR.description,
          httpStatusCodes.AUTH_RSP_ERROR.isOperational,
        );
      }

      return updateResponse;
    } catch (error) {
      throw Helper.convertToServerError(error, 'Identifier.update()');
    }
  }

  updateStatus(userId: string, identifierId: string, status: IdentifierStatus): Promise<IdentifierRsp> {
    return this.updateIdentifier(userId, identifierId, { status });
  }
}

export default Identifier;
