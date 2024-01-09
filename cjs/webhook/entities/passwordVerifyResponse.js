"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commonResponse_js_1 = require("./commonResponse.js");
class PasswordVerifyResponse extends commonResponse_js_1.default {
    constructor(data, responseId) {
        super(responseId);
        this.data = data;
    }
}
exports.default = PasswordVerifyResponse;
//# sourceMappingURL=passwordVerifyResponse.js.map