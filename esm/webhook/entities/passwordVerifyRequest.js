import CommonRequest from './commonRequest.js';
class PasswordVerifyRequest extends CommonRequest {
    constructor(data, id, projectId, action, requestId) {
        super(id, projectId, action, requestId);
        this.data = data;
    }
}
export default PasswordVerifyRequest;
//# sourceMappingURL=passwordVerifyRequest.js.map