'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

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
  '.view.icon': {
    position: 'relative',
    alignItems: 'center'
  }
});

var Icon = (function (_View) {
  _inherits(Icon, _View);

  _createClass(Icon, [{
    key: 'getBackgroundColor',
    value: function getBackgroundColor() {
      return 'transparent';
    }
  }]);

  function Icon() {
    _classCallCheck(this, Icon);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(Icon.prototype), 'constructor', this).apply(this, args);
    this.state = { active: false };
  }

  _createClass(Icon, [{
    key: 'getClassNames',
    value: function getClassNames() {
      var cs = _get(Object.getPrototypeOf(Icon.prototype), 'getClassNames', this).call(this);
      cs.icon = true;
      return cs;
    }
  }, {
    key: 'getSVG',
    value: function getSVG() {
      throw new Error('Icon cannot be used directly... require something from ./icons');
    }

    // getSize of the icon to display. Unless overrided by size prop
    // icon size is determined by container size and scale
  }, {
    key: 'getSize',
    value: function getSize() {
      // user set fixed size
      var size = _get(Object.getPrototypeOf(Icon.prototype), 'getSize', this).call(this);
      if (typeof size == 'number') {
        return size * this.getScale();
      }
      // The 'intrinsic' size of an icon is to maintain the aspect ratio
      // of the cross-axis ie. if container's height=10 then icon's width=10
      if (this.props.size == 'intrinsic') {
        var _parent = this.getParent();
        if (_parent) {
          var parentSize = _parent.getSize();
          if (typeof parentSize == 'number') {
            return parentSize;
          }
        }
      }
      return 1.6 * this.getScale();
    }
  }, {
    key: 'render',
    value: function render() {
      var svg = _react2['default'].cloneElement(this.getSVG(), {
        red: 'icon',
        style: {
          fill: this.getTextColor()
        },
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        width: '100%',
        height: '100%'
      });
      return _get(Object.getPrototypeOf(Icon.prototype), 'render', this).call(this, svg);
    }
  }]);

  return Icon;
})(_View3['default']);

exports['default'] = Icon;
module.exports = exports['default'];