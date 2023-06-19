"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var ALLOWED_METHOD = "POST";

/**
 * Checks authentication, the method and sets a header
 *
 */
function webhookMiddleware(webhookUsername, webhookPassword) {
  return function (req, res, next) {
    var headers = req.headers,
      method = req.method;

    // Check if request has been made with POST. For SDK webhooks
    // only POST is allowed/used.
    if (method !== ALLOWED_METHOD) {
      return res.status(405).send("Method Not Allowed");
    }

    // Check for basic auth header
    var authHeader = headers.authorization;
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return res.status(401).json({
        message: "Missing Authorization Header"
      });
    }

    // Verify auth credentials
    var encodedCredentials = authHeader.replace("Basic ", "");
    var decodedCredentials = Buffer.from(encodedCredentials, "base64").toString();
    var _decodedCredentials$s = decodedCredentials.split(":"),
      _decodedCredentials$s2 = _slicedToArray(_decodedCredentials$s, 2),
      username = _decodedCredentials$s2[0],
      password = _decodedCredentials$s2[1];
    if (username !== webhookUsername || password !== webhookPassword) {
      return res.status(401).json({
        message: "Invalid Authentication Credentials"
      });
    }

    // prepare response header
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    next();
  };
}
var _default = webhookMiddleware;
exports["default"] = _default;