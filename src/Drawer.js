'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _View2 = require('./View');

var _View3 = _interopRequireDefault(_View2);

var _utilsViewport = require('./utils/viewport');

var _utilsCss = require('./utils/css');

var _utilsCss2 = _interopRequireDefault(_utilsCss);

var TOP = -1;
var BOTTOM = 1;
var LEFT = -1;
var RIGHT = 1;

_utilsCss2['default'].register({
  '.drawer': {
    zIndex: 100,
    transform: 'translateZ(0)' }
});

// enable GPU

var Drawer = (function (_View) {
  _inherits(Drawer, _View);

  function Drawer() {
    _classCallCheck(this, Drawer);

    _get(Object.getPrototypeOf(Drawer.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Drawer, [{
    key: 'getClassNames',
    value: function getClassNames() {
      var cs = _get(Object.getPrototypeOf(Drawer.prototype), 'getClassNames', this).call(this);
      cs.drawer = true;
      return cs;
    }
  }, {
    key: 'getSize',
    value: function getSize() {
      var size = _get(Object.getPrototypeOf(Drawer.prototype), 'getSize', this).call(this);
      if (!size) {
        throw new Error('Drawer must have a fixed size');
      }
      return size;
    }
  }, {
    key: 'getStyle',
    value: function getStyle() {
      var style = _get(Object.getPrototypeOf(Drawer.prototype), 'getStyle', this).call(this);
      // If props.docked is set then dock the drawer back into the
      // page when the viewport size is met
      if (this.props.docked) {
        var axis = this.isColumn() ? 'width' : 'height';
        if (_utilsViewport.viewport[axis][this.props.docked]) {
          return style;
        }
      }
      // Float the view off the page.
      // Use props.active to reveal it
      // Use props.side to dictate which side to float
      style.position = 'absolute';
      var offset = this.props.active ? 0 : 0 - this.getSize();
      if (this.isColumn()) {
        style.top = 0;
        style.height = '100%';
        if (this.props.side == LEFT) {
          style.left = offset + 'rem';
        } else {
          style.right = offset + 'rem';
        }
      } else {
        style.left = 0;
        style.width = '100%';
        if (this.props.side == TOP) {
          style.top = offset + 'rem';
        } else {
          style.bottom = offset + 'rem';
        }
      }
      return style;
    }
  }], [{
    key: 'propTypes',
    value: _extends({
      // Set to the name of a breakpoint at which the drawer should
      // get docked in place as if it is just a normal View
      docked: _react2['default'].PropTypes.oneOf(_Object$keys(_utilsViewport.Viewport.breakpoints.width)),
      // Set to the side you want the drawer to reveal from
      side: _react2['default'].PropTypes.oneOf([LEFT, RIGHT, TOP, BOTTOM]),
      // Set to true to reveal the floating drawer
      // this will override the "hide" property when drawer is not docked
      active: _react2['default'].PropTypes.bool
    }, _View3['default'].propTypes),
    enumerable: true
  }, {
    key: 'defaultProps',
    value: _extends({}, _View3['default'].defaultProps, {
      depth: 2,
      side: LEFT,
      theme: { mode: 'light' },
      size: 25
    }),
    enumerable: true
  }]);

  return Drawer;
})(_View3['default']);

exports['default'] = Drawer;
module.exports = exports['default'];
// ..and all View props