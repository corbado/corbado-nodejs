/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Get an email OTP only one time after confirmed
*
* emailCodeID String ID of email OTP
* returns emailCodeGetRsp
* */
const emailCodeGet = ({ emailCodeID }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        emailCodeID,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Creates email code and sends it to given email address
*
* emailCodeSendReq EmailCodeSendReq 
* returns emailCodeSendRsp
* */
const emailCodeSend = ({ emailCodeSendReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        emailCodeSendReq,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Validates email code
*
* emailCodeID String ID of email OTP
* emailCodeValidateReq EmailCodeValidateReq 
* returns emailCodeValidateRsp
* */
const emailCodeValidate = ({ emailCodeID, emailCodeValidateReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        emailCodeID,
        emailCodeValidateReq,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  emailCodeGet,
  emailCodeSend,
  emailCodeValidate,
};
