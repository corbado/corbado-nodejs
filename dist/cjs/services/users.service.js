"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _authenticated = /*#__PURE__*/new WeakMap();
var _id = /*#__PURE__*/new WeakMap();
var _name = /*#__PURE__*/new WeakMap();
var _email = /*#__PURE__*/new WeakMap();
var _phoneNumber = /*#__PURE__*/new WeakMap();
var UsersService = /*#__PURE__*/_createClass(function UsersService(authenticated) {
  var _this = this;
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var email = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var phoneNumber = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  _classCallCheck(this, UsersService);
  _classPrivateFieldInitSpec(this, _authenticated, {
    writable: true,
    value: void 0
  });
  _classPrivateFieldInitSpec(this, _id, {
    writable: true,
    value: void 0
  });
  _classPrivateFieldInitSpec(this, _name, {
    writable: true,
    value: void 0
  });
  _classPrivateFieldInitSpec(this, _email, {
    writable: true,
    value: void 0
  });
  _classPrivateFieldInitSpec(this, _phoneNumber, {
    writable: true,
    value: void 0
  });
  _defineProperty(this, "isAuthenticated", function () {
    return _classPrivateFieldGet(_this, _authenticated);
  });
  _defineProperty(this, "getID", function () {
    if (_this.isAuthenticated() === false) {
      throw new Error('UsersService is not authenticated');
    }
    return _classPrivateFieldGet(_this, _id);
  });
  _defineProperty(this, "getName", function () {
    if (_this.isAuthenticated() === false) {
      throw new Error('UsersService is not authenticated');
    }
    return _classPrivateFieldGet(_this, _name);
  });
  _defineProperty(this, "getEmail", function () {
    if (_this.isAuthenticated() === false) {
      throw new Error('UsersService is not authenticated');
    }
    return _classPrivateFieldGet(_this, _email);
  });
  _defineProperty(this, "getPhoneNumber", function () {
    if (_this.isAuthenticated() === false) {
      throw new Error('UsersService is not authenticated');
    }
    return _classPrivateFieldGet(_this, _phoneNumber);
  });
  _classPrivateFieldSet(this, _authenticated, authenticated);
  _classPrivateFieldSet(this, _id, id);
  _classPrivateFieldSet(this, _name, name);
  _classPrivateFieldSet(this, _email, email);
  _classPrivateFieldSet(this, _phoneNumber, phoneNumber);
});
var _default = UsersService;
exports["default"] = _default;