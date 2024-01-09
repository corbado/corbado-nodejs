import { BaseError, httpStatusCodes } from '../errors/index.js';
class User {
    constructor(authenticated, id = '', name = '', email = '', phoneNumber = '') {
        this.authenticated = authenticated;
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
    ensureAuthenticated() {
        if (!this.authenticated) {
            throw new BaseError('Not Authenticated', httpStatusCodes.USER_NOT_AUTHENTICATED.code, httpStatusCodes.USER_NOT_AUTHENTICATED.description, httpStatusCodes.USER_NOT_AUTHENTICATED.isOperational);
        }
    }
    isAuthenticated() {
        return this.authenticated;
    }
    getID() {
        this.ensureAuthenticated();
        return this.id;
    }
    getName() {
        this.ensureAuthenticated();
        return this.name;
    }
    getEmail() {
        this.ensureAuthenticated();
        return this.email;
    }
    getPhoneNumber() {
        this.ensureAuthenticated();
        return this.phoneNumber;
    }
}
export default User;
//# sourceMappingURL=user.js.map