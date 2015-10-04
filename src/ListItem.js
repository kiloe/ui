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

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _utilsCss = require('./utils/css');

var _utilsCss2 = _interopRequireDefault(_utilsCss);

_utilsCss2['default'].register({
  '.listItem .primaryText': {
    fontSize: '16px' },
  // XXX: Need to decide what to do about obeying the spec and working with this app's scale, etc
  '.listItem .secondaryText': {
    fontSize: '14px'
  },
  '.listItem .right.icon': {
    width: '24px'
  },
  '.listItem .left': {
    marginLeft: '1.33rem'
  },
  '.listItem .content': {
    margin: '0 1.33rem'
  },
  '.listItem .right': {
    marginRight: '1.33rem'
  },
  '.listItem .left.iconButton': {
    // XXX: when it's an iconButton, it has padding already. How can we generalise this?
    marginLeft: '0.5rem'
  },
  '.listItem .right.iconButton': {
    marginRight: '0.5rem'
  }
});

// Note: A List Item / Tile should have a maximum of 3 lines of text.
// If more are needed, use a card (according to the Material spec).

var ListItem = (function (_View) {
  _inherits(ListItem, _View);

  _createClass(ListItem, [{
    key: 'getClassNames',
    value: function getClassNames() {
      var cs = _get(Object.getPrototypeOf(ListItem.prototype), 'getClassNames', this).call(this);
      cs.listItem = true;
      return cs;
    }
  }], [{
    key: 'propTypes',
    value: _extends({}, _View3['default'].propTypes, {
      left: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.node, _react2['default'].PropTypes.bool]),
      right: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.node, _react2['default'].PropTypes.bool])
    }),
    enumerable: true
  }, {
    key: 'defaultProps',
    value: _extends({}, _View3['default'].defaultProps, {
      row: true,
      size: 'fill',
      align: 'center',
      scroll: false
    }),
    enumerable: true
  }]);

  function ListItem() {
    _classCallCheck(this, ListItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(ListItem.prototype), 'constructor', this).apply(this, args);
  }

  _createClass(ListItem, [{
    key: 'getStyle',
    value: function getStyle() {
      var style = _get(Object.getPrototypeOf(ListItem.prototype), 'getStyle', this).call(this);

      style.justifyContent = 'space-between';
      style.padding = '8px 0px';
      style.flexGrow = '0'; // List items shouldn't stretch out to fill the vertical space
      // style.flex = '1 0 0';

      return style;
    }
  }, {
    key: 'onClick',
    value: function onClick(e) {
      _get(Object.getPrototypeOf(ListItem.prototype), 'onClick', this).call(this, e);
    }
  }, {
    key: 'render',
    value: function render() {

      // const ICON_SIZE = 1.6;
      // const AVATAR_SIZE = 4;

      var children = [];
      // TODO: handle when left and right are just set to true
      // (e.g. There's no element but there should be a space as if there were.)
      if (this.props.left) {
        var s = {
          // paddingRight: '16px',

        };

        // let size = "intrinsic";
        // if ( this.props.left.type.prototype instanceof Icon ) size = ICON_SIZE;
        // if ( this.props.left.props.avatar ) size = AVATAR_SIZE;

        var left = _react2['default'].cloneElement(this.props.left, {
          //size: size,
          style: s,
          key: 'left',
          className: 'left'
        });
        children.push(left);
      }

      // XXX: Quickfix for Flex
      children.push(_react2['default'].createElement(_View3['default'], { key: 'content', className: 'content', style: { flex: '1 0 0' } }, this.props.children)); //content
      if (this.props.right) {
        // let s = {
        //right style
        //margin: '0 0.5rem',
        // };

        // let size = "intrinsic";
        // if ( this.props.right.type.prototype instanceof Icon ) size = ICON_SIZE;
        // if ( this.props.right.props.avatar ) size = AVATAR_SIZE;

        var right = _react2['default'].cloneElement(this.props.right, {

          key: 'right',
          className: 'right',
          //size: size,
          style: {
            justifyContent: 'flex-start'
          }

        });
        children.push(right);
      }

      return _get(Object.getPrototypeOf(ListItem.prototype), 'render', this).call(this, children);
    }
  }]);

  return ListItem;
})(_View3['default']);

exports['default'] = ListItem;
module.exports = exports['default'];