"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../errors/index.js");
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
            throw new index_js_1.BaseError('Not Authenticated', index_js_1.httpStatusCodes.USER_NOT_AUTHENTICATED.code, index_js_1.httpStatusCodes.USER_NOT_AUTHENTICATED.description, index_js_1.httpStatusCodes.USER_NOT_AUTHENTICATED.isOperational);
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
exports.default = User;
//# sourceMappingURL=user.js.map