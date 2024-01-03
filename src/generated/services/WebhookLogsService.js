/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Lists webhook logs for given filters
*
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* sort String Field sorting (optional)
* filterLeft_Square_BracketRight_Square_Bracket List Field filtering (optional)
* page Integer Page number (optional)
* pageSize Integer Number of items per page (optional)
* returns webhookLogsListRsp
* */
const webhookLogsList = ({ remoteAddress, userAgent, sort, filterLeft_Square_BracketRight_Square_Bracket, page, pageSize }) => new Promise(
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

module.exports = {
  webhookLogsList,
};
