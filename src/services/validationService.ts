import { AxiosInstance } from 'axios';
import { BaseError, httpStatusCodes } from '../errors/index.js';
import { Assert, Helper, isErrorRsp } from '../helpers/index.js';
import {
  ValidationApi,
  ValidateEmailReq,
  ValidateEmailRsp,
  ValidatePhoneNumberReq,
  ValidatePhoneNumberRsp,
} from '../generated/index.js';

export interface ValidationInterface {
  validateEmail(req: ValidateEmailReq): Promise<ValidateEmailRsp>;
  validatePhoneNumber(req: ValidatePhoneNumberReq): Promise<ValidatePhoneNumberRsp>;
}

class Validation implements ValidationInterface {
  private client: ValidationApi;

  constructor(axios: AxiosInstance) {
    Assert.notNull(axios, 'Validation Axios instance must not be null');
    this.client = new ValidationApi(undefined, '', axios);
  }

  async validateEmail(req: ValidateEmailReq): Promise<ValidateEmailRsp> {
    Assert.notNull(req, 'Validation.email() "req" param must not be null');

    try {
      const emailValidationRsp = await this.client.validateEmail(req);
      const emailValidationResponse = emailValidationRsp.data;

      if (isErrorRsp(emailValidationResponse)) {
        throw new BaseError(
          'Email validation ErrorRsp',
          httpStatusCodes.AUTH_RSP_ERROR.code,
          httpStatusCodes.AUTH_RSP_ERROR.description,
          httpStatusCodes.AUTH_RSP_ERROR.isOperational,
        );
      }

      return emailValidationResponse;
    } catch (error) {
      throw Helper.convertToServerError(error, 'Validation.validateEmail()');
    }
  }

  async validatePhoneNumber(req: ValidatePhoneNumberReq): Promise<ValidatePhoneNumberRsp> {
    Assert.notNull(req, 'Validation.validatePhoneNumber() "req" param must not be null');

    try {
      const phoneValidationRsp = await this.client.validatePhoneNumber(req);
      const phoneValidationResponse = phoneValidationRsp.data;

      if (isErrorRsp(phoneValidationResponse)) {
        throw new BaseError(
          'Phone number validation ErrorRsp',
          httpStatusCodes.AUTH_RSP_ERROR.code,
          httpStatusCodes.AUTH_RSP_ERROR.description,
          httpStatusCodes.AUTH_RSP_ERROR.isOperational,
        );
      }

      return phoneValidationResponse;
    } catch (error) {
      throw Helper.convertToServerError(error, 'Validation.validatePhoneNumber()');
    }
  }
}

export default Validation;
