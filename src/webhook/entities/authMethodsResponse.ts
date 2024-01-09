import { AuthMethodsDataResponseStatusEnum } from './authMethodsDataResponse.js';
import CommonResponse from './commonResponse.js';

class AuthMethodsResponse extends CommonResponse {
  data: AuthMethodsDataResponseStatusEnum;

  constructor(data: AuthMethodsDataResponseStatusEnum, responseId: string) {
    super(responseId);
    this.data = data;
  }
}

export default AuthMethodsResponse;
