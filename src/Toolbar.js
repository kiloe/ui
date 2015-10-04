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

var Toolbar = (function (_View) {
  _inherits(Toolbar, _View);

  function Toolbar() {
    _classCallCheck(this, Toolbar);

    _get(Object.getPrototypeOf(Toolbar.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Toolbar, [{
    key: 'getSize',

    // getSize returns the height of the toolbar (in rem)
    // unless specifically overrided by the size prop, a toolbar's size
    // is dictated by the scale prop
    value: function getSize() {
      var size = _get(Object.getPrototypeOf(Toolbar.prototype), 'getSize', this).call(this);
      if (typeof size != 'undefined') {
        return size;
      }
      return 3 * this.getScale();
    }
  }], [{
    key: 'defaultProps',
    value: _extends({}, _View3['default'].defaultProps, {
      row: true,
      raised: 2
    }),
    enumerable: true
  }]);

  return Toolbar;
})(_View3['default']);

exports['default'] = Toolbar;
module.exports = exports['default'];