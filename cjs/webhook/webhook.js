"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardFields = exports.AuthMethodsDataResponseStatus = void 0;
const index_js_1 = require("../errors/index.js");
const index_js_2 = require("../heplers/index.js");
const index_js_3 = require("./entities/index.js");
var AuthMethodsDataResponseStatus;
(function (AuthMethodsDataResponseStatus) {
    AuthMethodsDataResponseStatus["ACTION_AUTH_METHODS"] = "auth_methods";
    AuthMethodsDataResponseStatus["ACTION_PASSWORD_VERIFY"] = "password_verify";
})(AuthMethodsDataResponseStatus || (exports.AuthMethodsDataResponseStatus = AuthMethodsDataResponseStatus = {}));
exports.StandardFields = ['id', 'projectID', 'action', 'data'];
class Webhook {
    constructor(username, password) {
        this.automaticAuthenticationHandling = true;
        this.authenticated = false;
        index_js_2.Assert.notEmptyString(username, 'Webhook instance "username" param must not be an empty string');
        index_js_2.Assert.notEmptyString(password, 'Webhook instance "password" param must not be an empty string');
        this.username = username;
        this.password = password;
    }
    disableAutomaticAuthenticationHandling() {
        this.automaticAuthenticationHandling = false;
    }
    // TODO:
    // This implementation came from eyeballing our PHP SDK
    // Verify that it matches its functionality 1:1
    checkAuthentication(req) {
        const authHeader = req.headers.authorization || '';
        const base64Credentials = authHeader.split(' ')[1] || '';
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');
        return username === this.username && password === this.password;
    }
    static sendUnauthorizedResponse(res, exit = true) {
        res.status(401).header('WWW-Authenticate', 'Basic realm="Webhook"').send('Unauthorized.');
        if (exit) {
            res.end();
        }
    }
    handleAuthentication(req, res) {
        if (this.authenticated) {
            throw new index_js_1.BaseError('Already authenticated', index_js_1.httpStatusCodes.USER_ALREADY_AUTHENTICATED.code, index_js_1.httpStatusCodes.USER_ALREADY_AUTHENTICATED.description, index_js_1.httpStatusCodes.USER_ALREADY_AUTHENTICATED.isOperational);
        }
        if (this.checkAuthentication(req)) {
            this.authenticated = true;
            return;
        }
        Webhook.sendUnauthorizedResponse(res);
    }
    checkAutomaticAuthentication() {
        if (this.authenticated || !this.automaticAuthenticationHandling) {
            return;
        }
        throw new index_js_1.BaseError('Missing authentication, call handleAuthentication() first', index_js_1.httpStatusCodes.USER_NOT_AUTHENTICATED.code, index_js_1.httpStatusCodes.USER_NOT_AUTHENTICATED.description, index_js_1.httpStatusCodes.USER_NOT_AUTHENTICATED.isOperational);
    }
    isPost(req) {
        this.checkAutomaticAuthentication();
        return req.method === 'POST';
    }
    getAction(req) {
        this.checkAutomaticAuthentication();
        const actionHeader = req.headers['x-corbado-action'];
        if (!actionHeader) {
            throw new index_js_1.BaseError('Missing action header', index_js_1.httpStatusCodes.MISSING_ACTION_HEADER.code, index_js_1.httpStatusCodes.MISSING_ACTION_HEADER.description, index_js_1.httpStatusCodes.MISSING_ACTION_HEADER.isOperational);
        }
        switch (actionHeader) {
            case 'authMethods':
                return AuthMethodsDataResponseStatus.ACTION_AUTH_METHODS;
            case 'passwordVerify':
                return AuthMethodsDataResponseStatus.ACTION_PASSWORD_VERIFY;
            default:
                throw new index_js_1.BaseError(`Invalid action ("${actionHeader}")`, index_js_1.httpStatusCodes.INVALID_ACTION_HEADER.code, index_js_1.httpStatusCodes.INVALID_ACTION_HEADER.description, index_js_1.httpStatusCodes.INVALID_ACTION_HEADER.isOperational);
        }
    }
    getAuthMethodsRequest(req) {
        this.checkAutomaticAuthentication();
        const body = Webhook.getRequestBody(req);
        const data = index_js_2.Helper.jsonDecode(JSON.stringify(body));
        index_js_2.Assert.keysInObject(exports.StandardFields, data, 'Webhook.getAuthMethodsRequest() body does not contain all required fields: id, projectID, action, data');
        index_js_2.Assert.keysInObject(['username'], data.data, `Webhook.getAuthMethodsRequest() body.data does not contain all required field: "username"`);
        const dataRequest = new index_js_3.AuthMethodsDataRequest(data.data.username);
        return new index_js_3.AuthMethodsRequest(data.id, data.projectID, AuthMethodsDataResponseStatus.ACTION_AUTH_METHODS, String(dataRequest), '');
    }
    sendAuthMethodsResponse(res, status, exit = true, responseID = '') {
        index_js_2.Assert.stringInSet(status, [
            index_js_3.AuthMethodsDataResponseStatusEnum.USER_BLOCKED,
            index_js_3.AuthMethodsDataResponseStatusEnum.USER_EXISTS,
            index_js_3.AuthMethodsDataResponseStatusEnum.USER_NOT_EXISTS,
        ], 'Webhook.sendAuthMethodsResponse() status must be one of the AuthMethodsDataResponseStatusEnum values');
        this.checkAutomaticAuthentication();
        const dataResponse = new index_js_3.AuthMethodsDataResponse(status);
        const response = new index_js_3.AuthMethodsResponse(dataResponse.status, responseID);
        Webhook.sendResponse(res, response);
        if (exit) {
            res.end();
        }
    }
    getPasswordVerifyRequest(req) {
        this.checkAutomaticAuthentication();
        const { body } = req;
        const data = index_js_2.Helper.jsonDecode(JSON.stringify(body));
        index_js_2.Assert.keysInObject(exports.StandardFields, data, 'Webhook.getPasswordVerifyRequest() body does not contain all required fields: id, projectID, action, data');
        index_js_2.Assert.keysInObject(['username', 'password'], data.data, 'Webhook.getPasswordVerifyRequest() body.data does not contain all required fields: username, password');
        const dataRequest = new index_js_3.PasswordVerifyDataRequest(data.data.username, data.data.password);
        const request = new index_js_3.PasswordVerifyRequest(data.id, data.projectID, AuthMethodsDataResponseStatus.ACTION_PASSWORD_VERIFY, String(dataRequest), '');
        return request;
    }
    sendPasswordVerifyResponse(res, success, exit = true, responseID = '') {
        this.checkAutomaticAuthentication();
        const dataResponse = new index_js_3.PasswordVerifyDataResponse(success);
        const response = new index_js_3.PasswordVerifyResponse(String(dataResponse), responseID);
        Webhook.sendResponse(res, response);
        if (exit) {
            res.end();
        }
    }
    static getRequestBody(req) {
        if (!req.body) {
            throw new index_js_1.BaseError('Request body not found', index_js_1.httpStatusCodes.BAD_REQUEST.code, index_js_1.httpStatusCodes.BAD_REQUEST.description, index_js_1.httpStatusCodes.BAD_REQUEST.isOperational);
        }
        // TODO:
        // Verify and adjust based on how our middleware
        // is set up and what we expect the body content to be.
        return typeof req.body === 'object' ? JSON.stringify(req.body) : req.body;
    }
    static sendResponse(res, response) {
        res.type('application/json; charset=utf-8').send(index_js_2.Helper.jsonEncode(response));
    }
}
exports.default = Webhook;
//# sourceMappingURL=webhook.js.map