"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _assert = _interopRequireDefault(require("assert"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _webhookUsername = /*#__PURE__*/new WeakMap();
var _webhookPassword = /*#__PURE__*/new WeakMap();
var _webhookMiddleware = /*#__PURE__*/new WeakMap();
var Webhooks = /*#__PURE__*/function () {
  /**
   *
   * @param version
   * @param shortSessionCookieName
   * @param issuer
   * @param jwksURI
   * @param cacheMaxAge
   * @param client
   */
  function Webhooks(webhookMiddleware) {
    _classCallCheck(this, Webhooks);
    _defineProperty(this, "WEBHOOK_ACTION", {
      AUTH_METHODS: "authMethods",
      PASSWORD_VERIFY: "passwordVerify"
    });
    _defineProperty(this, "ALLOWED_STATUS", ["exists", "not_exists", "blocked"]);
    _classPrivateFieldInitSpec(this, _webhookUsername, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _webhookPassword, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _webhookMiddleware, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _webhookMiddleware, webhookMiddleware);
  }

  /**
   * Returns webhook action (by reading the header field X-SDK-Action)
   *
   * @return {Object}
   */
  _createClass(Webhooks, [{
    key: "getAction",
    value: function getAction(req) {
      var corbadoAction = req.get("X-Corbado-Action") || "";
      if (!corbadoAction) {
        throw new Error("Missing action header (X-CORBADO-ACTION)");
      }
      switch (corbadoAction) {
        case this.WEBHOOK_ACTION.AUTH_METHODS:
          return this.WEBHOOK_ACTION.AUTH_METHODS;
        case this.WEBHOOK_ACTION.PASSWORD_VERIFY:
          return this.WEBHOOK_ACTION.PASSWORD_VERIFY;
        default:
          throw new Error("Invalid action (\"".concat(corbadoAction, "\")"));
      }
    }

    /**
     * Returns auth methods request model
     *
     * @param {Object} req
     * @return {object}
     */
  }, {
    key: "getAuthMethodsRequest",
    value: function getAuthMethodsRequest(req) {
      var data = req.body;
      _assert["default"].ok(data.id, "Missing id field");
      _assert["default"].ok(data.projectID, "Missing projectID field");
      _assert["default"].ok(data.action === this.WEBHOOK_ACTION.AUTH_METHODS, "Unexpected action: ".concat(data.action));
      _assert["default"].ok(data.data.username, "Missing username field");
      return {
        id: data.id,
        projectID: data.projectID,
        action: data.action,
        data: {
          username: data.data.username
        }
      };
    }

    /**
     * Sends auth methods response
     *
     * @param {string} status
     * @param {Object} res
     * @param {string} responseID
     */
  }, {
    key: "getAuthMethodsResponse",
    value: function getAuthMethodsResponse(status) {
      var responseID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      if (!this.ALLOWED_STATUS.includes(status)) {
        throw new Error("Invalid status value");
      }
      return {
        responseID: responseID,
        data: {
          status: status
        }
      };
    }

    /**
     * Returns password verify request model
     *
     * @param {Object} req
     * @return {Object}
     */
  }, {
    key: "getPasswordVerifyRequest",
    value: function getPasswordVerifyRequest(req) {
      var data = req.body;
      var requiredFields = ["id", "projectID"];
      var requiredDataKeys = ["username", "password"];
      if (!requiredFields.every(function (key) {
        return key in data;
      }) || !requiredDataKeys.every(function (key) {
        return key in data.data;
      })) {
        throw new Error("Invalid request format");
      }
      return {
        id: data.id,
        projectID: data.projectID,
        action: this.WEBHOOK_ACTION.PASSWORD_VERIFY,
        data: {
          username: data.data.username,
          password: data.data.password
        }
      };
    }

    /**
     * Sends password verify response
     *
     * @param {boolean} success
     * @param {Object} res
     * @param {string} responseID
     */
  }, {
    key: "getPasswordVerifyResponse",
    value: function getPasswordVerifyResponse(success) {
      var responseID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      return {
        responseID: responseID,
        data: {
          success: success
        }
      };
    }
  }, {
    key: "middleware",
    get: function get() {
      return _classPrivateFieldGet(this, _webhookMiddleware);
    }
  }]);
  return Webhooks;
}();
var _default = Webhooks;
exports["default"] = _default;