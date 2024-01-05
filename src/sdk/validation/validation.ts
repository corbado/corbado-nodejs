import { AxiosInstance, AxiosResponse } from 'axios';
import {
  ValidateEmailReq,
  ValidateEmailRsp,
  ValidatePhoneNumberReq,
  ValidatePhoneNumberRsp,
  ValidationApi,
} from '../../generated';

export default class Validation {
  #api: ValidationApi;

  constructor(axios: AxiosInstance) {
    this.#api = new ValidationApi(undefined, '', axios);
  }

  ValidateEmail(req: ValidateEmailReq): Promise<AxiosResponse<ValidateEmailRsp>> {
    return this.#api.validateEmail(req);
  }

  ValidatePhoneNumber(req: ValidatePhoneNumberReq): Promise<AxiosResponse<ValidatePhoneNumberRsp>> {
    return this.#api.validatePhoneNumber(req);
  }
}
