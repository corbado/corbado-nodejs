import { BaseError, httpStatusCodes } from '../errors/index.js';

class User {
  constructor(
    private authenticated: boolean,
    private id: string = '',
    private name: string = '',
    private email: string = '',
    private phoneNumber: string = '',
  ) {}

  private ensureAuthenticated(): void {
    if (!this.authenticated) {
      throw new BaseError(
        'Not Authenticated',
        httpStatusCodes.USER_NOT_AUTHENTICATED.code,
        httpStatusCodes.USER_NOT_AUTHENTICATED.description,
        httpStatusCodes.USER_NOT_AUTHENTICATED.isOperational,
      );
    }
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getID(): string {
    this.ensureAuthenticated();
    return this.id;
  }

  getName(): string {
    this.ensureAuthenticated();
    return this.name;
  }

  getEmail(): string {
    this.ensureAuthenticated();
    return this.email;
  }

  getPhoneNumber(): string {
    this.ensureAuthenticated();
    return this.phoneNumber;
  }
}

export default User;
