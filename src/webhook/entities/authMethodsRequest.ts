import CommonRequest from './commonRequest.js';

class AuthMethodsRequest extends CommonRequest {
  data: string;

  constructor(data: string, id: string, projectId: string, action: string, requestId: string) {
    super(id, projectId, action, requestId);
    this.data = data;
  }
}

export default AuthMethodsRequest;
