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

var _Text2 = require('./Text');

var _Text3 = _interopRequireDefault(_Text2);

var SecondaryText = (function (_Text) {
  _inherits(SecondaryText, _Text);

  function SecondaryText() {
    _classCallCheck(this, SecondaryText);

    _get(Object.getPrototypeOf(SecondaryText.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(SecondaryText, [{
    key: 'getClassNames',
    value: function getClassNames() {
      var cs = _get(Object.getPrototypeOf(SecondaryText.prototype), 'getClassNames', this).call(this);
      cs.secondaryText = true;

      return cs;
    }
  }, {
    key: 'getStyle',
    value: function getStyle() {
      var style = _get(Object.getPrototypeOf(SecondaryText.prototype), 'getStyle', this).call(this);
      delete style.fontSize;

      return style;
    }
  }, {
    key: 'render',
    value: function render() {
      return _get(Object.getPrototypeOf(SecondaryText.prototype), 'render', this).call(this, this.props.children);
    }
  }], [{
    key: 'defaultProps',
    value: _extends({}, _View2['default'].defaultProps, {
      theme: { textMode: 'secondary' }
    }),
    enumerable: true
  }]);

  return SecondaryText;
})(_Text3['default']);

exports['default'] = SecondaryText;
module.exports = exports['default'];