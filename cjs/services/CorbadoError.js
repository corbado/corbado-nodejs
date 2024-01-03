"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// convert this file to typescript (.ts) and add types
class CorbadoError extends Error {
    constructor(message) {
        super(message);
        this.name = "CorbadoError";
    }
}
exports.default = CorbadoError;
//# sourceMappingURL=CorbadoError.js.map