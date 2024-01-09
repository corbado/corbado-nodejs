export declare enum AuthMethodsDataResponseStatusEnum {
    USER_EXISTS = "exists",
    USER_NOT_EXISTS = "not_exists",
    USER_BLOCKED = "blocked"
}
export declare class AuthMethodsDataResponse {
    status: AuthMethodsDataResponseStatusEnum;
    constructor(status: AuthMethodsDataResponseStatusEnum);
}
