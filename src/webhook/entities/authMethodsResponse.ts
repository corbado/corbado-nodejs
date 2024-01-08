import { AuthMethodsDataResponseStatusEnum } from './authMethodsDataResponse';
import CommonResponse from './commonResponse';

class AuthMethodsResponse extends CommonResponse {
  data: AuthMethodsDataResponseStatusEnum;

  constructor(data: AuthMethodsDataResponseStatusEnum, responseId: string) {
    super(responseId);
    this.data = data;
  }
}

export default AuthMethodsResponse;
