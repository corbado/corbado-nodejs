/**
 * The PasskeysBiometricsController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/PasskeysBiometricsService');
const webAuthnAssociateStart = async (request, response) => {
  await Controller.handleRequest(request, response, service.webAuthnAssociateStart);
};

const webAuthnAuthenticateFinish = async (request, response) => {
  await Controller.handleRequest(request, response, service.webAuthnAuthenticateFinish);
};

const webAuthnAuthenticateStart = async (request, response) => {
  await Controller.handleRequest(request, response, service.webAuthnAuthenticateStart);
};

const webAuthnAuthenticatorUpdate = async (request, response) => {
  await Controller.handleRequest(request, response, service.webAuthnAuthenticatorUpdate);
};

const webAuthnCredentialDelete = async (request, response) => {
  await Controller.handleRequest(request, response, service.webAuthnCredentialDelete);
};

const webAuthnCredentialExists = async (request, response) => {
  await Controller.handleRequest(request, response, service.webAuthnCredentialExists);
};

const webAuthnCredentialList = async (request, response) => {
  await Controller.handleRequest(request, response, service.webAuthnCredentialList);
};

const webAuthnCredentialUpdate = async (request, response) => {
  await Controller.handleRequest(request, response, service.webAuthnCredentialUpdate);
};

const webAuthnMediationStart = async (request, response) => {
  await Controller.handleRequest(request, response, service.webAuthnMediationStart);
};

const webAuthnRegisterFinish = async (request, response) => {
  await Controller.handleRequest(request, response, service.webAuthnRegisterFinish);
};

const webAuthnRegisterStart = async (request, response) => {
  await Controller.handleRequest(request, response, service.webAuthnRegisterStart);
};

const webAuthnSettingCreate = async (request, response) => {
  await Controller.handleRequest(request, response, service.webAuthnSettingCreate);
};

const webAuthnSettingDelete = async (request, response) => {
  await Controller.handleRequest(request, response, service.webAuthnSettingDelete);
};

const webAuthnSettingGet = async (request, response) => {
  await Controller.handleRequest(request, response, service.webAuthnSettingGet);
};

const webAuthnSettingList = async (request, response) => {
  await Controller.handleRequest(request, response, service.webAuthnSettingList);
};

const webAuthnSettingPut = async (request, response) => {
  await Controller.handleRequest(request, response, service.webAuthnSettingPut);
};


module.exports = {
  webAuthnAssociateStart,
  webAuthnAuthenticateFinish,
  webAuthnAuthenticateStart,
  webAuthnAuthenticatorUpdate,
  webAuthnCredentialDelete,
  webAuthnCredentialExists,
  webAuthnCredentialList,
  webAuthnCredentialUpdate,
  webAuthnMediationStart,
  webAuthnRegisterFinish,
  webAuthnRegisterStart,
  webAuthnSettingCreate,
  webAuthnSettingDelete,
  webAuthnSettingGet,
  webAuthnSettingList,
  webAuthnSettingPut,
};
