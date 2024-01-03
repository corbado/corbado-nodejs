/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Creates a new iOS App Config
*
* iOSAppConfigSaveReq IOSAppConfigSaveReq 
* returns iOSAppConfigSaveRsp
* */
const iOSAppConfigCreate = ({ iOSAppConfigSaveReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        iOSAppConfigSaveReq,
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
* Deletes an iOS App Config
*
* iosAppConfigID String iOS App Config ID from create
* iOSAppConfigDeleteReq IOSAppConfigDeleteReq  (optional)
* returns genericRsp
* */
const iOSAppConfigDelete = ({ iosAppConfigID, iOSAppConfigDeleteReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        iosAppConfigID,
        iOSAppConfigDeleteReq,
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
* Lists iOS App Configs for a project
*
* returns iOSAppConfigListRsp
* */
const iOSAppConfigGet = () => new Promise(
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
* Updates an iOS app config by id
*
* iosAppConfigID String ID from iOS config create
* iOSAppConfigUpdateReq IOSAppConfigUpdateReq  (optional)
* returns iOSAppConfigUpdateRsp
* */
const iOSAppConfigPut = ({ iosAppConfigID, iOSAppConfigUpdateReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        iosAppConfigID,
        iOSAppConfigUpdateReq,
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
  iOSAppConfigCreate,
  iOSAppConfigDelete,
  iOSAppConfigGet,
  iOSAppConfigPut,
};
