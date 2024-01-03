/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Retrieves session config by projectID inferred from authentication
*
* appType AppType Application type (optional)
* returns sessionConfigGetRsp
* */
const sessionConfigGet = ({ appType }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        appType,
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
* Updates session config
*
* sessionConfigUpdateReq SessionConfigUpdateReq 
* returns genericRsp
* */
const sessionConfigUpdate = ({ sessionConfigUpdateReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        sessionConfigUpdateReq,
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
  sessionConfigGet,
  sessionConfigUpdate,
};
