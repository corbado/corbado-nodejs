"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMethodsDataResponse = exports.AuthMethodsDataResponseStatusEnum = void 0;
var AuthMethodsDataResponseStatusEnum;
(function (AuthMethodsDataResponseStatusEnum) {
    AuthMethodsDataResponseStatusEnum["USER_EXISTS"] = "exists";
    AuthMethodsDataResponseStatusEnum["USER_NOT_EXISTS"] = "not_exists";
    AuthMethodsDataResponseStatusEnum["USER_BLOCKED"] = "blocked";
})(AuthMethodsDataResponseStatusEnum || (exports.AuthMethodsDataResponseStatusEnum = AuthMethodsDataResponseStatusEnum = {}));
class AuthMethodsDataResponse {
    constructor(status) {
        this.status = status;
    }
}
exports.AuthMethodsDataResponse = AuthMethodsDataResponse;
//# sourceMappingURL=authMethodsDataResponse.js.map