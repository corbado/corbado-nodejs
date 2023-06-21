"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _assert = _interopRequireDefault(require("assert"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _projectID = /*#__PURE__*/new WeakMap();
var _apiSecret = /*#__PURE__*/new WeakMap();
var _frontendAPI = /*#__PURE__*/new WeakMap();
var _backendAPI = /*#__PURE__*/new WeakMap();
var _shortSessionCookieName = /*#__PURE__*/new WeakMap();
var _cacheMaxAge = /*#__PURE__*/new WeakMap();
var _client = /*#__PURE__*/new WeakMap();
var _emailTemplates = /*#__PURE__*/new WeakMap();
var _webhookUsername = /*#__PURE__*/new WeakMap();
var _webhookPassword = /*#__PURE__*/new WeakMap();
var Configuration = /*#__PURE__*/function () {
  function Configuration(projectID, apiSecret) {
    _classCallCheck(this, Configuration);
    _classPrivateFieldInitSpec(this, _projectID, {
      writable: true,
      value: ''
    });
    _classPrivateFieldInitSpec(this, _apiSecret, {
      writable: true,
      value: ''
    });
    _classPrivateFieldInitSpec(this, _frontendAPI, {
      writable: true,
      value: ''
    });
    _classPrivateFieldInitSpec(this, _backendAPI, {
      writable: true,
      value: 'https://backendapi.corbado.io'
    });
    _classPrivateFieldInitSpec(this, _shortSessionCookieName, {
      writable: true,
      value: 'cbo_short_session'
    });
    _classPrivateFieldInitSpec(this, _cacheMaxAge, {
      writable: true,
      value: 10 * 60 * 1000
    });
    _classPrivateFieldInitSpec(this, _client, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _emailTemplates, {
      writable: true,
      value: {
        EMAIL_SIGN_UP_TEMPLATE: 'email_signup_user',
        EMAIL_LOGIN_TEMPLATE: 'email_login_user',
        PASSKEY_SIGN_UP_TEMPLATE: 'webauthn_signup_user',
        PASSKEY_LOGIN_TEMPLATE: 'webauthn_login_user'
      }
    });
    _classPrivateFieldInitSpec(this, _webhookUsername, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _webhookPassword, {
      writable: true,
      value: void 0
    });
    if (!projectID || !apiSecret) {
      throw new Error('Missing environment variables project ID and/or API secret.');
    }
    _classPrivateFieldSet(this, _projectID, projectID);
    _classPrivateFieldSet(this, _apiSecret, apiSecret);
  }
  _createClass(Configuration, [{
    key: "projectID",
    get: function get() {
      return _classPrivateFieldGet(this, _projectID);
    }
  }, {
    key: "apiSecret",
    get: function get() {
      return _classPrivateFieldGet(this, _apiSecret);
    }
  }, {
    key: "backendAPI",
    get: function get() {
      return _classPrivateFieldGet(this, _backendAPI);
    },
    set: function set(value) {
      (0, _assert["default"])(value.length > 0, 'Backend API is invalid');
      (0, _assert["default"])(value.startsWith('http://') || value.startsWith('https://'), 'Backend API url is invalid');
      _classPrivateFieldSet(this, _backendAPI, value);
    }
  }, {
    key: "frontendAPI",
    get: function get() {
      if (_classPrivateFieldGet(this, _frontendAPI) === '') {
        if (_classPrivateFieldGet(this, _projectID) === '') {
          throw new Error('Project ID empty, set Project ID first');
        }
        _classPrivateFieldSet(this, _frontendAPI, 'https://' + _classPrivateFieldGet(this, _projectID) + '.frontendapi.corbado.io');
      }
      return _classPrivateFieldGet(this, _frontendAPI);
    },
    set: function set(value) {
      (0, _assert["default"])(value.length > 0, 'Frontend API is invalid');
      (0, _assert["default"])(value.startsWith('http://') || value.startsWith('https://'), 'Frontend API is invalid');
      _classPrivateFieldSet(this, _frontendAPI, value);
    }
  }, {
    key: "shortSessionCookieName",
    get: function get() {
      return _classPrivateFieldGet(this, _shortSessionCookieName);
    },
    set: function set(value) {
      (0, _assert["default"])(value.length > 0, 'Short session cookie name is invalid');
      _classPrivateFieldSet(this, _shortSessionCookieName, value);
    }
  }, {
    key: "cacheMaxAge",
    get: function get() {
      return _classPrivateFieldGet(this, _cacheMaxAge);
    },
    set: function set(value) {
      (0, _assert["default"])(value > 0, 'Cache max age is invalid');
      _classPrivateFieldSet(this, _cacheMaxAge, value);
    }
  }, {
    key: "client",
    get: function get() {
      return _classPrivateFieldGet(this, _client);
    },
    set: function set(client) {
      _classPrivateFieldSet(this, _client, client);
    }
  }, {
    key: "emailTemplates",
    get: function get() {
      return _classPrivateFieldGet(this, _emailTemplates);
    },
    set: function set(value) {
      (0, _assert["default"])(_typeof(value) === "object", 'Email templates is invalid');
      _classPrivateFieldSet(this, _emailTemplates, value);
    }
  }, {
    key: "webhookUsername",
    get: function get() {
      return _classPrivateFieldGet(this, _webhookUsername);
    },
    set: function set(webhookUsername) {
      _classPrivateFieldSet(this, _webhookUsername, webhookUsername);
    }
  }, {
    key: "webhookPassword",
    get: function get() {
      return _classPrivateFieldGet(this, _webhookPassword);
    },
    set: function set(webhookPassword) {
      _classPrivateFieldSet(this, _webhookPassword, webhookPassword);
    }
  }]);
  return Configuration;
}();
var _default = Configuration;
exports["default"] = _default;