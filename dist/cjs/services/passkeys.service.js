"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Passkeys = /*#__PURE__*/_createClass(function Passkeys(client, emailLinkService) {
  var _this = this;
  _classCallCheck(this, Passkeys);
  /**
   * Start the WebAuthn register flow.
   * @param username
   * @param clientInfo
   * @param origin
   * @param requestID
   * @param credentialStatus
   * @returns {Promise<*>}
   */
  _defineProperty(this, "registerStart", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(username, clientInfo, origin) {
      var requestID,
        credentialStatus,
        params,
        _args = arguments;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            requestID = _args.length > 3 && _args[3] !== undefined ? _args[3] : null;
            credentialStatus = _args.length > 4 && _args[4] !== undefined ? _args[4] : null;
            if (username) {
              _context.next = 4;
              break;
            }
            throw new Error('Username is required');
          case 4:
            if (clientInfo) {
              _context.next = 6;
              break;
            }
            throw new Error("ClientInfo is required");
          case 6:
            if (origin) {
              _context.next = 8;
              break;
            }
            throw new Error("Origin is required");
          case 8:
            if (origin) {
              _context.next = 10;
              break;
            }
            throw new Error('Origin is required');
          case 10:
            params = {
              username: username,
              clientInfo: clientInfo,
              origin: origin,
              credentialStatus: 'active'
            };
            if (requestID) {
              params['requestID'] = requestID;
            }
            if (credentialStatus) {
              params['credentialStatus'] = credentialStatus;
            }
            _context.next = 15;
            return _this.client.request('/webauthn/register/start', 'POST', params);
          case 15:
            return _context.abrupt("return", _context.sent);
          case 16:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  /**
   * Finishes the WebAuthn register flow.
   * @param publicKeyCredential
   * @param clientInfo
   * @param origin
   * @param requestID
   * @returns {Promise<*>}
   */
  _defineProperty(this, "registerFinish", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(publicKeyCredential, clientInfo, origin) {
      var requestID,
        _args2 = arguments;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            requestID = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : null;
            if (publicKeyCredential) {
              _context2.next = 3;
              break;
            }
            throw new Error("PublicKeyCredential is required");
          case 3:
            if (clientInfo) {
              _context2.next = 5;
              break;
            }
            throw new Error("ClientInfo is required");
          case 5:
            if (origin) {
              _context2.next = 7;
              break;
            }
            throw new Error("Origin is required");
          case 7:
            _context2.next = 9;
            return _this.client.request('/webauthn/register/finish', 'POST', params);
          case 9:
            return _context2.abrupt("return", _context2.sent);
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }());
  /**
   * Sends an email magic link.
   * @param email
   * @param redirect
   * @param create
   * @param additionalPayload
   * @param clientInfo
   * @param requestID
   * @returns {Promise<*>}
   */
  _defineProperty(this, "emailLinkSend", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(email, redirect) {
      var create,
        additionalPayload,
        clientInfo,
        requestID,
        _args3 = arguments;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            create = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : true;
            additionalPayload = _args3.length > 3 ? _args3[3] : undefined;
            clientInfo = _args3.length > 4 ? _args3[4] : undefined;
            requestID = _args3.length > 5 && _args3[5] !== undefined ? _args3[5] : null;
            _context3.next = 6;
            return _this.emailLinkService.send(email, redirect, create, additionalPayload, clientInfo, true, requestID);
          case 6:
            return _context3.abrupt("return", _context3.sent);
          case 7:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function (_x7, _x8) {
      return _ref3.apply(this, arguments);
    };
  }());
  /**
   * Validate an email magic link
   * @param emailLinkID
   * @param token
   * @param requestID
   * @returns {Promise<*>}
   */
  _defineProperty(this, "emailLinkValidate", /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(emailLinkID, token) {
      var requestID,
        _args4 = arguments;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            requestID = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : null;
            _context4.next = 3;
            return _this.emailLinkService.validate(emailLinkID, token, requestID);
          case 3:
            return _context4.abrupt("return", _context4.sent);
          case 4:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function (_x9, _x10) {
      return _ref4.apply(this, arguments);
    };
  }());
  /**
   * Update WebAuthn credentials' state
   * @param credentialID
   * @param status
   * @returns {Promise<*>}
   */
  _defineProperty(this, "credentialUpdate", /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(credentialID, status) {
      var params;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            params = {
              status: status
            };
            _context5.next = 3;
            return _this.client.request('/webauthn/credential/${credentialID}', 'PUT', params);
          case 3:
            return _context5.abrupt("return", _context5.sent);
          case 4:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function (_x11, _x12) {
      return _ref5.apply(this, arguments);
    };
  }());
  /**
   * Start the WebAuthn authentication flow.
   * @param username
   * @param clientInfo
   * @param origin
   * @param requestID
   * @returns {Promise<*>}
   */
  _defineProperty(this, "authenticateStart", /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(username, clientInfo, origin) {
      var requestID,
        params,
        _args6 = arguments;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            requestID = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : null;
            if (username) {
              _context6.next = 3;
              break;
            }
            throw new Error('Username is required');
          case 3:
            if (clientInfo) {
              _context6.next = 5;
              break;
            }
            throw new Error('ClientInfo is required');
          case 5:
            if (origin) {
              _context6.next = 7;
              break;
            }
            throw new Error('Origin is required');
          case 7:
            params = {
              username: username,
              clientInfo: clientInfo,
              origin: origin
            };
            if (requestID) {
              params['requestID'] = requestID;
            }
            _context6.next = 11;
            return _this.client.request('/webauthn/authenticate/start', 'POST', params);
          case 11:
            return _context6.abrupt("return", _context6.sent);
          case 12:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return function (_x13, _x14, _x15) {
      return _ref6.apply(this, arguments);
    };
  }());
  /**
   * Finish the WebAuthn authentication flow.
   * @param publicKeyCredential
   * @param clientInfo
   * @param origin
   * @param requestID
   * @returns {Promise<*>}
   */
  _defineProperty(this, "authenticateFinish", /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(publicKeyCredential, clientInfo, origin) {
      var requestID,
        params,
        _args7 = arguments;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            requestID = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : null;
            if (publicKeyCredential) {
              _context7.next = 3;
              break;
            }
            throw new Error('Username is required');
          case 3:
            if (clientInfo) {
              _context7.next = 5;
              break;
            }
            throw new Error('ClientInfo is required');
          case 5:
            if (origin) {
              _context7.next = 7;
              break;
            }
            throw new Error('Origin is required');
          case 7:
            params = {
              publicKeyCredential: JSON.stringify(publicKeyCredential),
              clientInfo: clientInfo,
              origin: origin
            };
            if (requestID) {
              params['requestID'] = requestID;
            }
            _context7.next = 11;
            return _this.client.request('/webauthn/authenticate/finish', 'POST', params);
          case 11:
            return _context7.abrupt("return", _context7.sent);
          case 12:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    return function (_x16, _x17, _x18) {
      return _ref7.apply(this, arguments);
    };
  }());
  this.client = client;
  this.emailLinkService = emailLinkService;
});
var _default = Passkeys;
exports["default"] = _default;