"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isErrorRsp = exports.validate = void 0;
const index_js_1 = require("../errors/index.js");
const { NULL_DATA, EMPTY_STRING, INVALID_DATA, INVALID_KEY } = index_js_1.httpStatusCodes;
function validate(condition, code, description, isOperational = false) {
    if (condition) {
        throw new index_js_1.BaseError('Assertion Error', code, description, isOperational);
    }
}
exports.validate = validate;
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
function isErrorRsp(obj) {
    return typeof obj === 'object' && obj !== null && 'error' in obj && typeof obj.error === 'string';
}
exports.isErrorRsp = isErrorRsp;
exports.default = Assert;
//# sourceMappingURL=assert.js.map