import BaseError from './baseError';
import httpStatusCodes from './httpStatusCodes';

export enum JWTErrorNames {
  JWTClaimValidationFailed = 'JWTClaimValidationFailed',
  InvalidIssuer = 'InvalidIssuer',
  InvalidShortSession = 'InvalidShortSession',
  JWTExpired = 'JWTExpired',
  JWTInvalid = 'JWTInvalid',
}

class JWTError extends BaseError {
  constructor(name: JWTErrorNames, isOperational: boolean = false) {
    super(name, httpStatusCodes[name].code, httpStatusCodes[name].description, isOperational);
  }
}

export default JWTError;
