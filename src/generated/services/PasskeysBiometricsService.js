/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Starts association token flow for Passkeys (Biometrics)
*
* webAuthnAssociateStartReq WebAuthnAssociateStartReq 
* returns webAuthnAssociateStartRsp
* */
const webAuthnAssociateStart = ({ webAuthnAssociateStartReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        webAuthnAssociateStartReq,
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
* Completes authentication of a user for Passkeys (Biometrics)
*
* webAuthnFinishReq WebAuthnFinishReq 
* returns webAuthnAuthenticateFinishRsp
* */
const webAuthnAuthenticateFinish = ({ webAuthnFinishReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        webAuthnFinishReq,
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
* Starts authentication of a user for Passkeys (Biometrics)
*
* webAuthnAuthenticateStartReq WebAuthnAuthenticateStartReq 
* returns webAuthnAuthenticateStartRsp
* */
const webAuthnAuthenticateStart = ({ webAuthnAuthenticateStartReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        webAuthnAuthenticateStartReq,
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
* Update authenticator
*
* authenticatorID String ID of authenticator
* webAuthnAuthenticatorUpdateReq WebAuthnAuthenticatorUpdateReq 
* returns genericRsp
* */
const webAuthnAuthenticatorUpdate = ({ authenticatorID, webAuthnAuthenticatorUpdateReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        authenticatorID,
        webAuthnAuthenticatorUpdateReq,
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
* Delete credential
*
* userID String ID of user
* credentialID String ID of credential
* emptyReq EmptyReq 
* returns genericRsp
* */
const webAuthnCredentialDelete = ({ userID, credentialID, emptyReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userID,
        credentialID,
        emptyReq,
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
* Checks if active webauthn credential exists for provided user and device
*
* webAuthnCredentialExistsReq WebAuthnCredentialExistsReq 
* returns webAuthnCredentialExistsRsp
* */
const webAuthnCredentialExists = ({ webAuthnCredentialExistsReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        webAuthnCredentialExistsReq,
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
* Lists webauthn credentials users
*
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* sort String Field sorting (optional)
* filterLeft_Square_BracketRight_Square_Bracket List Field filtering (optional)
* page Integer Page number (optional)
* pageSize Integer Number of items per page (optional)
* returns webAuthnCredentialListRsp
* */
const webAuthnCredentialList = ({ remoteAddress, userAgent, sort, filterLeft_Square_BracketRight_Square_Bracket, page, pageSize }) => new Promise(
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
* Update credential
*
* credentialID String ID of credential
* webAuthnCredentialReq WebAuthnCredentialReq 
* returns webAuthnCredentialRsp
* */
const webAuthnCredentialUpdate = ({ credentialID, webAuthnCredentialReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        credentialID,
        webAuthnCredentialReq,
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
* Starts mediation for Passkeys (Biometrics)
*
* webAuthnMediationStartReq WebAuthnMediationStartReq 
* returns webAuthnMediationStartRsp
* */
const webAuthnMediationStart = ({ webAuthnMediationStartReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        webAuthnMediationStartReq,
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
* Completes registration of a user for Passkeys (Biometrics)
*
* webAuthnFinishReq WebAuthnFinishReq 
* returns webAuthnRegisterFinishRsp
* */
const webAuthnRegisterFinish = ({ webAuthnFinishReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        webAuthnFinishReq,
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
* Starts registration of a user for Passkeys (Biometrics)
*
* webAuthnRegisterStartReq WebAuthnRegisterStartReq  (optional)
* returns webAuthnRegisterStartRsp
* */
const webAuthnRegisterStart = ({ webAuthnRegisterStartReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        webAuthnRegisterStartReq,
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
* Creates a new setting for Passkeys (Biometrics)
*
* webauthnSettingCreateReq WebauthnSettingCreateReq  (optional)
* returns webauthnSettingCreateRsp
* */
const webAuthnSettingCreate = ({ webauthnSettingCreateReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        webauthnSettingCreateReq,
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
* Deletes a setting by id for Passkeys (Biometrics)
*
* settingID String ID from create
* webauthnSettingDeleteReq WebauthnSettingDeleteReq  (optional)
* returns genericRsp
* */
const webAuthnSettingDelete = ({ settingID, webauthnSettingDeleteReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        settingID,
        webauthnSettingDeleteReq,
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
* Gets a setting by id for Passkeys (Biometrics)
*
* settingID String ID from create
* returns webauthnSettingGetRsp
* */
const webAuthnSettingGet = ({ settingID }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        settingID,
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
* Lists all settings for Passkeys (Biometrics)
*
* remoteAddress String Client's remote address (optional)
* userAgent String Client's user agent (optional)
* sort String Field sorting (optional)
* filterLeft_Square_BracketRight_Square_Bracket List Field filtering (optional)
* page Integer Page number (optional)
* pageSize Integer Number of items per page (optional)
* returns webauthnSettingListRsp
* */
const webAuthnSettingList = ({ remoteAddress, userAgent, sort, filterLeft_Square_BracketRight_Square_Bracket, page, pageSize }) => new Promise(
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
* Updates a setting by id for Passkeys (Biometrics)
*
* settingID String ID from create
* webauthnSettingUpdateReq WebauthnSettingUpdateReq  (optional)
* returns webauthnSettingUpdateRsp
* */
const webAuthnSettingPut = ({ settingID, webauthnSettingUpdateReq }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        settingID,
        webauthnSettingUpdateReq,
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
