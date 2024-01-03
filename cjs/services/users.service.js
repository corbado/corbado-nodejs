"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _UsersService_id, _UsersService_name, _UsersService_email, _UsersService_phoneNumber, _UsersService_authenticated;
Object.defineProperty(exports, "__esModule", { value: true });
// convert this file to typescript (.ts) and add types
class UsersService {
    constructor(authenticated, id = '', name = '', email = '', phoneNumber = '') {
        // #authenticated;
        _UsersService_id.set(this, void 0);
        _UsersService_name.set(this, void 0);
        _UsersService_email.set(this, void 0);
        _UsersService_phoneNumber.set(this, void 0);
        _UsersService_authenticated.set(this, void 0);
        this.isAuthenticated = () => {
            return __classPrivateFieldGet(this, _UsersService_authenticated, "f");
        };
        this.getID = () => {
            if (this.isAuthenticated() === false) {
                throw new Error('UsersService is not authenticated');
            }
            return __classPrivateFieldGet(this, _UsersService_id, "f");
        };
        this.getName = () => {
            if (this.isAuthenticated() === false) {
                throw new Error('UsersService is not authenticated');
            }
            return __classPrivateFieldGet(this, _UsersService_name, "f");
        };
        this.getEmail = () => {
            if (this.isAuthenticated() === false) {
                throw new Error('UsersService is not authenticated');
            }
            return __classPrivateFieldGet(this, _UsersService_email, "f");
        };
        this.getPhoneNumber = () => {
            if (this.isAuthenticated() === false) {
                throw new Error('UsersService is not authenticated');
            }
            return __classPrivateFieldGet(this, _UsersService_phoneNumber, "f");
        };
        __classPrivateFieldSet(this, _UsersService_authenticated, authenticated, "f");
        __classPrivateFieldSet(this, _UsersService_id, id, "f");
        __classPrivateFieldSet(this, _UsersService_name, name, "f");
        __classPrivateFieldSet(this, _UsersService_email, email, "f");
        __classPrivateFieldSet(this, _UsersService_phoneNumber, phoneNumber, "f");
    }
}
_UsersService_id = new WeakMap(), _UsersService_name = new WeakMap(), _UsersService_email = new WeakMap(), _UsersService_phoneNumber = new WeakMap(), _UsersService_authenticated = new WeakMap();
exports.default = UsersService;
//# sourceMappingURL=users.service.js.map