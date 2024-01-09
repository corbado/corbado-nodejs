class BaseError extends Error {
    constructor(name, statusCode, description, isOperational = false) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        // We're attaching a stack trace to the error object. Certain engines like V8 finds it useful.
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export default BaseError;
//# sourceMappingURL=baseError.js.map