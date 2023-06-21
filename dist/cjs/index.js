"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Configuration", {
  enumerable: true,
  get: function get() {
    return _configuration["default"];
  }
});
Object.defineProperty(exports, "SDK", {
  enumerable: true,
  get: function get() {
    return _SDK["default"];
  }
});
var _SDK = _interopRequireDefault(require("./SDK.js"));
var _configuration = _interopRequireDefault(require("./config/configuration.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }