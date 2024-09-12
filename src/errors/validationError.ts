import BaseError from './baseError.js';
import httpStatusCodes from './httpStatusCodes.js';

export enum ValidationErrorNames {
  JWTClaimValidationFailed = 'CLAIM_VALIDATION_FAILED',
  InvalidIssuer = 'INVALID_ISSUER',
  InvalidShortSession = 'INVALID_SHORT_SESSION',
  JWTExpired = 'JWT_EXPIRED',
  JWTInvalid = 'JWT_INVALID',
}

class ValidationError extends BaseError {
  constructor(name: ValidationErrorNames, isOperational: boolean = false) {
    super(name, httpStatusCodes[name].code, httpStatusCodes[name].description, isOperational);
  }
}

export default ValidationError;
