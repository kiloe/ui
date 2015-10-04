'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.render = render;

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _css = require('./css');

var _css2 = _interopRequireDefault(_css);

// DOM.render is just a wrapper around ReactDOM.render that also renders the CSS.

function render(jsx, target) {
  _css2['default'].render();
  return _reactDom2['default'].render(jsx, target);
}

exports['default'] = {
  render: render
};