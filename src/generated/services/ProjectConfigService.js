/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Activates the project
*
* emptyReq EmptyReq 
* returns genericRsp
* */
const projectActivate = ({ emptyReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        emptyReq,
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
* Retrieves project config by projectID inferred from authentication
*
* returns projectConfigGetRsp
* */
const projectConfigGet = () => new Promise(
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
* Saves project config
*
* projectConfigSaveReq ProjectConfigSaveReq 
* returns genericRsp
* */
const projectConfigSave = ({ projectConfigSaveReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        projectConfigSaveReq,
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
* Tests webhook backend
*
* projectConfigWebhookTestReq ProjectConfigWebhookTestReq 
* returns projectConfigWebhookTestRsp
* */
const projectConfigWebhookTest = ({ projectConfigWebhookTestReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        projectConfigWebhookTestReq,
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
  projectActivate,
  projectConfigGet,
  projectConfigSave,
  projectConfigWebhookTest,
};
