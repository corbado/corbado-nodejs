import httpStatusCodes from 'src/errors/httpStatusCodes';
import { BaseError } from 'src/errors';
import Assert, { isErrorRsp } from 'src/heplers/assert';
import Helper from 'src/heplers/helpers';
import { AxiosInstance } from 'axios';
import {
  ValidationApi,
  ValidateEmailReq,
  ValidateEmailRsp,
  ValidatePhoneNumberReq,
  ValidatePhoneNumberRsp,
} from '../generated';

export interface ValidationInterface {
  validateEmail(req: ValidateEmailReq): Promise<ValidateEmailRsp>;
  validatePhoneNumber(req: ValidatePhoneNumberReq): Promise<ValidatePhoneNumberRsp>;
}

class Validation implements ValidationInterface {
  private client: ValidationApi;

  constructor(axios: AxiosInstance) {
    Assert.notNull(axios);
    this.client = new ValidationApi(undefined, '', axios);
  }

  async validateEmail(req: ValidateEmailReq): Promise<ValidateEmailRsp> {
    Assert.notNull(req);

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
      throw Helper.convertToServerException(error);
    }
  }

  async validatePhoneNumber(req: ValidatePhoneNumberReq): Promise<ValidatePhoneNumberRsp> {
    Assert.notNull(req);

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
      throw Helper.convertToServerException(error);
    }
  }
}

export default Validation;
