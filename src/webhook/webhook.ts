import { Request, Response } from 'express';
import { BaseError } from 'src/errors';
import httpStatusCodes from 'src/errors/httpStatusCodes';
import Assert from 'src/heplers/assert';
import Helper from 'src/heplers/helpers';
import {
  AuthMethodsRequest,
  AuthMethodsDataRequest,
  AuthMethodsDataResponse,
  AuthMethodsResponse,
  PasswordVerifyRequest,
  PasswordVerifyDataRequest,
  PasswordVerifyDataResponse,
  PasswordVerifyResponse,
} from './entities';
import { AuthMethodsDataResponseStatusEnum } from './entities/authMethodsDataResponse';

interface NestedBody {
  id: string;
  projectID: string;
  action: string;
  data: { username: string; password: string };
}

interface Body {
  id: string;
  projectID: string;
  action: string;
  data: NestedBody;
}

interface RequestWithBody extends Request {
  body: Body;
}

export enum AuthMethodsDataResponseStatus {
  ACTION_AUTH_METHODS = 'auth_methods',
  ACTION_PASSWORD_VERIFY = 'password_verify',
}

export const StandardFields = ['id', 'projectID', 'action', 'data'];

class Webhook {
  private username: string;

  private password: string;

  private automaticAuthenticationHandling = true;

  private authenticated = false;

  constructor(username: string, password: string) {
    Assert.notEmptyString(username);
    Assert.notEmptyString(password);

    this.username = username;
    this.password = password;
  }

  disableAutomaticAuthenticationHandling(): void {
    this.automaticAuthenticationHandling = false;
  }

  // TODO:
  // This implementation came from eyeballing our PHP SDK
  // Verify that it matches its functionality 1:1
  checkAuthentication(req: Request): boolean {
    const authHeader = req.headers.authorization || '';
    const base64Credentials = authHeader.split(' ')[1] || '';
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    return username === this.username && password === this.password;
  }

  static sendUnauthorizedResponse(res: Response, exit = true): void {
    res.status(401).header('WWW-Authenticate', 'Basic realm="Webhook"').send('Unauthorized.');

    if (exit) {
      res.end();
    }
  }

  handleAuthentication(req: Request, res: Response): void {
    if (this.authenticated) {
      throw new BaseError(
        'Already authenticated',
        httpStatusCodes.USER_ALREADY_AUTHENTICATED.code,
        httpStatusCodes.USER_ALREADY_AUTHENTICATED.description,
        httpStatusCodes.USER_ALREADY_AUTHENTICATED.isOperational,
      );
    }

    if (this.checkAuthentication(req)) {
      this.authenticated = true;
      return;
    }

    Webhook.sendUnauthorizedResponse(res);
  }

  checkAutomaticAuthentication(): void {
    if (this.authenticated || !this.automaticAuthenticationHandling) {
      return;
    }

    throw new BaseError(
      'Missing authentication, call handleAuthentication() first',
      httpStatusCodes.USER_NOT_AUTHENTICATED.code,
      httpStatusCodes.USER_NOT_AUTHENTICATED.description,
      httpStatusCodes.USER_NOT_AUTHENTICATED.isOperational,
    );
  }

  isPost(req: Request): boolean {
    this.checkAutomaticAuthentication();

    return req.method === 'POST';
  }

  getAction(req: Request): string {
    this.checkAutomaticAuthentication();

    const actionHeader = req.headers['x-corbado-action'];
    if (!actionHeader) {
      throw new BaseError(
        'Missing action header',
        httpStatusCodes.MISSING_ACTION_HEADER.code,
        httpStatusCodes.MISSING_ACTION_HEADER.description,
        httpStatusCodes.MISSING_ACTION_HEADER.isOperational,
      );
    }

    switch (actionHeader) {
      case 'authMethods':
        return AuthMethodsDataResponseStatus.ACTION_AUTH_METHODS;

      case 'passwordVerify':
        return AuthMethodsDataResponseStatus.ACTION_PASSWORD_VERIFY;

      default:
        throw new BaseError(
          `Invalid action ("${actionHeader}")`,
          httpStatusCodes.INVALID_ACTION_HEADER.code,
          httpStatusCodes.INVALID_ACTION_HEADER.description,
          httpStatusCodes.INVALID_ACTION_HEADER.isOperational,
        );
    }
  }

  getAuthMethodsRequest(req: RequestWithBody): AuthMethodsRequest {
    this.checkAutomaticAuthentication();

    const body = Webhook.getRequestBody(req);
    const data = Helper.jsonDecode(JSON.stringify(body)) as unknown as NestedBody;
    Assert.keysInObject(StandardFields, data as unknown as Record<string, unknown>);
    Assert.keysInObject(['username'], data.data as Record<string, unknown>);

    const dataRequest = new AuthMethodsDataRequest(data.data.username);
    return new AuthMethodsRequest(
      data.id,
      data.projectID,
      AuthMethodsDataResponseStatus.ACTION_AUTH_METHODS,
      String(dataRequest),
      '', // This is for the deprcated 'requestId'
    );
  }

  sendAuthMethodsResponse(
    res: Response,
    status: AuthMethodsDataResponseStatusEnum,
    exit = true,
    responseID = '',
  ): void {
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

  getPasswordVerifyRequest(req: RequestWithBody): PasswordVerifyRequest {
    this.checkAutomaticAuthentication();

    const { body } = req;
    const data = Helper.jsonDecode(JSON.stringify(body)) as unknown as NestedBody;
    Assert.keysInObject(StandardFields, data as unknown as Record<string, unknown>);
    Assert.keysInObject(['username', 'password'], data.data as Record<string, unknown>);

    const dataRequest = new PasswordVerifyDataRequest(data.data.username, data.data.password);

    const request = new PasswordVerifyRequest(
      data.id,
      data.projectID,
      AuthMethodsDataResponseStatus.ACTION_PASSWORD_VERIFY,
      String(dataRequest),
      '', // This is for the deprcated 'requestId'
    );

    return request;
  }

  sendPasswordVerifyResponse(res: Response, success: boolean, exit = true, responseID = ''): void {
    this.checkAutomaticAuthentication();

    const dataResponse = new PasswordVerifyDataResponse(success);

    const response = new PasswordVerifyResponse(String(dataResponse), responseID);

    Webhook.sendResponse(res, response);

    if (exit) {
      res.end();
    }
  }

  static getRequestBody(req: RequestWithBody): string {
    if (!req.body) {
      throw new BaseError(
        'Request body not found',
        httpStatusCodes.BAD_REQUEST.code,
        httpStatusCodes.BAD_REQUEST.description,
        httpStatusCodes.BAD_REQUEST.isOperational,
      );
    }

    // TODO:
    // Verify and adjust based on how our middleware
    // is set up and what we expect the body content to be.
    return typeof req.body === 'object' ? JSON.stringify(req.body) : req.body;
  }

  static sendResponse(res: Response, response: unknown): void {
    res.type('application/json; charset=utf-8').send(Helper.jsonEncode(response));
  }
}

export default Webhook;
