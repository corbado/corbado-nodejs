import { BaseError, httpStatusCodes } from '../errors/index.js';
const { NULL_DATA, EMPTY_STRING, INVALID_DATA, INVALID_KEY } = httpStatusCodes;
export function validate(condition, code, description, isOperational = false) {
    if (condition) {
        throw new BaseError('Assertion Error', code, description, isOperational);
    }
}
class Assert {
    static notNull(data) {
        validate(data == null, NULL_DATA.code, NULL_DATA.description, NULL_DATA.isOperational);
    }
    static notEmptyString(data) {
        validate(data === '', EMPTY_STRING.code, EMPTY_STRING.description, EMPTY_STRING.isOperational);
    }
    static stringInSet(data, possibleValues) {
        Assert.notEmptyString(data);
        validate(!possibleValues.includes(data), INVALID_DATA.code, INVALID_DATA.description, INVALID_DATA.isOperational);
    }
    static keysInObject(keys, data) {
        keys.forEach((key) => {
            validate(!(key in data), INVALID_KEY.code, INVALID_KEY.description, INVALID_KEY.isOperational);
        });
    }
}
export function isErrorRsp(obj) {
    return typeof obj === 'object' && obj !== null && 'error' in obj && typeof obj.error === 'string';
}
export default Assert;
//# sourceMappingURL=assert.js.map