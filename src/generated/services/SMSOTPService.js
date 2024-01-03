/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Creates SMS OTP and sends it to given phone number
*
* smsCodeSendReq SmsCodeSendReq 
* returns smsCodeSendRsp
* */
const smsCodeSend = ({ smsCodeSendReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        smsCodeSendReq,
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
* Validates SMS OTP
*
* smsCodeID String ID of SMS OTP
* smsCodeValidateReq SmsCodeValidateReq 
* returns smsCodeValidateRsp
* */
const smsCodeValidate = ({ smsCodeID, smsCodeValidateReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        smsCodeID,
        smsCodeValidateReq,
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
  smsCodeSend,
  smsCodeValidate,
};
