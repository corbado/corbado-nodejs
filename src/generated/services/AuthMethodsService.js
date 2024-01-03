/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Retrieves possible authentication methods for provided username
*
* authMethodsListReq AuthMethodsListReq 
* returns authMethodsListRsp
* */
const authMethodsList = ({ authMethodsListReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        authMethodsListReq,
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
  authMethodsList,
};
