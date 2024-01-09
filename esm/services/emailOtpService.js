import { BaseError, httpStatusCodes } from '../errors/index.js';
import { Assert, isErrorRsp, Helper } from '../heplers/index.js';
import { EmailOTPApi, } from '../generated/index.js';
class EmailOTP {
    constructor(axios) {
        Assert.notNull(axios);
        this.client = new EmailOTPApi(undefined, '', axios);
    }
    async send(req) {
        Assert.notNull(req);
        try {
            const response = await this.client.emailCodeSend(req);
            const rsp = response.data;
            if (isErrorRsp(rsp)) {
                throw new BaseError('Email OTP send ErrorRsp', httpStatusCodes.AUTH_RSP_ERROR.code, httpStatusCodes.AUTH_RSP_ERROR.description, httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return rsp;
        }
        catch (error) {
            throw Helper.convertToServerException(error);
        }
    }
    async validate(id, req) {
        Assert.notEmptyString(id);
        Assert.notNull(req);
        try {
            const response = await this.client.emailCodeValidate(id, req);
            const rsp = response.data;
            if (isErrorRsp(rsp)) {
                throw new BaseError('Emaiil OTP validation ErrorRsp', httpStatusCodes.AUTH_RSP_ERROR.code, httpStatusCodes.AUTH_RSP_ERROR.description, httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return rsp;
        }
        catch (error) {
            throw Helper.convertToServerException(error);
        }
    }
}
export default EmailOTP;
//# sourceMappingURL=emailOtpService.js.map