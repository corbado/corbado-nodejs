import CommonResponse from './commonResponse.js';

class PasswordVerifyResponse extends CommonResponse {
  data: string;

  constructor(data: string, responseId: string) {
    super(responseId);
    this.data = data;
  }
}

export default PasswordVerifyResponse;
