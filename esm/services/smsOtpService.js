import { BaseError, httpStatusCodes } from '../errors/index.js';
import { Assert, isErrorRsp, Helper } from '../heplers/index.js';
import { SMSOTPApi, } from '../generated/index.js';
class SmsOTP {
    constructor(axios) {
        Assert.notNull(axios);
        this.client = new SMSOTPApi(undefined, '', axios);
    }
    async send(req) {
        Assert.notNull(req);
        try {
            const sendRsp = await this.client.smsCodeSend(req);
            const sendResponse = sendRsp.data;
            if (isErrorRsp(sendResponse)) {
                throw new BaseError('Sms OTP send ErrorRsp', httpStatusCodes.AUTH_RSP_ERROR.code, httpStatusCodes.AUTH_RSP_ERROR.description, httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return sendResponse;
        }
        catch (error) {
            throw Helper.convertToServerException(error);
        }
    }
    async validate(id, req) {
        Assert.notEmptyString(id);
        Assert.notNull(req);
        try {
            const validationRsp = await this.client.smsCodeValidate(id, req);
            const validationResponse = validationRsp.data;
            if (isErrorRsp(validationResponse)) {
                throw new BaseError('Sms OTP validation ErrorRsp', httpStatusCodes.AUTH_RSP_ERROR.code, httpStatusCodes.AUTH_RSP_ERROR.description, httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return validationResponse;
        }
        catch (error) {
            throw Helper.convertToServerException(error);
        }
    }
}
export default SmsOTP;
//# sourceMappingURL=smsOtpService.js.map