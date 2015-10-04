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

var List = (function (_View) {
  _inherits(List, _View);

  function List() {
    _classCallCheck(this, List);

    _get(Object.getPrototypeOf(List.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(List, [{
    key: 'getStyle',
    value: function getStyle() {
      var style = _get(Object.getPrototypeOf(List.prototype), 'getStyle', this).call(this);
      // style.paddingTop = '8px';
      return style;
    }
  }], [{
    key: 'defaultProps',
    value: _extends({}, _View3['default'].defaultProps, {
      scroll: true,
      row: false
    }),
    enumerable: true
  }]);

  return List;
})(_View3['default']);

exports['default'] = List;
module.exports = exports['default'];