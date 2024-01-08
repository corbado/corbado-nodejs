export enum AuthMethodsDataResponseStatus {
  USER_EXISTS = 'exists',
  USER_NOT_EXISTS = 'not_exists',
  USER_BLOCKED = 'blocked',
}

export class AuthMethodsDataResponse {
  status: AuthMethodsDataResponseStatus;

  constructor(status: AuthMethodsDataResponseStatus) {
    this.status = status;
  }
}
