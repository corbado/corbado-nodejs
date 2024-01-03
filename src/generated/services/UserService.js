/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Lists user auth log
*
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* sort String Field sorting (optional)
* filterLeft_Square_BracketRight_Square_Bracket List Field filtering (optional)
* page Integer Page number (optional)
* pageSize Integer Number of items per page (optional)
* returns userAuthLogListRsp
* */
const userAuthLogList = ({ remoteAddress, userAgent, sort, filterLeft_Square_BracketRight_Square_Bracket, page, pageSize }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        remoteAddress,
        userAgent,
        sort,
        filterLeft_Square_BracketRight_Square_Bracket,
        page,
        pageSize,
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
* Creates a new user
*
* userCreateReq UserCreateReq 
* returns userCreateRsp
* */
const userCreate = ({ userCreateReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userCreateReq,
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
* Add a custom login identifier to an existing user
*
* userID String ID of user
* userCustomLoginIdentifierCreateReq UserCustomLoginIdentifierCreateReq 
* returns userCustomLoginIdentifierCreateRsp
* */
const userCustomLoginIdentifierCreate = ({ userID, userCustomLoginIdentifierCreateReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userID,
        userCustomLoginIdentifierCreateReq,
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
* Delete a user's custom login identifier
*
* userID String ID of user
* customLoginIdentifierID String ID of custom login identifier
* userCustomLoginIdentifierDeleteReq UserCustomLoginIdentifierDeleteReq 
* returns genericRsp
* */
const userCustomLoginIdentifierDelete = ({ userID, customLoginIdentifierID, userCustomLoginIdentifierDeleteReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userID,
        customLoginIdentifierID,
        userCustomLoginIdentifierDeleteReq,
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
* Get a user's custom login identifier
*
* userID String ID of user
* customLoginIdentifierID String ID of custom login identifier
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* returns userCustomLoginIdentifierGetRsp
* */
const userCustomLoginIdentifierGet = ({ userID, customLoginIdentifierID, remoteAddress, userAgent }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userID,
        customLoginIdentifierID,
        remoteAddress,
        userAgent,
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
* Deletes a user
*
* userID String ID of user
* userDeleteReq UserDeleteReq 
* returns genericRsp
* */
const userDelete = ({ userID, userDeleteReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userID,
        userDeleteReq,
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
* Provides all register devices for given user
*
* userID String ID of user
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* sort String Field sorting (optional)
* filterLeft_Square_BracketRight_Square_Bracket List Field filtering (optional)
* page Integer Page number (optional)
* pageSize Integer Number of items per page (optional)
* returns userDeviceListRsp
* */
const userDeviceList = ({ userID, remoteAddress, userAgent, sort, filterLeft_Square_BracketRight_Square_Bracket, page, pageSize }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userID,
        remoteAddress,
        userAgent,
        sort,
        filterLeft_Square_BracketRight_Square_Bracket,
        page,
        pageSize,
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
* Add an email to an existing user
*
* userID String ID of user
* userEmailCreateReq UserEmailCreateReq 
* returns userEmailCreateRsp
* */
const userEmailCreate = ({ userID, userEmailCreateReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userID,
        userEmailCreateReq,
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
* Delete a user's email
*
* userID String ID of user
* emailID String ID of email
* userEmailDeleteReq UserEmailDeleteReq 
* returns genericRsp
* */
const userEmailDelete = ({ userID, emailID, userEmailDeleteReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userID,
        emailID,
        userEmailDeleteReq,
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
* Get a user's email
*
* userID String ID of user
* emailID String ID of email
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* returns userEmailGetRsp
* */
const userEmailGet = ({ userID, emailID, remoteAddress, userAgent }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userID,
        emailID,
        remoteAddress,
        userAgent,
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
* Get a user by ID
*
* userID String ID of user
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* returns userGetRsp
* */
const userGet = ({ userID, remoteAddress, userAgent }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userID,
        remoteAddress,
        userAgent,
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
* Lists project users
*
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* sort String Field sorting (optional)
* filterLeft_Square_BracketRight_Square_Bracket List Field filtering (optional)
* page Integer Page number (optional)
* pageSize Integer Number of items per page (optional)
* returns userListRsp
* */
const userList = ({ remoteAddress, userAgent, sort, filterLeft_Square_BracketRight_Square_Bracket, page, pageSize }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        remoteAddress,
        userAgent,
        sort,
        filterLeft_Square_BracketRight_Square_Bracket,
        page,
        pageSize,
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
* Add a phone number to an existing user
*
* userID String ID of user
* userPhoneNumberCreateReq UserPhoneNumberCreateReq 
* returns userPhoneNumberCreateRsp
* */
const userPhoneNumberCreate = ({ userID, userPhoneNumberCreateReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userID,
        userPhoneNumberCreateReq,
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
* Delete a user's phone number
*
* userID String ID of user
* phoneNumberID String ID of phone number
* userPhoneNumberDeleteReq UserPhoneNumberDeleteReq 
* returns genericRsp
* */
const userPhoneNumberDelete = ({ userID, phoneNumberID, userPhoneNumberDeleteReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userID,
        phoneNumberID,
        userPhoneNumberDeleteReq,
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
* Get a user's phone number
*
* userID String ID of user
* phoneNumberID String ID of phone number
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* returns userPhoneNumberGetRsp
* */
const userPhoneNumberGet = ({ userID, phoneNumberID, remoteAddress, userAgent }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userID,
        phoneNumberID,
        remoteAddress,
        userAgent,
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
* Provides aggregated user stats for project
*
* granularity String Data granularity
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* sort String Field sorting (optional)
* filterLeft_Square_BracketRight_Square_Bracket List Field filtering (optional)
* page Integer Page number (optional)
* pageSize Integer Number of items per page (optional)
* returns userStatsListRsp
* */
const userStatsList = ({ granularity, remoteAddress, userAgent, sort, filterLeft_Square_BracketRight_Square_Bracket, page, pageSize }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        granularity,
        remoteAddress,
        userAgent,
        sort,
        filterLeft_Square_BracketRight_Square_Bracket,
        page,
        pageSize,
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
* Updates a user
*
* userID String ID of user
* userUpdateReq UserUpdateReq 
* returns userUpdateRsp
* */
const userUpdate = ({ userID, userUpdateReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userID,
        userUpdateReq,
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
