'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _View2 = require('./View');

var _View3 = _interopRequireDefault(_View2);

var Divider = (function (_View) {
  _inherits(Divider, _View);

  function Divider() {
    _classCallCheck(this, Divider);

    _get(Object.getPrototypeOf(Divider.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Divider, null, [{
    key: 'defaultProps',
    value: _extends({}, _View3['default'].defaultProps, {
      divider: true
    }),
    enumerable: true
  }]);

  return Divider;
})(_View3['default']);

exports['default'] = Divider;
module.exports = exports['default'];