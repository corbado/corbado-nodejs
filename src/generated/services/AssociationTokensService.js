/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Creates a new association token
*
* associationTokenCreateReq AssociationTokenCreateReq 
* returns associationTokenCreateRsp
* */
const associationTokenCreate = ({ associationTokenCreateReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        associationTokenCreateReq,
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
  associationTokenCreate,
};
