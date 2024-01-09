import { ErrorRsp } from '../generated/index.js';
import { BaseError, httpStatusCodes } from '../errors/index.js';

const { NULL_DATA, EMPTY_STRING, INVALID_DATA, INVALID_KEY } = httpStatusCodes;

export function validate(condition: boolean, code: number, description: string, isOperational = false): void {
  if (condition) {
    throw new BaseError('Assertion Error', code, description, isOperational);
  }
}

class Assert {
  public static notNull(data: unknown): void {
    validate(data == null, NULL_DATA.code, NULL_DATA.description, NULL_DATA.isOperational);
  }

  public static notEmptyString(data: string): void {
    validate(data === '', EMPTY_STRING.code, EMPTY_STRING.description, EMPTY_STRING.isOperational);
  }

  public static stringInSet(data: string, possibleValues: string[]): void {
    Assert.notEmptyString(data);
    validate(!possibleValues.includes(data), INVALID_DATA.code, INVALID_DATA.description, INVALID_DATA.isOperational);
  }

  public static keysInObject(keys: string[], data: Record<string, unknown>): void {
    keys.forEach((key) => {
      validate(!(key in data), INVALID_KEY.code, INVALID_KEY.description, INVALID_KEY.isOperational);
    });
  }
}

export function isErrorRsp(obj: unknown): obj is ErrorRsp {
  return typeof obj === 'object' && obj !== null && 'error' in obj && typeof (obj as ErrorRsp).error === 'string';
}

export default Assert;
