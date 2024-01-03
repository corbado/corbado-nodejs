/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Creates a new SMS template
*
* smsTemplateCreateReq SmsTemplateCreateReq 
* returns smsTemplateCreateRsp
* */
const smsTemplateCreate = ({ smsTemplateCreateReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        smsTemplateCreateReq,
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
* Deletes an SMS template
*
* smsTemplateID String ID of SMS template
* smsTemplateDeleteReq SmsTemplateDeleteReq 
* returns genericRsp
* */
const smsTemplateDelete = ({ smsTemplateID, smsTemplateDeleteReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        smsTemplateID,
        smsTemplateDeleteReq,
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
  smsTemplateCreate,
  smsTemplateDelete,
};
