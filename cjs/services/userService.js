"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../errors/index.js");
const index_js_2 = require("../heplers/index.js");
const index_js_3 = require("../generated/index.js");
class User {
    constructor(axios) {
        index_js_2.Assert.notNull(axios);
        this.client = new index_js_3.UserApi(undefined, '', axios);
    }
    async create(req) {
        index_js_2.Assert.notNull(req);
        try {
            const createRsp = await this.client.userCreate(req);
            const createResponse = createRsp.data;
            if ((0, index_js_2.isErrorRsp)(createResponse)) {
                throw new index_js_1.BaseError('ErrorRsp', index_js_1.httpStatusCodes.AUTH_RSP_ERROR.code, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.description, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return createResponse;
        }
        catch (error) {
            throw index_js_2.Helper.convertToServerException(error);
        }
    }
    async delete(id, req) {
        index_js_2.Assert.notEmptyString(id);
        index_js_2.Assert.notNull(req);
        try {
            const deleteRsp = await this.client.userDelete(id, req);
            const deleteResponse = deleteRsp.data;
            if ((0, index_js_2.isErrorRsp)(deleteResponse)) {
                throw new index_js_1.BaseError('ErrorRsp', index_js_1.httpStatusCodes.AUTH_RSP_ERROR.code, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.description, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return deleteResponse;
        }
        catch (error) {
            throw index_js_2.Helper.convertToServerException(error);
        }
    }
    async get(id, remoteAddr = '', userAgent = '') {
        index_js_2.Assert.notEmptyString(id);
        try {
            const getRsp = await this.client.userGet(id, remoteAddr, userAgent);
            const getResponse = getRsp.data;
            if ((0, index_js_2.isErrorRsp)(getResponse)) {
                throw new index_js_1.BaseError('User get ErrorRsp', index_js_1.httpStatusCodes.AUTH_RSP_ERROR.code, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.description, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return getResponse;
        }
        catch (error) {
            throw index_js_2.Helper.convertToServerException(error);
        }
    }
    async list(remoteAddr = '', userAgent = '', sort = '', filter = [], page = 1, pageSize = 10) {
        try {
            const listRsp = await this.client.userList(remoteAddr, userAgent, sort, filter, page, pageSize);
            const listResponse = listRsp.data;
            if ((0, index_js_2.isErrorRsp)(listResponse)) {
                throw new index_js_1.BaseError('User list ErrorRsp', index_js_1.httpStatusCodes.AUTH_RSP_ERROR.code, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.description, index_js_1.httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return listResponse;
        }
        catch (error) {
            throw index_js_2.Helper.convertToServerException(error);
        }
    }
}
exports.default = User;
//# sourceMappingURL=userService.js.map