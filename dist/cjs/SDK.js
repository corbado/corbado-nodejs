"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _passkeysService = _interopRequireDefault(require("./services/passkeys.service.js"));
var _emaillinksService = _interopRequireDefault(require("./services/emaillinks.service.js"));
var _authtokensService = _interopRequireDefault(require("./services/authtokens.service.js"));
var _sessionService = _interopRequireDefault(require("./services/session.service.js"));
var _webhooksService = _interopRequireDefault(require("./services/webhooks.service.js"));
var _webhookMiddleware = _interopRequireDefault(require("./middlewares/webhookMiddleware.js"));
var _usersService = _interopRequireDefault(require("./services/users.service.js"));
var _CorbadoApi = _interopRequireDefault(require("./services/CorbadoApi.js"));
var _clientInfoUtils = require("./utils/clientInfo.utils.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
/**
 * The SDK class provides access to various services, including PasskeyService, EmailLinkService, SessionService, WebhookService.
 * It also provides access to utility functions, and middleware, that can help to easily integrate SDK into your application.
 * @class
 */
var _config = /*#__PURE__*/new WeakMap();
var _client = /*#__PURE__*/new WeakMap();
var _passkeys = /*#__PURE__*/new WeakMap();
var _emailLinks = /*#__PURE__*/new WeakMap();
var _authTokens = /*#__PURE__*/new WeakMap();
var _session = /*#__PURE__*/new WeakMap();
var _webhooks = /*#__PURE__*/new WeakMap();
var _users = /*#__PURE__*/new WeakMap();
var _utils = /*#__PURE__*/new WeakMap();
var SDK = /*#__PURE__*/function () {
  /**
   *
   * @param {Configuration} config
   */
  function SDK(config) {
    _classCallCheck(this, SDK);
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: undefined
    });
    _classPrivateFieldInitSpec(this, _client, {
      writable: true,
      value: null
    });
    _classPrivateFieldInitSpec(this, _passkeys, {
      writable: true,
      value: null
    });
    _classPrivateFieldInitSpec(this, _emailLinks, {
      writable: true,
      value: null
    });
    _classPrivateFieldInitSpec(this, _authTokens, {
      writable: true,
      value: null
    });
    _classPrivateFieldInitSpec(this, _session, {
      writable: true,
      value: null
    });
    _classPrivateFieldInitSpec(this, _webhooks, {
      writable: true,
      value: null
    });
    _classPrivateFieldInitSpec(this, _users, {
      writable: true,
      value: null
    });
    _classPrivateFieldInitSpec(this, _utils, {
      writable: true,
      value: _clientInfoUtils.utils
    });
    _classPrivateFieldSet(this, _config, config);
    if (!_classPrivateFieldGet(this, _config).client) {
      if (!_classPrivateFieldGet(this, _config).projectID) {
        throw new Error('No project ID set');
      }
      _classPrivateFieldSet(this, _client, new _CorbadoApi["default"](_classPrivateFieldGet(this, _config).projectID, _classPrivateFieldGet(this, _config).apiSecret, _classPrivateFieldGet(this, _config).backendAPI));
    } else {
      _classPrivateFieldSet(this, _client, _classPrivateFieldGet(this, _config).client);
    }
    _classPrivateFieldSet(this, _utils, _clientInfoUtils.utils);
  }

  /**
   *
   * @returns {*}
   */
  _createClass(SDK, [{
    key: "passkeys",
    get: function get() {
      if (_classPrivateFieldGet(this, _passkeys) === null) {
        _classPrivateFieldSet(this, _passkeys, new _passkeysService["default"](_classPrivateFieldGet(this, _client), this.emailLinks));
      }
      return _classPrivateFieldGet(this, _passkeys);
    }

    /**
     *
     * @returns {null}
     */
  }, {
    key: "emailLinks",
    get: function get() {
      if (_classPrivateFieldGet(this, _emailLinks) === null) {
        // EmailLinkService
        _classPrivateFieldSet(this, _emailLinks, new _emaillinksService["default"](_classPrivateFieldGet(this, _client), _classPrivateFieldGet(this, _config).emailTemplates));
      }
      return _classPrivateFieldGet(this, _emailLinks);
    }
  }, {
    key: "users",
    get: function get() {
      if (_classPrivateFieldGet(this, _users) === null) {
        _classPrivateFieldSet(this, _users, new _usersService["default"](_classPrivateFieldGet(this, _client)));
      }
      return _classPrivateFieldGet(this, _users);
    }
  }, {
    key: "authTokens",
    get: function get() {
      if (_classPrivateFieldGet(this, _authTokens) === null) {
        _classPrivateFieldSet(this, _authTokens, new _authtokensService["default"](_classPrivateFieldGet(this, _client)));
      }
      return _classPrivateFieldGet(this, _authTokens);
    }

    /**
     *
     * @returns {null}
     */
  }, {
    key: "session",
    get: function get() {
      if (_classPrivateFieldGet(this, _session) === null) {
        _classPrivateFieldSet(this, _session, new _sessionService["default"](_classPrivateFieldGet(this, _client), _classPrivateFieldGet(this, _config).shortSessionCookieName, _classPrivateFieldGet(this, _config).frontendAPI, _classPrivateFieldGet(this, _config).frontendAPI + "/.well-known/jwks", _classPrivateFieldGet(this, _config).cacheMaxAge));
      }
      return _classPrivateFieldGet(this, _session);
    }

    /**
     *
     * @returns {null}
     */
  }, {
    key: "webhooks",
    get: function get() {
      if (_classPrivateFieldGet(this, _webhooks) === null) {
        _classPrivateFieldSet(this, _webhooks, new _webhooksService["default"]((0, _webhookMiddleware["default"])(_classPrivateFieldGet(this, _config).webhookUsername, _classPrivateFieldGet(this, _config).webhookPassword)));
      }
      return _classPrivateFieldGet(this, _webhooks);
    }

    /**
     *
     * @returns {null}
     */
  }, {
    key: "utils",
    get: function get() {
      return _classPrivateFieldGet(this, _utils);
    }
  }]);
  return SDK;
}();
var _default = SDK;
exports["default"] = _default;