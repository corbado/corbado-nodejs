/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Creates an API secret
*
* projectSecretCreateReq ProjectSecretCreateReq  (optional)
* returns projectSecretCreateRsp
* */
const projectSecretCreate = ({ projectSecretCreateReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        projectSecretCreateReq,
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
* Deletes API secret
*
* secretID String Secret ID from create
* projectSecretDeleteReq ProjectSecretDeleteReq  (optional)
* returns genericRsp
* */
const projectSecretDelete = ({ secretID, projectSecretDeleteReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        secretID,
        projectSecretDeleteReq,
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
* Lists API secrets
*
* returns projectSecretListRsp
* */
const projectSecretList = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
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
  projectSecretCreate,
  projectSecretDelete,
  projectSecretList,
};
