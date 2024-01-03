/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Get a long session by sessionID
*
* sessionID String ID of session
* returns longSessionGetRsp
* */
const longSessionGet = ({ sessionID }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        sessionID,
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
* Lists long sessions by provided filters
*
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* sort String Field sorting (optional)
* filterLeft_Square_BracketRight_Square_Bracket List Field filtering (optional)
* page Integer Page number (optional)
* pageSize Integer Number of items per page (optional)
* returns longSessionListRsp
* */
const longSessionList = ({ remoteAddress, userAgent, sort, filterLeft_Square_BracketRight_Square_Bracket, page, pageSize }) => new Promise(
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
* Revokes an active long session by sessionID
*
* sessionID String ID of session
* longSessionRevokeReq LongSessionRevokeReq  (optional)
* returns genericRsp
* */
const longSessionRevoke = ({ sessionID, longSessionRevokeReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        sessionID,
        longSessionRevokeReq,
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
  longSessionGet,
  longSessionList,
  longSessionRevoke,
};
