import CommonResponse from './commonResponse';

class AuthMethodsResponse extends CommonResponse {
  data: string;

  constructor(data: string, responseId: string) {
    super(responseId);
    this.data = data;
  }
}

export default AuthMethodsResponse;
