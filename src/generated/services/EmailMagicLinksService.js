/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Deletes an email magic link
*
* emailLinkID String ID of email magic link
* emailLinksDeleteReq EmailLinksDeleteReq  (optional)
* returns emailLinkValidateRsp
* */
const emailLinkDelete = ({ emailLinkID, emailLinksDeleteReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        emailLinkID,
        emailLinksDeleteReq,
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
* Get an email magic link only one time after confirmed
*
* emailLinkID String ID of email magic link
* returns emailLinkGetRsp
* */
const emailLinkGet = ({ emailLinkID }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        emailLinkID,
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
* Creates email magic link and sends it to given email address
*
* emailLinkSendReq EmailLinkSendReq 
* returns emailLinkSendRsp
* */
const emailLinkSend = ({ emailLinkSendReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        emailLinkSendReq,
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
* Validates email magic link token
*
* emailLinkID String ID of email magic link
* emailLinksValidateReq EmailLinksValidateReq 
* returns emailLinkValidateRsp
* */
const emailLinkValidate = ({ emailLinkID, emailLinksValidateReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        emailLinkID,
        emailLinksValidateReq,
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
  emailLinkDelete,
  emailLinkGet,
  emailLinkSend,
  emailLinkValidate,
};
