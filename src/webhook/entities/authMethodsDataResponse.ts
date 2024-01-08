export enum AuthMethodsDataResponseStatusEnum {
  USER_EXISTS = 'exists',
  USER_NOT_EXISTS = 'not_exists',
  USER_BLOCKED = 'blocked',
}

export class AuthMethodsDataResponse {
  status: AuthMethodsDataResponseStatusEnum;

  constructor(status: AuthMethodsDataResponseStatusEnum) {
    this.status = status;
  }
}
