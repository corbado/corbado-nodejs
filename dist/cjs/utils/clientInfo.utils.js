"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utils = void 0;
var getRemoteAddress = function getRemoteAddress(req) {
  var _req$socket$remoteAdd;
  var forwardedFor = req.headers['x-forwarded-for'];
  if (forwardedFor) {
    if (Array.isArray(forwardedFor)) {
      // If 'x-forwarded-for' header is an array, use the first IP address in the array
      return forwardedFor[0].trim();
    } else {
      // If 'x-forwarded-for' header is a string, split it by comma and return the first IP address
      return forwardedFor.split(',')[0].trim();
    }
  }

  // Otherwise, return the IP address from the remote socket
  return (_req$socket$remoteAdd = req.socket.remoteAddress) !== null && _req$socket$remoteAdd !== void 0 ? _req$socket$remoteAdd : '';
};
var getClientInfo = function getClientInfo(req) {
  return {
    remoteAddress: getRemoteAddress(req),
    userAgent: req.get('user-agent')
  };
};
var utils = {
  getClientInfo: getClientInfo
};
exports.utils = utils;