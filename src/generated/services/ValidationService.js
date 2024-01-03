/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Validates email
*
* validateEmailReq ValidateEmailReq 
* returns validateEmailRsp
* */
const validateEmail = ({ validateEmailReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        validateEmailReq,
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
* Validates phone number
*
* validatePhoneNumberReq ValidatePhoneNumberReq 
* returns validatePhoneNumberRsp
* */
const validatePhoneNumber = ({ validatePhoneNumberReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        validatePhoneNumberReq,
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
  validateEmail,
  validatePhoneNumber,
};
