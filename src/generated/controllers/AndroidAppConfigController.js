/**
 * The AndroidAppConfigController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/AndroidAppConfigService');
const androidAppConfigCreate = async (request, response) => {
  await Controller.handleRequest(request, response, service.androidAppConfigCreate);
};

const androidAppConfigDelete = async (request, response) => {
  await Controller.handleRequest(request, response, service.androidAppConfigDelete);
};

const androidAppConfigGet = async (request, response) => {
  await Controller.handleRequest(request, response, service.androidAppConfigGet);
};

const androidAppConfigPut = async (request, response) => {
  await Controller.handleRequest(request, response, service.androidAppConfigPut);
};


module.exports = {
  androidAppConfigCreate,
  androidAppConfigDelete,
  androidAppConfigGet,
  androidAppConfigPut,
};
