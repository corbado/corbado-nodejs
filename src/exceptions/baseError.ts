class BaseError extends Error {
  statusCode: number;

  isOperational: boolean;

  constructor(name: string, statusCode: number, description: string, isOperational: boolean = false) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // We're attaching a stack trace to the error object. V8 finds it useful.
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default BaseError;
