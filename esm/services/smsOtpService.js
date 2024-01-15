import { BaseError, httpStatusCodes } from '../errors/index.js';
import { Assert, isErrorRsp, Helper } from '../helpers/index.js';
import { SMSOTPApi, } from '../generated/index.js';
class SmsOTP {
    constructor(axios) {
        Assert.notNull(axios, 'SmsOtp Axios instance must not be null');
        this.client = new SMSOTPApi(undefined, '', axios);
    }
    async send(req) {
        Assert.notNull(req, 'SmsOtp.send() "req" param must not be null');
        try {
            const sendRsp = await this.client.smsCodeSend(req);
            const sendResponse = sendRsp.data;
            if (isErrorRsp(sendResponse)) {
                throw new BaseError('Sms OTP send ErrorRsp', httpStatusCodes.AUTH_RSP_ERROR.code, httpStatusCodes.AUTH_RSP_ERROR.description, httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return sendResponse;
        }
        catch (error) {
            throw Helper.convertToServerError(error, 'SmsOtp.send()');
        }
    }
    async validate(id, req) {
        Assert.notEmptyString(id, 'SmsOtp.validate() "id" param must not be empty');
        Assert.notNull(req, 'SmsOtp.validate() "req" param must not be null');
        try {
            const validationRsp = await this.client.smsCodeValidate(id, req);
            const validationResponse = validationRsp.data;
            if (isErrorRsp(validationResponse)) {
                throw new BaseError('Sms OTP validation ErrorRsp', httpStatusCodes.AUTH_RSP_ERROR.code, httpStatusCodes.AUTH_RSP_ERROR.description, httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return validationResponse;
        }
        catch (error) {
            throw Helper.convertToServerError(error, 'SmsOtp.validate()');
        }
    }
}
export default SmsOTP;
//# sourceMappingURL=smsOtpService.js.map