import BaseError from './baseError';
import httpStatusCodes from './httpStatusCodes';

export enum JWTErrorNames {
  JWTClaimValidationFailed = 'CLAIM_VALIDATION_FAILED',
  InvalidIssuer = 'INVALID_ISSUER',
  InvalidShortSession = 'INVALID_SHORT_SESSION',
  JWTExpired = 'JWT_EXPIRED',
  JWTInvalid = 'JWT_INVALID',
}

class JWTError extends BaseError {
  constructor(name: JWTErrorNames, isOperational: boolean = false) {
    super(name, httpStatusCodes[name].code, httpStatusCodes[name].description, isOperational);
  }
}

export default JWTError;
