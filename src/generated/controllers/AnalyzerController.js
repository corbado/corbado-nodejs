/**
 * The AnalyzerController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/AnalyzerService');
const trackingAllRequest = async (request, response) => {
  await Controller.handleRequest(request, response, service.trackingAllRequest);
};

const trackingBackupStateGet = async (request, response) => {
  await Controller.handleRequest(request, response, service.trackingBackupStateGet);
};

const trackingBrowserDetailedStatsList = async (request, response) => {
  await Controller.handleRequest(request, response, service.trackingBrowserDetailedStatsList);
};

const trackingBrowserStatsList = async (request, response) => {
  await Controller.handleRequest(request, response, service.trackingBrowserStatsList);
};

const trackingDetailedStatsList = async (request, response) => {
  await Controller.handleRequest(request, response, service.trackingDetailedStatsList);
};

const trackingEnumsGet = async (request, response) => {
  await Controller.handleRequest(request, response, service.trackingEnumsGet);
};

const trackingOSDetailedStatsList = async (request, response) => {
  await Controller.handleRequest(request, response, service.trackingOSDetailedStatsList);
};

const trackingOSStatsList = async (request, response) => {
  await Controller.handleRequest(request, response, service.trackingOSStatsList);
};

const trackingStatsList = async (request, response) => {
  await Controller.handleRequest(request, response, service.trackingStatsList);
};


module.exports = {
  trackingAllRequest,
  trackingBackupStateGet,
  trackingBrowserDetailedStatsList,
  trackingBrowserStatsList,
  trackingDetailedStatsList,
  trackingEnumsGet,
  trackingOSDetailedStatsList,
  trackingOSStatsList,
  trackingStatsList,
};
