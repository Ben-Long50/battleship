/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/eventListeners.js":
/*!*******************************!*\
  !*** ./src/eventListeners.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eventListeners: () => (/* binding */ eventListeners)
/* harmony export */ });
/* harmony import */ var _renderDom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderDom */ "./src/renderDom.js");
/* harmony import */ var _gameFlow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameFlow */ "./src/gameFlow.js");
/* eslint-disable import/prefer-default-export */


var eventListeners = {
  activatePlacement: function activatePlacement(player, element, name, length) {
    var boardCoords = Array.from(element.querySelectorAll('.coordinate'));
    var index = 0;
    boardCoords.forEach(function (item) {
      item.addEventListener('wheel', function () {
        player.gameboard.toggleOrientation();
        boardCoords.forEach(function (item) {
          return item.style.removeProperty('background-color');
        });
        if (player.gameboard.horizontal === true) {
          for (var i = 0; i < length; i++) {
            if (boardCoords[index + i]) {
              boardCoords[index + i].style.backgroundColor = 'rgb(113, 197, 113)';
            }
          }
        } else if (player.gameboard.horizontal === false) {
          for (var _i = 0; _i < length; _i++) {
            if (boardCoords[index + _i * 10]) {
              boardCoords[index + _i * 10].style.backgroundColor = 'rgb(113, 197, 113)';
            }
          }
        }
      });
    });
    boardCoords.forEach(function (item) {
      item.addEventListener('mouseenter', function (e) {
        index = boardCoords.indexOf(e.target);
        if (player.gameboard.horizontal === true) {
          for (var i = 0; i < length; i++) {
            if (boardCoords[index + i]) {
              boardCoords[index + i].style.backgroundColor = 'rgb(113, 197, 113)';
            }
          }
        } else if (player.gameboard.horizontal === false) {
          for (var _i2 = 0; _i2 < length; _i2++) {
            if (boardCoords[index + _i2 * 10]) {
              boardCoords[index + _i2 * 10].style.backgroundColor = 'rgb(113, 197, 113)';
            }
          }
        }
      });
    });
    boardCoords.forEach(function (item) {
      item.addEventListener('mouseleave', function () {
        boardCoords.forEach(function (item) {
          return item.style.removeProperty('background-color');
        });
      });
    });
    return new Promise(function (resolve) {
      boardCoords.forEach(function (item) {
        item.addEventListener('click', function () {
          var row = index > 9 ? Math.floor(index / 10) : 0;
          var column = index % 10;
          var alert = player.gameboard.placeShip(name, length, row, column);
          _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.clearText(_renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.alert);
          _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.animateText(alert, _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.alert);
          _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.renderGameboard(player, element);
          if (alert === " ".concat(name, " placed")) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    });
  },
  activateCoords: function activateCoords(player, element) {
    var boardCoords = Array.from(element.querySelectorAll('.coordinate'));
    boardCoords.forEach(function (item) {
      if (!item.classList.contains('hit') && !item.classList.contains('miss')) {
        item.addEventListener('click', function (e) {
          var index = boardCoords.indexOf(e.target);
          var row = index > 9 ? Math.floor(index / 10) : 0;
          var column = index % 10;
          var message = player.gameboard.receiveAttack(row, column);
          player.gameboard.checkSunk();
          _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.clearText(_renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.alert);
          _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.animateText(message, _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.alert);
          _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.renderOpponent(player, element);
          _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.renderTurnButton('switch-button', 'Switch Turn');
          if (player.gameboard.checkFleet() === true) {
            message = _gameFlow__WEBPACK_IMPORTED_MODULE_1__.gameFlow.endGame();
            _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.clearText(_renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.message);
            _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.animateText(message, _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.message);
          }
        });
      }
    });
  }
};

/***/ }),

/***/ "./src/gameFlow.js":
/*!*************************!*\
  !*** ./src/gameFlow.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gameFlow: () => (/* binding */ gameFlow)
/* harmony export */ });
/* harmony import */ var _renderDom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderDom */ "./src/renderDom.js");
/* harmony import */ var _eventListeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventListeners */ "./src/eventListeners.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */



var gameFlow = {
  activePlayer: undefined,
  activeGameboard: undefined,
  inactivePlayer: undefined,
  inactiveGameboard: undefined,
  loadGame: function loadGame() {
    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.clearText(_renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.message, _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.messageTimers);
    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.clearText(_renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.alert, _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.alertTimers);
    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.startDialog.showModal();
  },
  initPvpMode: function initPvpMode() {
    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.startDialog.close();
    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.pvpDialog.showModal();
  },
  initPvcMode: function initPvcMode() {
    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.startDialog.close();
    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.pvcDialog.showModal();
  },
  pvpShipPlacement: function pvpShipPlacement() {
    var _this = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var shipLengths, shipNames, alert, i, message, result, _i, _message, _result;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            shipLengths = [5, 4, 3, 3, 2];
            shipNames = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];
            alert = "Use the middle mouse wheel to change the ship's orientation";
            _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.animateText(alert, _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.alert);
            i = 0;
          case 5:
            if (!(i < shipNames.length)) {
              _context.next = 16;
              break;
            }
            _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.clearText(_renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.message);
            message = "".concat(_this.activePlayer.name, ", place your ").concat(shipNames[i].toLowerCase(), " on the board");
            _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.animateText(message, _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.message);
            _context.next = 11;
            return _eventListeners__WEBPACK_IMPORTED_MODULE_1__.eventListeners.activatePlacement(_this.activePlayer, _this.activeGameboard, shipNames[i], shipLengths[i]);
          case 11:
            result = _context.sent;
            if (result === false) {
              i--;
            }
          case 13:
            i++;
            _context.next = 5;
            break;
          case 16:
            setTimeout(function () {
              _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.clearText(_renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.alert);
            }, 2000);
            setTimeout(function () {
              _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.animateText(alert, _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.alert);
            }, 2000);
            _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.renderBlankBoard(_this.activeGameboard);
            _i = 0;
          case 20:
            if (!(_i < shipLengths.length)) {
              _context.next = 31;
              break;
            }
            _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.clearText(_renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.message);
            _message = "".concat(_this.inactivePlayer.name, ", place your ").concat(shipNames[_i].toLowerCase(), " on the board");
            _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.animateText(_message, _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.message);
            _context.next = 26;
            return _eventListeners__WEBPACK_IMPORTED_MODULE_1__.eventListeners.activatePlacement(_this.inactivePlayer, _this.inactiveGameboard, shipNames[_i], shipLengths[_i]);
          case 26:
            _result = _context.sent;
            if (_result === false) {
              _i--;
            }
          case 28:
            _i++;
            _context.next = 20;
            break;
          case 31:
            _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.renderBlankBoard(_this.inactiveGameboard);
            _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.clearText(_renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.message);
            _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.animateText('Press the button below to begin the game', _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.message);
            _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.renderTurnButton(undefined, 'Begin Game');
          case 35:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  pvcShipPlacement: function pvcShipPlacement() {
    var _this2 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var shipLengths, shipNames, alert, i, message, result, _loop, _i2;
      return _regeneratorRuntime().wrap(function _callee2$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            shipLengths = [5, 4, 3, 3, 2];
            shipNames = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];
            alert = "Use the middle mouse wheel to change the ship's orientation";
            _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.animateText(alert, _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.alert);
            i = 0;
          case 5:
            if (!(i < shipNames.length)) {
              _context3.next = 16;
              break;
            }
            _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.clearText(_renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.message);
            message = "".concat(_this2.activePlayer.name, ", place your ").concat(shipNames[i].toLowerCase(), " on the board");
            _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.animateText(message, _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.message);
            _context3.next = 11;
            return _eventListeners__WEBPACK_IMPORTED_MODULE_1__.eventListeners.activatePlacement(_this2.activePlayer, _this2.activeGameboard, shipNames[i], shipLengths[i]);
          case 11:
            result = _context3.sent;
            if (result === false) {
              i--;
            }
          case 13:
            i++;
            _context3.next = 5;
            break;
          case 16:
            _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop(_i3) {
              var row, column, message, result;
              return _regeneratorRuntime().wrap(function _loop$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    row = Math.floor(Math.random() * 10);
                    column = Math.floor(Math.random() * 10);
                    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.clearText(_renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.message);
                    message = "".concat(_this2.inactivePlayer.name, ", place your ").concat(shipNames[_i3].toLowerCase(), " on the board");
                    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.animateText(message, _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.message);
                    result = setTimeout(function () {
                      _this2.inactivePlayer.gameboard.placeShip(shipNames[_i3], shipLengths[_i3], row, column);
                    }, 1000 * _i3);
                    if (result !== " ".concat(shipNames[_i3], " placed")) {
                      _i3--;
                    }
                    _i2 = _i3;
                  case 8:
                  case "end":
                    return _context2.stop();
                }
              }, _loop);
            });
            _i2 = 0;
          case 18:
            if (!(_i2 < shipLengths.length)) {
              _context3.next = 23;
              break;
            }
            return _context3.delegateYield(_loop(_i2), "t0", 20);
          case 20:
            _i2++;
            _context3.next = 18;
            break;
          case 23:
          case "end":
            return _context3.stop();
        }
      }, _callee2);
    }))();
  },
  switchActive: function switchActive() {
    var activePlayer = this.activePlayer;
    var activeGameboard = this.activeGameboard;
    var inactivePlayer = this.inactivePlayer;
    var inactiveGameboard = this.inactiveGameboard;
    this.activePlayer = inactivePlayer;
    this.activeGameboard = inactiveGameboard;
    this.inactivePlayer = activePlayer;
    this.inactiveGameboard = activeGameboard;
  },
  displayBoards: function displayBoards() {
    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.renderOpponent(this.inactivePlayer, this.inactiveGameboard);
    _eventListeners__WEBPACK_IMPORTED_MODULE_1__.eventListeners.activateCoords(this.inactivePlayer, this.inactiveGameboard);
    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.renderGameboard(this.activePlayer, this.activeGameboard);
  },
  switchScreen: function switchScreen() {
    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.renderBlankBoard(this.activeGameboard);
    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.renderBlankBoard(this.inactiveGameboard);
    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.clearText(_renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.message);
    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.clearText(_renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.alert);
    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.animateText("".concat(this.activePlayer.name, "'s turn"), _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.message);
  },
  endGame: function endGame() {
    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.clearText(_renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.alert);
    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.turnButton.classList.remove('switch-button');
    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.turnButton.classList.remove('begin-button');
    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.turnButton.classList.add('new-game-button');
    _renderDom__WEBPACK_IMPORTED_MODULE_0__.domElements.turnButton.textContent = 'Start a New Game';
    return "Game Over! ".concat(this.activePlayer.name, " has successfully sunk all of ").concat(this.inactivePlayer.name, "'s ships");
  }
};

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _gameFlow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameFlow */ "./src/gameFlow.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* eslint-disable no-unused-expressions */


var Gameboard = /*#__PURE__*/function () {
  function Gameboard() {
    var _this = this;
    _classCallCheck(this, Gameboard);
    this.rows = 10;
    this.columns = 10;
    this.grid = Array.from({
      length: this.rows
    }, function () {
      return Array.from({
        length: _this.columns
      });
    });
    this.shipList = [];
    this.sunkShips = [];
    this.token = 'O';
    this.horizontal = true;
  }
  _createClass(Gameboard, [{
    key: "toggleOrientation",
    value: function toggleOrientation() {
      this.horizontal === true ? this.horizontal = false : this.horizontal = true;
    }
  }, {
    key: "placeShip",
    value: function placeShip(name, length, row, column) {
      var ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](name, length);
      if (this.horizontal === true) {
        if (column + length > this.columns) {
          return ' You cannot place the ship out of bounds';
        }
        for (var i = 0; i < ship.length; i++) {
          if (this.grid[row][column + i] !== undefined) {
            return ' You cannot place the ship on an occupied coordinate';
          }
        }
        for (var _i = 0; _i < ship.length; _i++) {
          this.grid[row][column + _i] = this.token;
          ship.coordinates.push([row, column + _i]);
        }
      } else if (this.horizontal === false) {
        if (row + length > this.rows) {
          return ' You cannot place the ship out of bounds';
        }
        for (var _i2 = 0; _i2 < ship.length; _i2++) {
          if (this.grid[row + _i2][column] !== undefined) {
            return ' You cannot place the ship on an occupied coordinate';
          }
        }
        for (var _i3 = 0; _i3 < ship.length; _i3++) {
          this.grid[row + _i3][column] = this.token;
          ship.coordinates.push([row + _i3, column]);
        }
      }
      this.shipList.push(ship);
      return " ".concat(ship.name, " placed");
    }
  }, {
    key: "receiveAttack",
    value: function receiveAttack(row, column) {
      var message = "".concat(_gameFlow__WEBPACK_IMPORTED_MODULE_1__.gameFlow.activePlayer.name, " missed");
      this.grid[row][column] === this.token ? this.grid[row][column] = 'hit' : this.grid[row][column] = 'miss';
      this.shipList.forEach(function (ship) {
        // eslint-disable-next-line no-restricted-syntax
        var _iterator = _createForOfIteratorHelper(ship.coordinates),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var coord = _step.value;
            if (coord[0] === row && coord[1] === column) {
              ship.hit();
              message = "".concat(_gameFlow__WEBPACK_IMPORTED_MODULE_1__.gameFlow.activePlayer.name, " got a hit");
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (ship.hits === ship.length) {
          ship.isSunk();
          message = " ".concat(_gameFlow__WEBPACK_IMPORTED_MODULE_1__.gameFlow.activePlayer.name, " sunk the ").concat(ship.name);
        }
      });
      return message;
    }
  }, {
    key: "checkSunk",
    value: function checkSunk() {
      var _this2 = this;
      this.shipList.forEach(function (ship, index) {
        if (ship.sunk === true) {
          var sunkShip = _this2.shipList.splice(index, 1);
          _this2.sunkShips.push(sunkShip);
        }
      });
    }
  }, {
    key: "checkFleet",
    value: function checkFleet() {
      if (this.shipList.length === 0) {
        return true;
      }
    }
  }]);
  return Gameboard;
}();


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Computer: () => (/* binding */ Computer),
/* harmony export */   Human: () => (/* binding */ Human)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/* eslint-disable max-classes-per-file */

var Player = /*#__PURE__*/_createClass(function Player() {
  _classCallCheck(this, Player);
  this.gameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
});
var Human = /*#__PURE__*/function (_Player) {
  _inherits(Human, _Player);
  function Human(name) {
    var _this;
    _classCallCheck(this, Human);
    _this = _callSuper(this, Human);
    _this.name = name;
    return _this;
  }
  return _createClass(Human);
}(Player);
var Computer = /*#__PURE__*/function (_Player2) {
  _inherits(Computer, _Player2);
  function Computer() {
    var _this2;
    _classCallCheck(this, Computer);
    _this2 = _callSuper(this, Computer);
    _this2.name = 'Computer';
    return _this2;
  }
  return _createClass(Computer);
}(Player);

/***/ }),

/***/ "./src/renderDom.js":
/*!**************************!*\
  !*** ./src/renderDom.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   domElements: () => (/* binding */ domElements)
/* harmony export */ });
/* harmony import */ var _gameFlow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameFlow */ "./src/gameFlow.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


/* eslint-disable import/prefer-default-export */
var domElements = {
  startDialog: document.querySelector('#start-dialog'),
  pvpMode: document.querySelector('#pvp-mode'),
  pvcMode: document.querySelector('#pvc-mode'),
  pvpDialog: document.querySelector('#pvp-dialog'),
  pvcDialog: document.querySelector('#pvc-dialog'),
  player1Name: document.querySelector('#player1-name'),
  player2Name: document.querySelector('#player2-name'),
  playerName: document.querySelector('#player-name'),
  pvpStartButton: document.querySelector('#pvp-start-button'),
  pvcStartButton: document.querySelector('#pvc-start-button'),
  player1Ships: document.querySelector('#player1-ship-info'),
  player2Ships: document.querySelector('#player2-ship-info'),
  gameboardOne: document.querySelector('#gameboard-one'),
  gameboardTwo: document.querySelector('#gameboard-two'),
  message: document.querySelector('#message-container'),
  alert: document.querySelector('#alert-container'),
  buttonContainer: document.querySelector('#button-container'),
  turnButton: undefined,
  messageTimers: [],
  alertTimers: [],
  renderTurnButton: function renderTurnButton(property, text) {
    var _this = this;
    var turnButton = document.createElement('button');
    turnButton.id = 'turn-button';
    turnButton.classList.add(property);
    turnButton.textContent = text;
    this.buttonContainer.appendChild(turnButton);
    this.turnButton = this.getTurnButton();
    turnButton.addEventListener('click', function (e) {
      if (e.target.classList.contains(undefined)) {
        _this.buttonContainer.removeChild(turnButton);
        domElements.clearText(domElements.message, domElements.messageTimers);
        domElements.clearText(domElements.alert, domElements.alertTimers);
        _this.renderTurnButton('begin-button', 'Begin Turn');
        _gameFlow__WEBPACK_IMPORTED_MODULE_0__.gameFlow.switchScreen();
      } else if (e.target.classList.contains('switch-button')) {
        _this.buttonContainer.removeChild(turnButton);
        _this.renderTurnButton('begin-button', 'Begin Turn');
        _gameFlow__WEBPACK_IMPORTED_MODULE_0__.gameFlow.switchActive();
        _gameFlow__WEBPACK_IMPORTED_MODULE_0__.gameFlow.switchScreen();
      } else if (e.target.classList.contains('begin-button')) {
        _this.buttonContainer.removeChild(turnButton);
        _gameFlow__WEBPACK_IMPORTED_MODULE_0__.gameFlow.displayBoards();
      } else if (e.target.classList.contains('new-game-button')) {
        _this.buttonContainer.removeChild(turnButton);
        _gameFlow__WEBPACK_IMPORTED_MODULE_0__.gameFlow.loadGame();
      }
    });
  },
  getTurnButton: function getTurnButton() {
    return document.querySelector('#turn-button');
  },
  renderGameboard: function renderGameboard(player, element) {
    this.clearGameboard(element);
    var boardArray = player.gameboard.grid;
    for (var i = 0; i < boardArray.length; i++) {
      boardArray[i].forEach(function (index) {
        var coordinate = document.createElement('div');
        element.appendChild(coordinate);
        if (index === player.gameboard.token) {
          coordinate.classList.add('ship');
        } else if (index === 'hit') {
          coordinate.classList.add('hit');
        } else if (index === 'miss') {
          coordinate.classList.add('miss');
        }
        coordinate.classList.add('coordinate');
      });
    }
  },
  renderOpponent: function renderOpponent(player, element) {
    this.clearGameboard(element);
    var boardArray = player.gameboard.grid;
    for (var i = 0; i < boardArray.length; i++) {
      boardArray[i].forEach(function (index) {
        var coordinate = document.createElement('div');
        element.appendChild(coordinate);
        if (index === 'hit') {
          coordinate.classList.add('hit');
        } else if (index === 'miss') {
          coordinate.classList.add('miss');
        }
        coordinate.classList.add('coordinate');
        if (!coordinate.classList.contains('hit') && !coordinate.classList.contains('miss')) {
          coordinate.classList.add('active-coord');
        }
      });
    }
  },
  renderBlankBoard: function renderBlankBoard(element) {
    var boardCoords = element.querySelectorAll('.coordinate');
    boardCoords.forEach(function (ele) {
      ele.classList.remove('ship');
      ele.classList.remove('hit');
      ele.classList.remove('miss');
      ele.classList.remove('active-coord');
    });
  },
  clearGameboard: function clearGameboard(element) {
    while (element.firstChild) {
      element.firstChild.remove();
    }
  },
  toggleTurnButton: function toggleTurnButton(player) {
    turnButton.classList.remove('new-game-button');
    !turnButton.classList.contains('begin-button') ? function () {
      turnButton.textContent = 'Begin Turn';
      turnButton.classList.remove('switch-button');
      turnButton.classList.add('begin-button');
      message.textContent = "".concat(player, "'s Turn");
    }() : function () {
      turnButton.classList.remove('begin-button');
      turnButton.classList.add('switch-button');
      turnButton.textContent = 'Switch Turn';
    }();
  },
  animateText: function animateText(text, element) {
    var _this2 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _loop, i;
      return _regeneratorRuntime().wrap(function _callee$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop(i) {
              var timer;
              return _regeneratorRuntime().wrap(function _loop$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return setTimeout(function () {
                      element.textContent += text[i];
                    }, 20 * i);
                  case 2:
                    timer = _context.sent;
                    _this2.messageTimers.push(timer);
                  case 4:
                  case "end":
                    return _context.stop();
                }
              }, _loop);
            });
            i = 0;
          case 2:
            if (!(i < text.length)) {
              _context2.next = 7;
              break;
            }
            return _context2.delegateYield(_loop(i), "t0", 4);
          case 4:
            i++;
            _context2.next = 2;
            break;
          case 7:
          case "end":
            return _context2.stop();
        }
      }, _callee);
    }))();
  },
  clearText: function clearText(element) {
    element.textContent = '';
    if (element === this.message) {
      this.messageTimers.forEach(function (timer) {
        clearTimeout(timer);
      });
      this.messageTimers = [];
    } else if (element === this.alert) {
      this.alertTimers.forEach(function (timer) {
        clearTimeout(timer);
      });
      this.alertTimers = [];
    }
  }
};

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Ship = /*#__PURE__*/function () {
  function Ship(name, length) {
    _classCallCheck(this, Ship);
    this.name = name;
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    this.coordinates = [];
  }
  _createClass(Ship, [{
    key: "hit",
    value: function hit() {
      return this.hits++;
    }
  }, {
    key: "isSunk",
    value: function isSunk() {
      if (this.length === this.hits) {
        this.sunk = true;
      }
      return this.sunk;
    }
  }]);
  return Ship;
}();


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/main.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/main.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/digital.ttf */ "./src/assets/digital.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/digital-italic.ttf */ "./src/assets/digital-italic.ttf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
  font-family: 'digital';
  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___}) format('truetype');
}

@font-face {
  font-family: 'digital-italic';
  src: url(${___CSS_LOADER_URL_REPLACEMENT_1___}) format('truetype');
}

body {
  --text-color: rgb(0, 133, 0);
  --background-color: rgba(0, 75, 0, 0.3);
  --hover-color: rgba(255, 255, 255, 0.37);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgb(44, 44, 44);
}

#title {
  font-family: 'digital-italic';
  color: var(--text-color);
  text-shadow:
    -2px -2px 1px var(--text-color),
    2px -2px 1px var(--text-color),
    -2px 2px 1px var(--text-color),
    2px 2px 1px var(--text-color);
  letter-spacing: 10px;
}

header,
footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

dialog {
  border-radius: 10px;
}

dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(12px);
}

.dialog-button-container {
  display: flex;
  justify-content: center;
  gap: 5%;
}

.mode-button {
  font-size: 24px;
  border-radius: 5px;
}

#single-input-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
}

#pvp-dialog-container,
#pvc-dialog-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#dual-input-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

#pvp-start-button {
  width: 100%;
}

#title {
  font-size: 100px;
  text-align: center;
}

#gameboard-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#ui-container {
  font-family: 'digital';
  color: var(--text-color);
  box-sizing: border-box;
  height: 100%;
  width: 20%;
  display: grid;
  grid-template-columns: 1;
  grid-template-rows: 1fr 1fr auto;
  gap: 20px;
  padding-left: 2%;
  padding-right: 2%;
}

#message-container,
#alert-container {
  border-radius: 10px;
  border: solid var(--text-color) 0.75px;
  background-color: var(--background-color);
  padding: 8px;
}

#message-container {
  text-align: center;
  font-size: 40px;
}

#alert-container {
  text-align: left;
  font-size: 48px;
}

#button-container {
  display: grid;
  place-items: center;
}

#turn-button {
  font-family: 'digital';
  color: var(--text-color);
  font-size: 40px;
  text-align: center;
  border-radius: 10px;
  border: solid var(--text-color) 0.75px;
  background-color: var(--background-color);
  padding: 8px;
}

#turn-button:hover {
  background-color: var(--hover-color);
}

.gameboard {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 2.5px;
}

.coordinate {
  height: 5vh;
  width: 5vh;
  border: solid var(--text-color) 0.75px;
  background-color: var(--background-color);
  display: grid;
  place-items: center;
  font-size: 30px;
  border-radius: 5px;
}

.active-coord:hover {
  background-color: var(--hover-color);
}

.ship {
  background-color: rgb(113, 197, 113);
}

.hit {
  background-color: rgb(255, 129, 129);
}

.miss {
  background-color: rgb(133, 133, 255);
}

#ship-info-container {
  display: flex;
  justify-content: space-around;
}

.ship-info {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
}

.ship-display {
  display: flex;
  gap: 1px;
}

.ship-unit {
  height: 30px;
  width: 30px;
  background-color: rgb(113, 197, 113);
  border: solid black 1px;
  border-radius: 3px;
}
`, "",{"version":3,"sources":["webpack://./src/styles/main.css"],"names":[],"mappings":"AAAA;EACE,sBAAsB;EACtB,+DAAoD;AACtD;;AAEA;EACE,6BAA6B;EAC7B,+DAA2D;AAC7D;;AAEA;EACE,4BAA4B;EAC5B,uCAAuC;EACvC,wCAAwC;EACxC,aAAa;EACb,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,8BAA8B;EAC9B,iCAAiC;AACnC;;AAEA;EACE,6BAA6B;EAC7B,wBAAwB;EACxB;;;;iCAI+B;EAC/B,oBAAoB;AACtB;;AAEA;;EAEE,WAAW;EACX,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,oCAAoC;EACpC,2BAA2B;AAC7B;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,OAAO;AACT;;AAEA;EACE,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,qCAAqC;EACrC,SAAS;AACX;;AAEA;;EAEE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,qCAAqC;EACrC,SAAS;AACX;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;EACtB,wBAAwB;EACxB,sBAAsB;EACtB,YAAY;EACZ,UAAU;EACV,aAAa;EACb,wBAAwB;EACxB,gCAAgC;EAChC,SAAS;EACT,gBAAgB;EAChB,iBAAiB;AACnB;;AAEA;;EAEE,mBAAmB;EACnB,sCAAsC;EACtC,yCAAyC;EACzC,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;EACtB,wBAAwB;EACxB,eAAe;EACf,kBAAkB;EAClB,mBAAmB;EACnB,sCAAsC;EACtC,yCAAyC;EACzC,YAAY;AACd;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,aAAa;EACb,sCAAsC;EACtC,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,UAAU;EACV,sCAAsC;EACtC,yCAAyC;EACzC,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,aAAa;EACb,6BAA6B;AAC/B;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,QAAQ;AACV;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,oCAAoC;EACpC,uBAAuB;EACvB,kBAAkB;AACpB","sourcesContent":["@font-face {\n  font-family: 'digital';\n  src: url('../assets/digital.ttf') format('truetype');\n}\n\n@font-face {\n  font-family: 'digital-italic';\n  src: url('../assets/digital-italic.ttf') format('truetype');\n}\n\nbody {\n  --text-color: rgb(0, 133, 0);\n  --background-color: rgba(0, 75, 0, 0.3);\n  --hover-color: rgba(255, 255, 255, 0.37);\n  height: 100vh;\n  width: 100vw;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  background-color: rgb(44, 44, 44);\n}\n\n#title {\n  font-family: 'digital-italic';\n  color: var(--text-color);\n  text-shadow:\n    -2px -2px 1px var(--text-color),\n    2px -2px 1px var(--text-color),\n    -2px 2px 1px var(--text-color),\n    2px 2px 1px var(--text-color);\n  letter-spacing: 10px;\n}\n\nheader,\nfooter {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\ndialog {\n  border-radius: 10px;\n}\n\ndialog::backdrop {\n  background-color: rgba(0, 0, 0, 0.7);\n  backdrop-filter: blur(12px);\n}\n\n.dialog-button-container {\n  display: flex;\n  justify-content: center;\n  gap: 5%;\n}\n\n.mode-button {\n  font-size: 24px;\n  border-radius: 5px;\n}\n\n#single-input-container {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  gap: 20px;\n}\n\n#pvp-dialog-container,\n#pvc-dialog-container {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n#dual-input-container {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 20px;\n}\n\n#pvp-start-button {\n  width: 100%;\n}\n\n#title {\n  font-size: 100px;\n  text-align: center;\n}\n\n#gameboard-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n#ui-container {\n  font-family: 'digital';\n  color: var(--text-color);\n  box-sizing: border-box;\n  height: 100%;\n  width: 20%;\n  display: grid;\n  grid-template-columns: 1;\n  grid-template-rows: 1fr 1fr auto;\n  gap: 20px;\n  padding-left: 2%;\n  padding-right: 2%;\n}\n\n#message-container,\n#alert-container {\n  border-radius: 10px;\n  border: solid var(--text-color) 0.75px;\n  background-color: var(--background-color);\n  padding: 8px;\n}\n\n#message-container {\n  text-align: center;\n  font-size: 40px;\n}\n\n#alert-container {\n  text-align: left;\n  font-size: 48px;\n}\n\n#button-container {\n  display: grid;\n  place-items: center;\n}\n\n#turn-button {\n  font-family: 'digital';\n  color: var(--text-color);\n  font-size: 40px;\n  text-align: center;\n  border-radius: 10px;\n  border: solid var(--text-color) 0.75px;\n  background-color: var(--background-color);\n  padding: 8px;\n}\n\n#turn-button:hover {\n  background-color: var(--hover-color);\n}\n\n.gameboard {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  gap: 2.5px;\n}\n\n.coordinate {\n  height: 5vh;\n  width: 5vh;\n  border: solid var(--text-color) 0.75px;\n  background-color: var(--background-color);\n  display: grid;\n  place-items: center;\n  font-size: 30px;\n  border-radius: 5px;\n}\n\n.active-coord:hover {\n  background-color: var(--hover-color);\n}\n\n.ship {\n  background-color: rgb(113, 197, 113);\n}\n\n.hit {\n  background-color: rgb(255, 129, 129);\n}\n\n.miss {\n  background-color: rgb(133, 133, 255);\n}\n\n#ship-info-container {\n  display: flex;\n  justify-content: space-around;\n}\n\n.ship-info {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  gap: 30px;\n}\n\n.ship-display {\n  display: flex;\n  gap: 1px;\n}\n\n.ship-unit {\n  height: 30px;\n  width: 30px;\n  background-color: rgb(113, 197, 113);\n  border: solid black 1px;\n  border-radius: 3px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/reset-css.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/reset-css.css ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
`, "",{"version":3,"sources":["webpack://./src/styles/reset-css.css"],"names":[],"mappings":"AAAA;;;CAGC;;AAED;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;EAiFE,SAAS;EACT,UAAU;EACV,SAAS;EACT,eAAe;EACf,aAAa;EACb,wBAAwB;AAC1B;AACA,gDAAgD;AAChD;;;;;;;;;;;EAWE,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,YAAY;AACd;AACA;;;;EAIE,WAAW;EACX,aAAa;AACf;AACA;EACE,yBAAyB;EACzB,iBAAiB;AACnB","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol,\nul {\n  list-style: none;\n}\nblockquote,\nq {\n  quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: '';\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/reset-css.css":
/*!**********************************!*\
  !*** ./src/styles/reset-css.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_reset_css_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./reset-css.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/reset-css.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_reset_css_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_reset_css_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_reset_css_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_reset_css_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/digital-italic.ttf":
/*!***************************************!*\
  !*** ./src/assets/digital-italic.ttf ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "digital-italic.ttf";

/***/ }),

/***/ "./src/assets/digital.ttf":
/*!********************************!*\
  !*** ./src/assets/digital.ttf ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "digital.ttf";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"bundle": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.css */ "./src/styles/main.css");
/* harmony import */ var _styles_reset_css_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/reset-css.css */ "./src/styles/reset-css.css");
/* harmony import */ var _renderDom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderDom */ "./src/renderDom.js");
/* harmony import */ var _gameFlow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameFlow */ "./src/gameFlow.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./player */ "./src/player.js");





_gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.loadGame();
_renderDom__WEBPACK_IMPORTED_MODULE_2__.domElements.pvpMode.addEventListener('click', function () {
  _gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.initPvpMode();
});
_renderDom__WEBPACK_IMPORTED_MODULE_2__.domElements.pvcMode.addEventListener('click', function () {
  _gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.initPvcMode();
});
_renderDom__WEBPACK_IMPORTED_MODULE_2__.domElements.pvpStartButton.addEventListener('click', function () {
  _gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.activePlayer = new _player__WEBPACK_IMPORTED_MODULE_4__.Human(_renderDom__WEBPACK_IMPORTED_MODULE_2__.domElements.player1Name.value);
  _gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.activeGameboard = _renderDom__WEBPACK_IMPORTED_MODULE_2__.domElements.gameboardOne;
  _gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.inactivePlayer = new _player__WEBPACK_IMPORTED_MODULE_4__.Human(_renderDom__WEBPACK_IMPORTED_MODULE_2__.domElements.player2Name.value);
  _gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.inactiveGameboard = _renderDom__WEBPACK_IMPORTED_MODULE_2__.domElements.gameboardTwo;
  _renderDom__WEBPACK_IMPORTED_MODULE_2__.domElements.pvpDialog.close();
  _renderDom__WEBPACK_IMPORTED_MODULE_2__.domElements.renderGameboard(_gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.activePlayer, _gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.activeGameboard);
  _renderDom__WEBPACK_IMPORTED_MODULE_2__.domElements.renderGameboard(_gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.inactivePlayer, _gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.inactiveGameboard);
  _gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.pvpShipPlacement();
});
_renderDom__WEBPACK_IMPORTED_MODULE_2__.domElements.pvcStartButton.addEventListener('click', function () {
  _gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.activePlayer = new _player__WEBPACK_IMPORTED_MODULE_4__.Human(_renderDom__WEBPACK_IMPORTED_MODULE_2__.domElements.playerName.value);
  _gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.activeGameboard = _renderDom__WEBPACK_IMPORTED_MODULE_2__.domElements.gameboardOne;
  _gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.inactivePlayer = new _player__WEBPACK_IMPORTED_MODULE_4__.Computer();
  _gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.inactiveGameboard = _renderDom__WEBPACK_IMPORTED_MODULE_2__.domElements.gameboardTwo;
  _renderDom__WEBPACK_IMPORTED_MODULE_2__.domElements.pvcDialog.close();
  _renderDom__WEBPACK_IMPORTED_MODULE_2__.domElements.renderGameboard(_gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.activePlayer, _gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.activeGameboard);
  _renderDom__WEBPACK_IMPORTED_MODULE_2__.domElements.renderGameboard(_gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.inactivePlayer, _gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.inactiveGameboard);
  _gameFlow__WEBPACK_IMPORTED_MODULE_3__.gameFlow.pvcShipPlacement();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map