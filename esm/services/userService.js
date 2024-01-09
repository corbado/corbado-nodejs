import { BaseError, httpStatusCodes } from '../errors/index.js';
import { Assert, Helper, isErrorRsp } from '../heplers/index.js';
import { UserApi, } from '../generated/index.js';
class User {
    constructor(axios) {
        Assert.notNull(axios);
        this.client = new UserApi(undefined, '', axios);
    }
    async create(req) {
        Assert.notNull(req);
        try {
            const createRsp = await this.client.userCreate(req);
            const createResponse = createRsp.data;
            if (isErrorRsp(createResponse)) {
                throw new BaseError('ErrorRsp', httpStatusCodes.AUTH_RSP_ERROR.code, httpStatusCodes.AUTH_RSP_ERROR.description, httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return createResponse;
        }
        catch (error) {
            throw Helper.convertToServerException(error);
        }
    }
    async delete(id, req) {
        Assert.notEmptyString(id);
        Assert.notNull(req);
        try {
            const deleteRsp = await this.client.userDelete(id, req);
            const deleteResponse = deleteRsp.data;
            if (isErrorRsp(deleteResponse)) {
                throw new BaseError('ErrorRsp', httpStatusCodes.AUTH_RSP_ERROR.code, httpStatusCodes.AUTH_RSP_ERROR.description, httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return deleteResponse;
        }
        catch (error) {
            throw Helper.convertToServerException(error);
        }
    }
    async get(id, remoteAddr = '', userAgent = '') {
        Assert.notEmptyString(id);
        try {
            const getRsp = await this.client.userGet(id, remoteAddr, userAgent);
            const getResponse = getRsp.data;
            if (isErrorRsp(getResponse)) {
                throw new BaseError('User get ErrorRsp', httpStatusCodes.AUTH_RSP_ERROR.code, httpStatusCodes.AUTH_RSP_ERROR.description, httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return getResponse;
        }
        catch (error) {
            throw Helper.convertToServerException(error);
        }
    }
    async list(remoteAddr = '', userAgent = '', sort = '', filter = [], page = 1, pageSize = 10) {
        try {
            const listRsp = await this.client.userList(remoteAddr, userAgent, sort, filter, page, pageSize);
            const listResponse = listRsp.data;
            if (isErrorRsp(listResponse)) {
                throw new BaseError('User list ErrorRsp', httpStatusCodes.AUTH_RSP_ERROR.code, httpStatusCodes.AUTH_RSP_ERROR.description, httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return listResponse;
        }
        catch (error) {
            throw Helper.convertToServerException(error);
        }
    }
}
export default User;
//# sourceMappingURL=userService.js.map