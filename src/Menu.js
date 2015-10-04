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

var _View = require('./View');

var _View2 = _interopRequireDefault(_View);

var Menu = (function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu() {
    _classCallCheck(this, Menu);

    _get(Object.getPrototypeOf(Menu.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Menu, [{
    key: 'render',
    value: function render() {
      var viewProps = {
        raised: 1,
        theme: { mode: 'light' },
        row: false,
        style: _extends({
          position: 'absolute',
          display: 'flex',
          zIndex: 999
        }, this.props.style)
      };
      return _react2['default'].createElement(_View2['default'], viewProps, this.props.children);
    }
  }], [{
    key: 'propTypes',
    value: _extends({}, _View2['default'].propTypes, {
      style: _react2['default'].PropTypes.object
    }),
    enumerable: true
  }]);

  return Menu;
})(_react2['default'].Component);

exports['default'] = Menu;
module.exports = exports['default'];