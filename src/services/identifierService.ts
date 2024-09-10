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
  listByValueAndType(value: string, type: IdentifierType): Promise<IdentifierList>;
  listByUserId(userId: string, page?: number, pageSize?: number): Promise<IdentifierList>;
  listByUserIdAndType(userId: string, type: IdentifierType, page?: number, pageSize?: number): Promise<IdentifierList>;
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

  async listByValueAndType(
    value: string,
    type: IdentifierType,
    sort?: string,
    page?: number,
    pageSize?: number,
  ): Promise<IdentifierList> {
    return this.list(sort, [`identifierValue:eq:${value}`, `identifierType:eq:${type}`], page, pageSize);
  }

  async listByUserId(userId: string, page?: number, pageSize?: number): Promise<IdentifierList> {
    let id = userId;

    // filter queries are using userID without prefix
    if (userId.startsWith(USER_ID_PREFIX)) {
      id = userId.substring(USER_ID_PREFIX.length);
    }

    return this.list(undefined, [`userID:eq:${id}`], page, pageSize);
  }

  listByUserIdAndType(userId: string, type: IdentifierType, page?: number, pageSize?: number): Promise<IdentifierList> {
    let id = userId;

    // filter queries are using userID without prefix
    if (userId.startsWith(USER_ID_PREFIX)) {
      id = userId.substring(USER_ID_PREFIX.length);
    }

    return this.list(undefined, [`userID:eq:${id}`, `identifierType:eq:${type}`], page, pageSize);
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
