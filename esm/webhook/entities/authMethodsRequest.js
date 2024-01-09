import CommonRequest from './commonRequest.js';
class AuthMethodsRequest extends CommonRequest {
    constructor(data, id, projectId, action, requestId) {
        super(id, projectId, action, requestId);
        this.data = data;
    }
}
export default AuthMethodsRequest;
//# sourceMappingURL=authMethodsRequest.js.map