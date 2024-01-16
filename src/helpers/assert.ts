import { ErrorRsp } from '../generated/index';
import { BaseError, httpStatusCodes } from '../errors/index';

const { NULL_DATA, EMPTY_STRING, INVALID_DATA, INVALID_KEY } = httpStatusCodes;

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
}

export function isErrorRsp(obj: unknown): obj is ErrorRsp {
  return typeof obj === 'object' && obj !== null && 'error' in obj && typeof (obj as ErrorRsp).error === 'string';
}

export default Assert;
