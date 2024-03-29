"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("./index"));

var _enzymeAdapterUtils = require("enzyme-adapter-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function getFiber(element) {
  var container = global.document.createElement('div');
  var inst = null;

  var Tester =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Tester, _React$Component);

    function Tester() {
      _classCallCheck(this, Tester);

      return _possibleConstructorReturn(this, _getPrototypeOf(Tester).apply(this, arguments));
    }

    _createClass(Tester, [{
      key: "render",
      value: function render() {
        inst = this;
        return element;
      }
    }]);

    return Tester;
  }(_react.default.Component);

  _reactDom.default.render(_react.default.createElement(Tester), container);

  return inst._reactInternalFiber.child;
}

function getLazyFiber(LazyComponent) {
  var container = global.document.createElement('div');
  var inst = null; // eslint-disable-next-line react/prefer-stateless-function

  var Tester =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(Tester, _React$Component2);

    function Tester() {
      _classCallCheck(this, Tester);

      return _possibleConstructorReturn(this, _getPrototypeOf(Tester).apply(this, arguments));
    }

    _createClass(Tester, [{
      key: "render",
      value: function render() {
        inst = this;
        return _react.default.createElement(LazyComponent);
      }
    }]);

    return Tester;
  }(_react.default.Component); // eslint-disable-next-line react/prefer-stateless-function


  var SuspenseWrapper =
  /*#__PURE__*/
  function (_React$Component3) {
    _inherits(SuspenseWrapper, _React$Component3);

    function SuspenseWrapper() {
      _classCallCheck(this, SuspenseWrapper);

      return _possibleConstructorReturn(this, _getPrototypeOf(SuspenseWrapper).apply(this, arguments));
    }

    _createClass(SuspenseWrapper, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(_react.default.Suspense, {
          fallback: false
        }, _react.default.createElement(Tester));
      }
    }]);

    return SuspenseWrapper;
  }(_react.default.Component);

  _reactDom.default.render(_react.default.createElement(SuspenseWrapper), container);

  return inst._reactInternalFiber.child;
}

module.exports = function detectFiberTags() {
  var supportsMode = typeof _react.default.StrictMode !== 'undefined';
  var supportsContext = typeof _react.default.createContext !== 'undefined';
  var supportsForwardRef = typeof _react.default.forwardRef !== 'undefined';
  var supportsMemo = typeof _react.default.memo !== 'undefined';
  var supportsProfiler = typeof _react.default.unstable_Profiler !== 'undefined';
  var supportsSuspense = typeof _react.default.Suspense !== 'undefined';
  var supportsLazy = typeof _react.default.lazy !== 'undefined';

  function Fn() {
    return null;
  } // eslint-disable-next-line react/prefer-stateless-function


  var Cls =
  /*#__PURE__*/
  function (_React$Component4) {
    _inherits(Cls, _React$Component4);

    function Cls() {
      _classCallCheck(this, Cls);

      return _possibleConstructorReturn(this, _getPrototypeOf(Cls).apply(this, arguments));
    }

    _createClass(Cls, [{
      key: "render",
      value: function render() {
        return null;
      }
    }]);

    return Cls;
  }(_react.default.Component);

  var Ctx = null;
  var FwdRef = null;
  var LazyComponent = null;

  if (supportsContext) {
    Ctx = _react.default.createContext();
  }

  if (supportsForwardRef) {
    // React will warn if we don't have both arguments.
    // eslint-disable-next-line no-unused-vars
    FwdRef = _react.default.forwardRef(function (props, ref) {
      return null;
    });
  }

  if (supportsLazy) {
    LazyComponent = _react.default.lazy(function () {
      return (0, _enzymeAdapterUtils.fakeDynamicImport)(function () {
        return null;
      });
    });
  }

  return {
    HostRoot: getFiber('test').return.return.tag,
    // Go two levels above to find the root
    ClassComponent: getFiber(_react.default.createElement(Cls)).tag,
    Fragment: getFiber([['nested']]).tag,
    FunctionalComponent: getFiber(_react.default.createElement(Fn)).tag,
    MemoSFC: supportsMemo ? getFiber(_react.default.createElement(_react.default.memo(Fn))).tag : -1,
    MemoClass: supportsMemo ? getFiber(_react.default.createElement(_react.default.memo(Cls))).tag : -1,
    HostPortal: getFiber(_reactDom.default.createPortal(null, global.document.createElement('div'))).tag,
    HostComponent: getFiber(_react.default.createElement('span')).tag,
    HostText: getFiber('text').tag,
    Mode: supportsMode ? getFiber(_react.default.createElement(_react.default.StrictMode)).tag : -1,
    ContextConsumer: supportsContext ? getFiber(_react.default.createElement(Ctx.Consumer, null, function () {
      return null;
    })).tag : -1,
    ContextProvider: supportsContext ? getFiber(_react.default.createElement(Ctx.Provider, {
      value: null
    }, null)).tag : -1,
    ForwardRef: supportsForwardRef ? getFiber(_react.default.createElement(FwdRef)).tag : -1,
    Profiler: supportsProfiler ? getFiber(_react.default.createElement(_react.default.unstable_Profiler, {
      id: 'mock',
      onRender: function onRender() {}
    })).tag : -1,
    Suspense: supportsSuspense ? getFiber(_react.default.createElement(_react.default.Suspense, {
      fallback: false
    })).tag : -1,
    Lazy: supportsLazy ? getLazyFiber(LazyComponent).tag : -1
  };
};
