/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Creates a new email template
*
* emailTemplateCreateReq EmailTemplateCreateReq 
* returns emailTemplateCreateRsp
* */
const emailTemplateCreate = ({ emailTemplateCreateReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        emailTemplateCreateReq,
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
* Deletes an email template
*
* emailTemplateID String ID of email template
* emailTemplateDeleteReq EmailTemplateDeleteReq 
* returns genericRsp
* */
const emailTemplateDelete = ({ emailTemplateID, emailTemplateDeleteReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        emailTemplateID,
        emailTemplateDeleteReq,
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
  emailTemplateCreate,
  emailTemplateDelete,
};
