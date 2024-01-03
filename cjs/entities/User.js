"use strict";
// convert this file to typescript (.ts) and add types
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
var _User_authenticated, _User_id, _User_fullName, _User_email, _User_phoneNumber;
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(authenticated, id, fullName, email, phoneNumber) {
        _User_authenticated.set(this, void 0);
        _User_id.set(this, void 0);
        _User_fullName.set(this, void 0);
        _User_email.set(this, void 0);
        _User_phoneNumber.set(this, void 0);
        __classPrivateFieldSet(this, _User_authenticated, authenticated, "f");
        __classPrivateFieldSet(this, _User_id, id, "f");
        __classPrivateFieldSet(this, _User_fullName, fullName, "f");
        __classPrivateFieldSet(this, _User_email, email, "f");
        __classPrivateFieldSet(this, _User_phoneNumber, phoneNumber, "f");
    }
    get authenticated() {
        return __classPrivateFieldGet(this, _User_authenticated, "f");
    }
    get id() {
        return __classPrivateFieldGet(this, _User_id, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _User_fullName, "f");
    }
    get email() {
        return __classPrivateFieldGet(this, _User_email, "f");
    }
    get phoneNumber() {
        return __classPrivateFieldGet(this, _User_phoneNumber, "f");
    }
}
_User_authenticated = new WeakMap(), _User_id = new WeakMap(), _User_fullName = new WeakMap(), _User_email = new WeakMap(), _User_phoneNumber = new WeakMap();
exports.default = User;
//# sourceMappingURL=User.js.map