export var AuthMethodsDataResponseStatusEnum;
(function (AuthMethodsDataResponseStatusEnum) {
    AuthMethodsDataResponseStatusEnum["USER_EXISTS"] = "exists";
    AuthMethodsDataResponseStatusEnum["USER_NOT_EXISTS"] = "not_exists";
    AuthMethodsDataResponseStatusEnum["USER_BLOCKED"] = "blocked";
})(AuthMethodsDataResponseStatusEnum || (AuthMethodsDataResponseStatusEnum = {}));
export class AuthMethodsDataResponse {
    constructor(status) {
        this.status = status;
    }
}
//# sourceMappingURL=authMethodsDataResponse.js.map