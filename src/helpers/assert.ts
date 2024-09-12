import { ErrorRsp } from '../generated/index.js';
import { BaseError, httpStatusCodes } from '../errors/index.js';

const { NULL_DATA, EMPTY_STRING, INVALID_DATA, INVALID_KEY, INVALID_URL } = httpStatusCodes;

export function validate(
  condition: boolean,
  errorName: string,
  code: number,
  description: string,
  isOperational = false,
): void {
  if (condition) {
    throw new BaseError(`Assertion Error! - ${errorName}`, code, description, isOperational);
  }
}

class Assert {
  public static notNull(data: unknown, errorName: string): void {
    validate(data == null, errorName, NULL_DATA.code, NULL_DATA.description, NULL_DATA.isOperational);
  }

  public static notEmptyString(data: string, errorName: string): void {
    validate(data === '', errorName, EMPTY_STRING.code, EMPTY_STRING.description, EMPTY_STRING.isOperational);
  }

  public static stringInSet(data: string, possibleValues: string[], errorName: string): void {
    Assert.notEmptyString(data, errorName);
    validate(
      !possibleValues.includes(data),
      errorName,
      INVALID_DATA.code,
      INVALID_DATA.description,
      INVALID_DATA.isOperational,
    );
  }

  public static keysInObject(keys: string[], data: Record<string, unknown>, errorName: string): void {
    keys.forEach((key) => {
      validate(!(key in data), errorName, INVALID_KEY.code, INVALID_KEY.description, INVALID_KEY.isOperational);
    });
  }

  public static validURL(url: string, errorName: string): void {
    validate(!url, errorName, INVALID_URL.code, 'parse_url() returned error', INVALID_URL.isOperational);

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch (error) {
      throw new BaseError(
        `${errorName}URL parse failed`,
        INVALID_URL.code,
        INVALID_URL.description,
        INVALID_URL.isOperational,
      );
    }

    validate(
      Boolean(parsedUrl.username),
      `${errorName} URL username assertion failed`,
      INVALID_URL.code,
      'username needs to be empty',
      INVALID_URL.isOperational,
    );

    validate(
      Boolean(parsedUrl.password),
      `${errorName} URL password assertion failed`,
      INVALID_URL.code,
      'password needs to be empty',
      INVALID_URL.isOperational,
    );

    validate(
      parsedUrl.pathname !== '/' && parsedUrl.pathname !== '/v2',
      `${errorName} URL path assertion failed`,
      INVALID_URL.code,
      'path needs to be empty',
      INVALID_URL.isOperational,
    );

    validate(
      Boolean(parsedUrl.search),
      `${errorName} URL querystring assertion failed`,
      INVALID_URL.code,
      'querystring needs to be empty',
      INVALID_URL.isOperational,
    );

    validate(
      Boolean(parsedUrl.hash),
      `${errorName} URL fragment assertion failed`,
      INVALID_URL.code,
      'fragment needs to be empty',
      INVALID_URL.isOperational,
    );
  }
}

export function isErrorRsp(obj: unknown): obj is ErrorRsp {
  return typeof obj === 'object' && obj !== null && 'error' in obj && typeof (obj as ErrorRsp).error === 'string';
}

export default Assert;
