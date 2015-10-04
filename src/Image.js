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
  '.image img': {
    maxWidth: '100%',
    maxHeight: '100%'
  }
});

var Image = (function (_View) {
  _inherits(Image, _View);

  function Image() {
    _classCallCheck(this, Image);

    _get(Object.getPrototypeOf(Image.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Image, [{
    key: 'getClassNames',
    value: function getClassNames() {
      var cs = _get(Object.getPrototypeOf(Image.prototype), 'getClassNames', this).call(this);
      cs.image = true;
      return cs;
    }
  }, {
    key: 'getStyle',
    value: function getStyle() {
      var style = _get(Object.getPrototypeOf(Image.prototype), 'getStyle', this).call(this);

      style.justifyContent = 'space-around';
      if (this.props.top) style.justifyContent = 'flex-start';

      return style;
    }
  }, {
    key: 'render',
    value: function render() {
      var s = {};
      return _get(Object.getPrototypeOf(Image.prototype), 'render', this).call(this, _react2['default'].createElement('img', { src: this.props.src, style: s }));
    }
  }], [{
    key: 'propTypes',
    value: _extends({}, _View3['default'].propTypes, {
      src: _react2['default'].PropTypes.string,
      top: _react2['default'].PropTypes.bool
    }),
    enumerable: true
  }, {
    key: 'defaultProps',
    value: _extends({}, _View3['default'].defaultProps, {
      row: true,
      align: 'center',
      size: 'intrinsic',
      top: false
    }),
    enumerable: true
  }]);

  return Image;
})(_View3['default']);

exports['default'] = Image;
module.exports = exports['default'];