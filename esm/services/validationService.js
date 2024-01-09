import { BaseError, httpStatusCodes } from '../errors/index.js';
import { Assert, Helper, isErrorRsp } from '../heplers/index.js';
import { ValidationApi, } from '../generated/index.js';
class Validation {
    constructor(axios) {
        Assert.notNull(axios);
        this.client = new ValidationApi(undefined, '', axios);
    }
    async validateEmail(req) {
        Assert.notNull(req);
        try {
            const emailValidationRsp = await this.client.validateEmail(req);
            const emailValidationResponse = emailValidationRsp.data;
            if (isErrorRsp(emailValidationResponse)) {
                throw new BaseError('Email validation ErrorRsp', httpStatusCodes.AUTH_RSP_ERROR.code, httpStatusCodes.AUTH_RSP_ERROR.description, httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return emailValidationResponse;
        }
        catch (error) {
            throw Helper.convertToServerException(error);
        }
    }
    async validatePhoneNumber(req) {
        Assert.notNull(req);
        try {
            const phoneValidationRsp = await this.client.validatePhoneNumber(req);
            const phoneValidationResponse = phoneValidationRsp.data;
            if (isErrorRsp(phoneValidationResponse)) {
                throw new BaseError('Phone number validation ErrorRsp', httpStatusCodes.AUTH_RSP_ERROR.code, httpStatusCodes.AUTH_RSP_ERROR.description, httpStatusCodes.AUTH_RSP_ERROR.isOperational);
            }
            return phoneValidationResponse;
        }
        catch (error) {
            throw Helper.convertToServerException(error);
        }
    }
}
export default Validation;
//# sourceMappingURL=validationService.js.map