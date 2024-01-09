import { BaseError, httpStatusCodes } from '../errors/index.js';
import { Assert, Helper } from '../heplers/index.js';
import { AuthMethodsRequest, AuthMethodsDataRequest, AuthMethodsDataResponse, AuthMethodsDataResponseStatusEnum, AuthMethodsResponse, PasswordVerifyRequest, PasswordVerifyDataRequest, PasswordVerifyDataResponse, PasswordVerifyResponse, } from './entities/index.js';
export var AuthMethodsDataResponseStatus;
(function (AuthMethodsDataResponseStatus) {
    AuthMethodsDataResponseStatus["ACTION_AUTH_METHODS"] = "auth_methods";
    AuthMethodsDataResponseStatus["ACTION_PASSWORD_VERIFY"] = "password_verify";
})(AuthMethodsDataResponseStatus || (AuthMethodsDataResponseStatus = {}));
export const StandardFields = ['id', 'projectID', 'action', 'data'];
class Webhook {
    constructor(username, password) {
        this.automaticAuthenticationHandling = true;
        this.authenticated = false;
        Assert.notEmptyString(username);
        Assert.notEmptyString(password);
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
            throw new BaseError('Already authenticated', httpStatusCodes.USER_ALREADY_AUTHENTICATED.code, httpStatusCodes.USER_ALREADY_AUTHENTICATED.description, httpStatusCodes.USER_ALREADY_AUTHENTICATED.isOperational);
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
        throw new BaseError('Missing authentication, call handleAuthentication() first', httpStatusCodes.USER_NOT_AUTHENTICATED.code, httpStatusCodes.USER_NOT_AUTHENTICATED.description, httpStatusCodes.USER_NOT_AUTHENTICATED.isOperational);
    }
    isPost(req) {
        this.checkAutomaticAuthentication();
        return req.method === 'POST';
    }
    getAction(req) {
        this.checkAutomaticAuthentication();
        const actionHeader = req.headers['x-corbado-action'];
        if (!actionHeader) {
            throw new BaseError('Missing action header', httpStatusCodes.MISSING_ACTION_HEADER.code, httpStatusCodes.MISSING_ACTION_HEADER.description, httpStatusCodes.MISSING_ACTION_HEADER.isOperational);
        }
        switch (actionHeader) {
            case 'authMethods':
                return AuthMethodsDataResponseStatus.ACTION_AUTH_METHODS;
            case 'passwordVerify':
                return AuthMethodsDataResponseStatus.ACTION_PASSWORD_VERIFY;
            default:
                throw new BaseError(`Invalid action ("${actionHeader}")`, httpStatusCodes.INVALID_ACTION_HEADER.code, httpStatusCodes.INVALID_ACTION_HEADER.description, httpStatusCodes.INVALID_ACTION_HEADER.isOperational);
        }
    }
    getAuthMethodsRequest(req) {
        this.checkAutomaticAuthentication();
        const body = Webhook.getRequestBody(req);
        const data = Helper.jsonDecode(JSON.stringify(body));
        Assert.keysInObject(StandardFields, data);
        Assert.keysInObject(['username'], data.data);
        const dataRequest = new AuthMethodsDataRequest(data.data.username);
        return new AuthMethodsRequest(data.id, data.projectID, AuthMethodsDataResponseStatus.ACTION_AUTH_METHODS, String(dataRequest), '');
    }
    sendAuthMethodsResponse(res, status, exit = true, responseID = '') {
        Assert.stringInSet(status, [
            AuthMethodsDataResponseStatusEnum.USER_BLOCKED,
            AuthMethodsDataResponseStatusEnum.USER_EXISTS,
            AuthMethodsDataResponseStatusEnum.USER_NOT_EXISTS,
        ]);
        this.checkAutomaticAuthentication();
        const dataResponse = new AuthMethodsDataResponse(status);
        const response = new AuthMethodsResponse(dataResponse.status, responseID);
        Webhook.sendResponse(res, response);
        if (exit) {
            res.end();
        }
    }
    getPasswordVerifyRequest(req) {
        this.checkAutomaticAuthentication();
        const { body } = req;
        const data = Helper.jsonDecode(JSON.stringify(body));
        Assert.keysInObject(StandardFields, data);
        Assert.keysInObject(['username', 'password'], data.data);
        const dataRequest = new PasswordVerifyDataRequest(data.data.username, data.data.password);
        const request = new PasswordVerifyRequest(data.id, data.projectID, AuthMethodsDataResponseStatus.ACTION_PASSWORD_VERIFY, String(dataRequest), '');
        return request;
    }
    sendPasswordVerifyResponse(res, success, exit = true, responseID = '') {
        this.checkAutomaticAuthentication();
        const dataResponse = new PasswordVerifyDataResponse(success);
        const response = new PasswordVerifyResponse(String(dataResponse), responseID);
        Webhook.sendResponse(res, response);
        if (exit) {
            res.end();
        }
    }
    static getRequestBody(req) {
        if (!req.body) {
            throw new BaseError('Request body not found', httpStatusCodes.BAD_REQUEST.code, httpStatusCodes.BAD_REQUEST.description, httpStatusCodes.BAD_REQUEST.isOperational);
        }
        // TODO:
        // Verify and adjust based on how our middleware
        // is set up and what we expect the body content to be.
        return typeof req.body === 'object' ? JSON.stringify(req.body) : req.body;
    }
    static sendResponse(res, response) {
        res.type('application/json; charset=utf-8').send(Helper.jsonEncode(response));
    }
}
export default Webhook;
//# sourceMappingURL=webhook.js.map