"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commonRequest_js_1 = require("./commonRequest.js");
class PasswordVerifyRequest extends commonRequest_js_1.default {
    constructor(data, id, projectId, action, requestId) {
        super(id, projectId, action, requestId);
        this.data = data;
    }
}
exports.default = PasswordVerifyRequest;
//# sourceMappingURL=passwordVerifyRequest.js.map