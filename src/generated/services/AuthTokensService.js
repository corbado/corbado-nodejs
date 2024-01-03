/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Validates auth token and returns attached user data
*
* authTokenValidateReq AuthTokenValidateReq 
* returns authTokenValidateRsp
* */
const authTokenValidate = ({ authTokenValidateReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        authTokenValidateReq,
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
  authTokenValidate,
};
