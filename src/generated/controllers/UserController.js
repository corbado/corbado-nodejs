/**
 * The UserController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/UserService');
const userAuthLogList = async (request, response) => {
  await Controller.handleRequest(request, response, service.userAuthLogList);
};

const userCreate = async (request, response) => {
  await Controller.handleRequest(request, response, service.userCreate);
};

const userCustomLoginIdentifierCreate = async (request, response) => {
  await Controller.handleRequest(request, response, service.userCustomLoginIdentifierCreate);
};

const userCustomLoginIdentifierDelete = async (request, response) => {
  await Controller.handleRequest(request, response, service.userCustomLoginIdentifierDelete);
};

const userCustomLoginIdentifierGet = async (request, response) => {
  await Controller.handleRequest(request, response, service.userCustomLoginIdentifierGet);
};

const userDelete = async (request, response) => {
  await Controller.handleRequest(request, response, service.userDelete);
};

const userDeviceList = async (request, response) => {
  await Controller.handleRequest(request, response, service.userDeviceList);
};

const userEmailCreate = async (request, response) => {
  await Controller.handleRequest(request, response, service.userEmailCreate);
};

const userEmailDelete = async (request, response) => {
  await Controller.handleRequest(request, response, service.userEmailDelete);
};

const userEmailGet = async (request, response) => {
  await Controller.handleRequest(request, response, service.userEmailGet);
};

const userGet = async (request, response) => {
  await Controller.handleRequest(request, response, service.userGet);
};

const userList = async (request, response) => {
  await Controller.handleRequest(request, response, service.userList);
};

const userPhoneNumberCreate = async (request, response) => {
  await Controller.handleRequest(request, response, service.userPhoneNumberCreate);
};

const userPhoneNumberDelete = async (request, response) => {
  await Controller.handleRequest(request, response, service.userPhoneNumberDelete);
};

const userPhoneNumberGet = async (request, response) => {
  await Controller.handleRequest(request, response, service.userPhoneNumberGet);
};

const userStatsList = async (request, response) => {
  await Controller.handleRequest(request, response, service.userStatsList);
};

const userUpdate = async (request, response) => {
  await Controller.handleRequest(request, response, service.userUpdate);
};


module.exports = {
  userAuthLogList,
  userCreate,
  userCustomLoginIdentifierCreate,
  userCustomLoginIdentifierDelete,
  userCustomLoginIdentifierGet,
  userDelete,
  userDeviceList,
  userEmailCreate,
  userEmailDelete,
  userEmailGet,
  userGet,
  userList,
  userPhoneNumberCreate,
  userPhoneNumberDelete,
  userPhoneNumberGet,
  userStatsList,
  userUpdate,
};
