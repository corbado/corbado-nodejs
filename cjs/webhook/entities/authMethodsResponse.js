"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commonResponse_js_1 = require("./commonResponse.js");
class AuthMethodsResponse extends commonResponse_js_1.default {
    constructor(data, responseId) {
        super(responseId);
        this.data = data;
    }
}
exports.default = AuthMethodsResponse;
//# sourceMappingURL=authMethodsResponse.js.map