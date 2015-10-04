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
  '.text span': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical'
  },
  '.text.rowOf1 span': {
    WebkitLineClamp: 1
  },
  '.text.rowOf2 span': {
    WebkitLineClamp: 2
  },
  '.text.rowOf3 span': {
    WebkitLineClamp: 3
  },
  '.text.rowOf4 span': {
    WebkitLineClamp: 4
  },
  '.text.rowOf5 span': {
    WebkitLineClamp: 5
  }
});

var Text = (function (_View) {
  _inherits(Text, _View);

  function Text() {
    _classCallCheck(this, Text);

    _get(Object.getPrototypeOf(Text.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Text, [{
    key: 'getClassNames',
    // 0 means no limit
    value: function getClassNames() {
      var cs = _get(Object.getPrototypeOf(Text.prototype), 'getClassNames', this).call(this);
      cs.text = true;
      if (this.props.lines > 0) cs['rowOf' + this.props.lines] = true;
      return cs;
    }
  }, {
    key: 'getStyle',
    value: function getStyle() {
      var style = _get(Object.getPrototypeOf(Text.prototype), 'getStyle', this).call(this);

      // style.flexBasis = '0'; // XXX: to fix width of text
      /*
      if ( this.props.lines > 0 ) {
        style.textOverflow = 'ellipsis';
        style.overflow = 'hidden';
        style.display = '-webkit-box';
        style.WebkitLineClamp = this.props.lines;
        style.WebkitBoxOrient = 'vertical';
       }*/

      return style;
    }
  }, {
    key: 'render',
    value: function render() {

      return _get(Object.getPrototypeOf(Text.prototype), 'render', this).call(this, this.props.children);
    }
  }], [{
    key: 'propTypes',
    value: _extends({}, _View3['default'].propTypes, {
      lines: _react2['default'].PropTypes.number
    }),
    enumerable: true
  }, {
    key: 'defaultProps',
    value: _extends({}, _View3['default'].defaultProps, {
      lines: 0 }),
    enumerable: true
  }]);

  return Text;
})(_View3['default']);

exports['default'] = Text;
module.exports = exports['default'];