/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Retrieves file containing the named example project
*
* fileName String Name of the example to get
* returns exampleGetRsp
* */
const exampleGet = ({ fileName }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        fileName,
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
  exampleGet,
};
