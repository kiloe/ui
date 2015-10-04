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

var _Image2 = require('./Image');

var _Image3 = _interopRequireDefault(_Image2);

var _utilsCss = require('./utils/css');

var _utilsCss2 = _interopRequireDefault(_utilsCss);

_utilsCss2['default'].register({
  '.avatar img': {
    borderRadius: '50%'
  },
  '.listItem .avatar': {
    alignSelf: 'flex-start'
  }
});

var Avatar = (function (_Image) {
  _inherits(Avatar, _Image);

  function Avatar() {
    _classCallCheck(this, Avatar);

    _get(Object.getPrototypeOf(Avatar.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Avatar, [{
    key: 'getClassNames',
    value: function getClassNames() {
      var cs = _get(Object.getPrototypeOf(Avatar.prototype), 'getClassNames', this).call(this);
      cs.avatar = true;
      return cs;
    }
  }, {
    key: 'getSize',
    value: function getSize() {
      return 3.5 * this.getScale();
    }
  }, {
    key: 'getStyle',
    value: function getStyle() {
      var style = _get(Object.getPrototypeOf(Avatar.prototype), 'getStyle', this).call(this);

      //style.width = this.getSize()+'rem';
      //style.height = this.getSize()+'rem';

      return style;
    }
  }], [{
    key: 'propTypes',
    value: _extends({}, _View2['default'].propTypes, {
      avatar: _react2['default'].PropTypes.bool
    }),
    enumerable: true
  }, {
    key: 'defaultProps',
    value: _extends({}, _View2['default'].defaultProps),
    enumerable: true
  }]);

  return Avatar;
})(_Image3['default']);

exports['default'] = Avatar;
module.exports = exports['default'];