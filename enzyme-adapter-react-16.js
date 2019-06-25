"use strict";

var _functionPrototype = _interopRequireDefault(require("function.prototype.name"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("../react-dom"));

var _server = _interopRequireDefault(require("../react-dom/server"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _testUtils = _interopRequireDefault(require("../react-dom/test-utils"));

var _reactIs = require("react-is");

var _enzyme = require("enzyme");

var _Utils = require("enzyme/build/Utils");

var _enzymeAdapterUtils = require("enzyme-adapter-utils");

var _reflection = require("react-reconciler/reflection");

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

var HostRoot = 3;
var ClassComponent = 2;
var FragmentType = 10;
var FunctionalComponent = 1;
var HostPortal = 4;
var HostComponent = 5;
var HostText = 6;
var Mode = 11;
var ContextConsumerType = 12;
var ContextProviderType = 13;

function nodeAndSiblingsArray(nodeWithSibling) {
  var array = [];
  var node = nodeWithSibling;

  while (node != null) {
    array.push(node);
    node = node.sibling;
  }

  return array;
}

function flatten(arr) {
  var result = [];
  var stack = [{
    i: 0,
    array: arr
  }];

  while (stack.length) {
    var n = stack.pop();

    while (n.i < n.array.length) {
      var el = n.array[n.i];
      n.i += 1;

      if (Array.isArray(el)) {
        stack.push(n);
        stack.push({
          i: 0,
          array: el
        });
        break;
      }

      result.push(el);
    }
  }

  return result;
}

function toTree(vnode) {
  if (vnode == null) {
    return null;
  } // TODO(lmr): I'm not really sure I understand whether or not this is what
  // i should be doing, or if this is a hack for something i'm doing wrong
  // somewhere else. Should talk to sebastian about this perhaps


  var node = (0, _reflection.findCurrentFiberUsingSlowPath)(vnode);

  switch (node.tag) {
    case HostRoot:
      // 3
      return childrenToTree(node.child);

    case HostPortal:
      {
        // 4
        return childrenToTree(node.child);
      }

    case ClassComponent:
      return {
        nodeType: 'class',
        type: node.type,
        props: { ...node.memoizedProps
        },
        key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(node.key),
        ref: node.ref,
        instance: node.stateNode,
        rendered: childrenToTree(node.child)
      };

    case FunctionalComponent:
      // 1
      return {
        nodeType: 'function',
        type: node.type,
        props: { ...node.memoizedProps
        },
        key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(node.key),
        ref: node.ref,
        instance: null,
        rendered: childrenToTree(node.child)
      };

    case HostComponent:
      {
        // 5
        var renderedNodes = flatten(nodeAndSiblingsArray(node.child).map(toTree));

        if (renderedNodes.length === 0) {
          renderedNodes = [node.memoizedProps.children];
        }

        return {
          nodeType: 'host',
          type: node.type,
          props: { ...node.memoizedProps
          },
          key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(node.key),
          ref: node.ref,
          instance: node.stateNode,
          rendered: renderedNodes
        };
      }

    case HostText:
      // 6
      return node.memoizedProps;

    case FragmentType: // 10

    case Mode: // 11

    case ContextProviderType: // 13

    case ContextConsumerType:
      // 12
      return childrenToTree(node.child);

    default:
      throw new Error("Enzyme Internal Error: unknown node with tag ".concat(node.tag));
  }
}

function childrenToTree(node) {
  if (!node) {
    return null;
  }

  var children = nodeAndSiblingsArray(node);

  if (children.length === 0) {
    return null;
  }

  if (children.length === 1) {
    return toTree(children[0]);
  }

  return flatten(children.map(toTree));
}

function _nodeToHostNode(_node) {
  // NOTE(lmr): node could be a function component
  // which wont have an instance prop, but we can get the
  // host node associated with its return value at that point.
  // Although this breaks down if the return value is an array,
  // as is possible with React 16.
  var node = _node;

  while (node && !Array.isArray(node) && node.instance === null) {
    node = node.rendered;
  }

  if (Array.isArray(node)) {
    // TODO(lmr): throw warning regarding not being able to get a host node here
    throw new Error('Trying to get host node of an array');
  } // if the SFC returned null effectively, there is no host node.


  if (!node) {
    return null;
  }

  return _reactDom.default.findDOMNode(node.instance);
}

var ReactSixteenAdapter =
/*#__PURE__*/
function (_EnzymeAdapter) {
  _inherits(ReactSixteenAdapter, _EnzymeAdapter);

  function ReactSixteenAdapter() {
    var _this;

    _classCallCheck(this, ReactSixteenAdapter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactSixteenAdapter).call(this));
    var lifecycles = _this.options.lifecycles;
    _this.options = { ..._this.options,
      enableComponentDidUpdateOnSetState: true,
      // TODO: remove, semver-major
      lifecycles: { ...lifecycles,
        componentDidUpdate: {
          onSetState: true
        },
        getSnapshotBeforeUpdate: true
      }
    };
    return _this;
  }

  _createClass(ReactSixteenAdapter, [{
    key: "createMountRenderer",
    value: function createMountRenderer(options) {
      (0, _enzymeAdapterUtils.assertDomAvailable)('mount');
      var attachTo = options.attachTo,
          hydrateIn = options.hydrateIn;
      var domNode = hydrateIn || attachTo || global.document.createElement('div');
      var instance = null;
      return {
        render: function render(el, context, callback) {
          if (instance === null) {
            var type = el.type,
                props = el.props,
                ref = el.ref;
            var wrapperProps = {
              Component: type,
              props: props,
              context: context,
              ...(ref && {
                ref: ref
              })
            };
            var ReactWrapperComponent = (0, _enzymeAdapterUtils.createMountWrapper)(el, options);

            var wrappedEl = _react.default.createElement(ReactWrapperComponent, wrapperProps);

            instance = hydrateIn ? _reactDom.default.hydrate(wrappedEl, domNode) : _reactDom.default.render(wrappedEl, domNode);

            if (typeof callback === 'function') {
              callback();
            }
          } else {
            instance.setChildProps(el.props, context, callback);
          }
        },
        unmount: function unmount() {
          _reactDom.default.unmountComponentAtNode(domNode);

          instance = null;
        },
        getNode: function getNode() {
          return instance ? toTree(instance._reactInternalFiber).rendered : null;
        },
        simulateEvent: function simulateEvent(node, event, mock) {
          var mappedEvent = (0, _enzymeAdapterUtils.mapNativeEventNames)(event, {
            animation: true
          });
          var eventFn = _testUtils.default.Simulate[mappedEvent];

          if (!eventFn) {
            throw new TypeError("ReactWrapper::simulate() event '".concat(event, "' does not exist"));
          } // eslint-disable-next-line react/no-find-dom-node


          eventFn(_nodeToHostNode(node), mock);
        },
        batchedUpdates: function batchedUpdates(fn) {
          return fn(); // return ReactDOM.unstable_batchedUpdates(fn);
        }
      };
    }
  }, {
    key: "createShallowRenderer",
    value: function createShallowRenderer()
    /* options */
    {
      var renderer = new _shallow.default();
      var isDOM = false;
      var cachedNode = null;
      return {
        render: function render(el, context) {
          cachedNode = el;
          /* eslint consistent-return: 0 */

          if (typeof el.type === 'string') {
            isDOM = true;
          } else {
            isDOM = false;
            var Component = el.type;
            var isStateful = Component.prototype && (Component.prototype.isReactComponent || Array.isArray(Component.__reactAutoBindPairs)); // fallback for createClass components

            if (!isStateful && typeof Component === 'function') {
              var wrappedEl = Object.assign(function () {
                return Component.apply(void 0, arguments);
              }, // eslint-disable-line new-cap
              Component);
              return (0, _enzymeAdapterUtils.withSetStateAllowed)(function () {
                return renderer.render({ ...el,
                  type: wrappedEl
                }, context);
              });
            }

            return (0, _enzymeAdapterUtils.withSetStateAllowed)(function () {
              return renderer.render(el, context);
            });
          }
        },
        unmount: function unmount() {
          renderer.unmount();
        },
        getNode: function getNode() {
          if (isDOM) {
            return (0, _enzymeAdapterUtils.elementToTree)(cachedNode);
          }

          var output = renderer.getRenderOutput();
          return {
            nodeType: (0, _enzymeAdapterUtils.nodeTypeFromType)(cachedNode.type),
            type: cachedNode.type,
            props: cachedNode.props,
            key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(cachedNode.key),
            ref: cachedNode.ref,
            instance: renderer._instance,
            rendered: Array.isArray(output) ? flatten(output).map(_enzymeAdapterUtils.elementToTree) : (0, _enzymeAdapterUtils.elementToTree)(output)
          };
        },
        simulateEvent: function simulateEvent(node, event) {
          for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }

          var handler = node.props[(0, _enzymeAdapterUtils.propFromEvent)(event)];

          if (handler) {
            var returned;
            (0, _enzymeAdapterUtils.withSetStateAllowed)(function () {
              // TODO(lmr): create/use synthetic events
              // TODO(lmr): emulate React's event propagation
              // ReactDOM.unstable_batchedUpdates(() => {
              returned = handler.apply(void 0, args); // });
            });
            return returned;
          }
        },
        batchedUpdates: function batchedUpdates(fn) {
          return fn(); // return ReactDOM.unstable_batchedUpdates(fn);
        }
      };
    }
  }, {
    key: "createStringRenderer",
    value: function createStringRenderer(options) {
      return {
        render: function render(el, context) {
          if (options.context && (el.type.contextTypes || options.childContextTypes)) {
            var childContextTypes = { ...(el.type.contextTypes || {}),
              ...options.childContextTypes
            };
            var ContextWrapper = (0, _enzymeAdapterUtils.createRenderWrapper)(el, context, childContextTypes);
            return _server.default.renderToStaticMarkup(_react.default.createElement(ContextWrapper));
          }

          return _server.default.renderToStaticMarkup(el);
        }
      };
    } // Provided a bag of options, return an `EnzymeRenderer`. Some options can be implementation
    // specific, like `attach` etc. for React, but not part of this interface explicitly.
    // eslint-disable-next-line class-methods-use-this, no-unused-vars

  }, {
    key: "createRenderer",
    value: function createRenderer(options) {
      switch (options.mode) {
        case _enzyme.EnzymeAdapter.MODES.MOUNT:
          return this.createMountRenderer(options);

        case _enzyme.EnzymeAdapter.MODES.SHALLOW:
          return this.createShallowRenderer(options);

        case _enzyme.EnzymeAdapter.MODES.STRING:
          return this.createStringRenderer(options);

        default:
          throw new Error("Enzyme Internal Error: Unrecognized mode: ".concat(options.mode));
      }
    } // converts an RSTNode to the corresponding JSX Pragma Element. This will be needed
    // in order to implement the `Wrapper.mount()` and `Wrapper.shallow()` methods, but should
    // be pretty straightforward for people to implement.
    // eslint-disable-next-line class-methods-use-this, no-unused-vars

  }, {
    key: "nodeToElement",
    value: function nodeToElement(node) {
      if (!node || _typeof(node) !== 'object') return null;
      return _react.default.createElement(node.type, (0, _enzymeAdapterUtils.propsWithKeysAndRef)(node));
    }
  }, {
    key: "elementToNode",
    value: function elementToNode(element) {
      return (0, _enzymeAdapterUtils.elementToTree)(element);
    }
  }, {
    key: "nodeToHostNode",
    value: function nodeToHostNode(node) {
      return _nodeToHostNode(node);
    }
  }, {
    key: "displayNameOfNode",
    value: function displayNameOfNode(node) {
      if (!node) return null;
      var type = node.type,
          $$typeof = node.$$typeof;

      switch (type || $$typeof) {
        case _reactIs.AsyncMode:
          return 'AsyncMode';

        case _reactIs.Fragment:
          return 'Fragment';

        case _reactIs.StrictMode:
          return 'StrictMode';

        case _reactIs.Profiler:
          return 'Profiler';

        case _reactIs.Portal:
          return 'Portal';

        default:
          {
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case _reactIs.ContextConsumer:
                return 'ContextConsumer';

              case _reactIs.ContextProvider:
                return 'ContextProvider';

              case _reactIs.ForwardRef:
                {
                  var name = type.render.displayName || (0, _functionPrototype.default)(type.render);
                  return name ? "ForwardRef(".concat(name, ")") : 'ForwardRef';
                }

              default:
                return (0, _enzymeAdapterUtils.displayNameOfNode)(node);
            }
          }
      }
    }
  }, {
    key: "isValidElement",
    value: function isValidElement(element) {
      return (0, _reactIs.isElement)(element);
    }
  }, {
    key: "isValidElementType",
    value: function isValidElementType(object) {
      return (0, _reactIs.isValidElementType)(object);
    }
  }, {
    key: "isFragment",
    value: function isFragment(fragment) {
      return (0, _Utils.typeOfNode)(fragment) === _reactIs.Fragment;
    }
  }, {
    key: "createElement",
    value: function createElement() {
      return _react.default.createElement.apply(_react.default, arguments);
    }
  }]);

  return ReactSixteenAdapter;
}(_enzyme.EnzymeAdapter);

module.exports = ReactSixteenAdapter;