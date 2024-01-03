/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Creates a new Android App Configuration
*
* androidAppConfigSaveReq AndroidAppConfigSaveReq 
* returns androidAppConfigSaveRsp
* */
const androidAppConfigCreate = ({ androidAppConfigSaveReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        androidAppConfigSaveReq,
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
* Deletes an Android App Config
*
* androidAppConfigID String Android App Config ID from create
* androidAppConfigDeleteReq AndroidAppConfigDeleteReq  (optional)
* returns genericRsp
* */
const androidAppConfigDelete = ({ androidAppConfigID, androidAppConfigDeleteReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        androidAppConfigID,
        androidAppConfigDeleteReq,
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
* Lists Android App Configurations for a project
*
* returns androidAppConfigListRsp
* */
const androidAppConfigGet = () => new Promise(
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
/**
* Updates an Android app config by id
*
* androidAppConfigID String ID from Android config create
* androidAppConfigUpdateReq AndroidAppConfigUpdateReq  (optional)
* returns androidAppConfigUpdateRsp
* */
const androidAppConfigPut = ({ androidAppConfigID, androidAppConfigUpdateReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        androidAppConfigID,
        androidAppConfigUpdateReq,
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
  androidAppConfigCreate,
  androidAppConfigDelete,
  androidAppConfigGet,
  androidAppConfigPut,
};
