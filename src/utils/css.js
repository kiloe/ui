'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.register = register;
exports.render = render;
exports.createMarkupForStyles = createMarkupForStyles;
exports.getProperty = getProperty;
exports.toRGBA = toRGBA;

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactLibCSSPropertyOperations = require('react/lib/CSSPropertyOperations');

var _reactLibCSSPropertyOperations2 = _interopRequireDefault(_reactLibCSSPropertyOperations);

// required global browser styles/resets
var globalStyles = {
  'html': {
    fontFamily: '\'Roboto\', sans-serif',
    WebkitTapHighlightColor: 'transparent',
    fontSize: 12
  },
  '*, *:before, *:after': {
    WebkitTapHighlightColor: 'inherit'
  },
  'html,body,#app': {
    margin: 0,
    padding: 0,
    display: 'flex',
    flex: '0 0 100%',
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    alignContent: 'stretch',
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    background: '#ccc'
  }
};

var usedStyles = _extends({}, globalStyles);

function register(styles) {
  usedStyles = _extends({}, usedStyles, styles);
}

// CSS.render will insert or update a <style> tag into the page
// containing all the styles used by included components

function render() {
  var id = 'app-style';
  var oldStyle = document.getElementById(id);
  if (oldStyle) {
    document.head.removeChild(oldStyle);
  }
  var css = createMarkupForStyles(usedStyles);
  var style = document.createElement('style');
  style.id = id;
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  document.head.appendChild(style);
}

// CSS.createMarkupForStyles will convert js-css to real CSS markup.

function createMarkupForStyles(styles) {
  return _Object$keys(styles).map(function (selector) {
    var props = styles[selector];
    if (typeof props == 'object') {
      props = expandTransitionStyle(props);
      props = _reactLibCSSPropertyOperations2['default'].createMarkupForStyles(props);
    }
    return selector + ' { ' + props + ' }';
  }).join('\n');
}

// Convert transition styles {left: '600ms ease'} => 'left 600ms ease'.
function expandTransitionStyle(props) {
  return _Object$keys(props).reduce(function (o, k) {
    if (k == 'transition' && typeof props[k] == 'object') {
      o[k] = _Object$keys(props[k]).map(function (propName) {
        return propName + ' ' + props[k][propName];
      }).join(',');
    }
    return o;
  }, props);
}

// like calling getComputedStyle(node).getPropertyValue(cssProp)
// but for React components

function getProperty(component, prop) {
  var node = _reactDom2['default'].findDOMNode(component);
  if (!node) {
    throw new Error('no dom node for component');
  }
  var style = getComputedStyle(node);
  if (!style) {
    throw new Error('no computed style for component');
  }
  if (!prop) {
    throw new Error('missing style propety argument');
  }
  return style.getPropertyValue(prop);
}

// convert a color (hex/name/rgb) to whatever format getComputedStyle returns.
// should only be used in tests really.

function toRGBA(color) {
  var div = document.createElement('div');
  div.style.backgroundColor = color;
  div.id = 'toRGBA-tmp';
  document.body.appendChild(div);
  var rgba = getComputedStyle(div).getPropertyValue('background-color');
  document.body.removeChild(div);
  return rgba;
}

var transitions = {
  swift: '300ms cubic-bezier(0.23, 1, 0.32, 1)',
  smooth: '500ms cubic-bezier(1, 0, 0, 1)'
};

var CSS = {
  render: render,
  createMarkupForStyles: createMarkupForStyles,
  register: register,
  getProperty: getProperty,
  toRGBA: toRGBA,
  transitions: transitions
};

exports['default'] = CSS;