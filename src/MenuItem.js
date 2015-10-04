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

var _utilsCss = require('./utils/css');

var _utilsCss2 = _interopRequireDefault(_utilsCss);

_utilsCss2['default'].register({
  '.view.menuitem': {
    display: 'block',
    padding: 8,
    margin: 8
  },
  '.view.menuitem:hover': {
    background: 'blue'
  }
});

var MenuItem = (function (_View) {
  _inherits(MenuItem, _View);

  function MenuItem() {
    _classCallCheck(this, MenuItem);

    _get(Object.getPrototypeOf(MenuItem.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(MenuItem, [{
    key: 'getClassNames',
    value: function getClassNames() {
      var cs = _get(Object.getPrototypeOf(MenuItem.prototype), 'getClassNames', this).call(this);
      cs.menuitem = true;
      return cs;
    }
  }, {
    key: 'render',
    value: function render() {
      return _get(Object.getPrototypeOf(MenuItem.prototype), 'render', this).call(this, this.props.label);
    }
  }], [{
    key: 'defaultProps',
    value: _extends({}, _View3['default'].defaultProps, {
      raised: 1,
      theme: { mode: 'transparent' }
    }),
    enumerable: true
  }]);

  return MenuItem;
})(_View3['default']);

exports['default'] = MenuItem;
module.exports = exports['default'];