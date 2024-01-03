/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Provides project's passkeys raw tracking data per visitor
*
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* sort String Field sorting (optional)
* filterLeft_Square_BracketRight_Square_Bracket List Field filtering (optional)
* page Integer Page number (optional)
* pageSize Integer Number of items per page (optional)
* returns trackingRawListRsp
* */
const trackingAllRequest = ({ remoteAddress, userAgent, sort, filterLeft_Square_BracketRight_Square_Bracket, page, pageSize }) => new Promise(
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
* Provides tracking credential backup state data
*
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* returns trackingBackupStateGetRsp
* */
const trackingBackupStateGet = ({ remoteAddress, userAgent }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
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
* Provides detailed browser tracking data
*
* granularity String Data granularity
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* sort String Field sorting (optional)
* filterLeft_Square_BracketRight_Square_Bracket List Field filtering (optional)
* page Integer Page number (optional)
* pageSize Integer Number of items per page (optional)
* returns trackingBrowserDetailedStatsListRsp
* */
const trackingBrowserDetailedStatsList = ({ granularity, remoteAddress, userAgent, sort, filterLeft_Square_BracketRight_Square_Bracket, page, pageSize }) => new Promise(
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
* Provides browser tracking data
*
* granularity String Data granularity
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* sort String Field sorting (optional)
* filterLeft_Square_BracketRight_Square_Bracket List Field filtering (optional)
* page Integer Page number (optional)
* pageSize Integer Number of items per page (optional)
* returns trackingBrowserStatsListRsp
* */
const trackingBrowserStatsList = ({ granularity, remoteAddress, userAgent, sort, filterLeft_Square_BracketRight_Square_Bracket, page, pageSize }) => new Promise(
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
* Provides detailed tracking data
*
* granularity String Data granularity
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* sort String Field sorting (optional)
* filterLeft_Square_BracketRight_Square_Bracket List Field filtering (optional)
* page Integer Page number (optional)
* pageSize Integer Number of items per page (optional)
* returns trackingDetailedStatsListRsp
* */
const trackingDetailedStatsList = ({ granularity, remoteAddress, userAgent, sort, filterLeft_Square_BracketRight_Square_Bracket, page, pageSize }) => new Promise(
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
* Provides tracking enum values
*
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* returns trackingEnumsGetRsp
* */
const trackingEnumsGet = ({ remoteAddress, userAgent }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
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
* Provides detailed OS tracking data
*
* granularity String Data granularity
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* sort String Field sorting (optional)
* filterLeft_Square_BracketRight_Square_Bracket List Field filtering (optional)
* page Integer Page number (optional)
* pageSize Integer Number of items per page (optional)
* returns trackingOSDetailedStatsListRsp
* */
const trackingOSDetailedStatsList = ({ granularity, remoteAddress, userAgent, sort, filterLeft_Square_BracketRight_Square_Bracket, page, pageSize }) => new Promise(
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
* Provides os tracking data
*
* granularity String Data granularity
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* sort String Field sorting (optional)
* filterLeft_Square_BracketRight_Square_Bracket List Field filtering (optional)
* page Integer Page number (optional)
* pageSize Integer Number of items per page (optional)
* returns trackingOSStatsListRsp
* */
const trackingOSStatsList = ({ granularity, remoteAddress, userAgent, sort, filterLeft_Square_BracketRight_Square_Bracket, page, pageSize }) => new Promise(
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
* Provides aggregated statstics for project's passkeys tracking data
*
* granularity String Data granularity
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* sort String Field sorting (optional)
* filterLeft_Square_BracketRight_Square_Bracket List Field filtering (optional)
* page Integer Page number (optional)
* pageSize Integer Number of items per page (optional)
* returns trackingStatsListRsp
* */
const trackingStatsList = ({ granularity, remoteAddress, userAgent, sort, filterLeft_Square_BracketRight_Square_Bracket, page, pageSize }) => new Promise(
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
