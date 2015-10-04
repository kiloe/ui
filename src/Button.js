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
  '.button': {
    border: 'none',
    borderRadius: 2,
    textTransform: 'uppercase',
    letterSpacing: '0',
    willChange: 'box-shadow, transform',
    WebkitTransition: 'box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1)',
    transition: 'box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1)',
    outline: 'none',
    textAlign: 'center'
  },
  '.button .icon, .button span': {
    zIndex: '1'
  },
  '.button .button-hover, .button .button-focus, .button .button-press': {
    // visibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: 'opacity 0.2s ease-in-out',
    opacity: '0'
  },
  '.button:hover .button-hover': {
    // visibility: 'visible',
    opacity: '1'
  },
  '.button:focus:not(:active) .button-focus': {
    // visibility: 'visible',
    opacity: '1'
  },
  '.button:active .button-press': {
    // visibility: 'visible',
    opacity: '1'
  },
  '.button.circular, .button.circular .button-hover, .button.circular .button-focus, .button.circular .button-press': {
    borderRadius: '50%',
    justifyContent: 'center'
  },
  '.button:not(.circular)': {
    // minWidth: '5.3rem', // 88dp minimum for normal flat/raised buttons
  },
  '.dialog .button.flat:not(.circular)': {
    // minWidth: '3.4rem', // 64dp minimum for flat buttons inside dialogs
  },
  '.button.transparent:hover .button-hover': {
    opacity: '0.1'
  },
  '.button.transparent:active .button-press': {
    opacity: '0.3'
  },
  '.button.transparent:focus .button-press': {
    opacity: '0.2'
  }
});

var Button = (function (_View) {
  _inherits(Button, _View);

  _createClass(Button, [{
    key: 'getRaise',
    value: function getRaise() {
      if (this.props.transparent) {
        return 0; // can't raise transparent things
      }
      return _get(Object.getPrototypeOf(Button.prototype), 'getRaise', this).call(this);
    }
  }, {
    key: 'getClassNames',
    value: function getClassNames() {
      var cs = _get(Object.getPrototypeOf(Button.prototype), 'getClassNames', this).call(this);
      cs.button = true;
      if (this.getRaise() > 0) {
        cs.raised = true;
      }
      // buttons without labels are round...
      // but since 'fill' would cause weird aspect ratios
      // 'fill' buttons are always square
      if (!this.props.label && this.props.size != 'fill') {
        cs.circular = true;
      }
      // a 'transparent' button is one where the background
      // color only shows for effects
      if (this.props.transparent) {
        cs.transparent = true;
      }
      return cs;
    }
  }], [{
    key: 'propTypes',
    value: _extends({}, _View3['default'].propTypes, {
      // Popup menu to active with button //XXX: probably shouldn't live here
      menu: _react2['default'].PropTypes.element,
      // icon to show on button, can be either an icon element or icon class
      icon: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.element, _react2['default'].PropTypes.func]),
      // transparent buttons only have background for the click effects
      transparent: _react2['default'].PropTypes.bool
    }),
    enumerable: true
  }, {
    key: 'defaultProps',
    value: _extends({}, _View3['default'].defaultProps, {
      row: true,
      align: 'center',
      size: 'intrinsic',
      layer: 0
    }),
    enumerable: true
  }]);

  function Button() {
    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(Button.prototype), 'constructor', this).apply(this, args);
    this.state = { active: false };
  }

  _createClass(Button, [{
    key: 'getSize',
    value: function getSize() {
      // The 'intrinsic' size of an icon-button is to maintain the aspect ratio
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
      return _get(Object.getPrototypeOf(Button.prototype), 'getSize', this).call(this);
    }
  }, {
    key: 'getLayer',
    value: function getLayer() {
      if (this.props.raised) return 0; //reset layer if raised
      else return _get(Object.getPrototypeOf(Button.prototype), 'getLayer', this).call(this);
    }
  }, {
    key: 'getStyle',
    value: function getStyle() {
      var style = _get(Object.getPrototypeOf(Button.prototype), 'getStyle', this).call(this);
      if (this.props.align == 'right') {
        style.flexDirection = 'row-reverse'; //Reverse the order (e.g. label then icon)
      }
      if (this.props.label) {
        style.padding = this.isColumn() ? '0.75rem 1rem' : '0.5rem 0.5rem';
      } else {
        style.padding = this.isColumn() ? '0.5rem' : '0.25rem';
        style.justifyContent = 'center';
      }
      return style;
    }
  }, {
    key: 'getBackgroundColor',
    value: function getBackgroundColor(hueOffset) {
      if (this.props.transparent) {
        return this.getTheme().getTransparent();
      }
      if (typeof hueOffset == 'undefined' && this.getRaise() > 0 && this.props.disabled) {
        hueOffset = this.getThemeMode() == 'light' ? 1 : -1;
      }
      return _get(Object.getPrototypeOf(Button.prototype), 'getBackgroundColor', this).call(this, hueOffset);
    }
  }, {
    key: 'onClick',
    value: function onClick(e) {
      if (this.props.menu) {
        e.stopPropagation();
        var pos = this.refs.view.getBoundingClientRect();
        var menu = _react2['default'].cloneElement(this.props.menu, {
          style: {
            left: pos.left,
            top: pos.top
          }
        });
        this.setModal(menu);
      } else {
        _get(Object.getPrototypeOf(Button.prototype), 'onClick', this).call(this, e);
      }
    }
  }, {
    key: 'isClickable',
    value: function isClickable() {
      if (this.props.menu && !this.props.disabled) {
        return true;
      }
      return _get(Object.getPrototypeOf(Button.prototype), 'isClickable', this).call(this);
    }

    // getIcon returns the icon as an element or undefined if no icon prop
  }, {
    key: 'getIcon',
    value: function getIcon() {
      if (!this.props.icon) {
        return;
      }
      var props = {
        key: 'icon',
        style: {
          padding: this.props.align == 'left' ? '0 0.5rem 0 0' : this.props.align == 'right' ? '0 0 0 0.5rem' : this.props.label ? '0 0.5rem 0 0' : 0
        },
        size: 'intrinsic'
      };
      if (this.props.icon instanceof Function) {
        var Icon = this.props.icon;
        return _react2['default'].createElement(Icon, props);
      }
      return _react2['default'].cloneElement(this.props.icon, props);
    }
  }, {
    key: 'isInverted',
    value: function isInverted() {
      // primary/accent colors only work inverted when transparent
      if (this.props.transparent && (this.props.primary || this.props.accent)) {
        return true;
      }
      return _get(Object.getPrototypeOf(Button.prototype), 'isInverted', this).call(this);
    }
  }, {
    key: 'render',
    value: function render(c) {

      if (c) return _get(Object.getPrototypeOf(Button.prototype), 'render', this).call(this, c); //er...how should I actually do this?

      var children = [];
      if (this.props.icon) {
        children.push(this.getIcon());
      }
      if (this.props.label) {
        var s = {
          cursor: this.isClickable() ? 'pointer' : 'default',
          backgroundColor: 'transparent',
          alignItems: this.props.align == 'left' ? 'flex-start' : this.props.align == 'right' ? 'flex-end' : 'stretch'
        };
        children.push(_react2['default'].createElement(_View3['default'], { key: 'label', style: s }, this.props.label));
      }

      // :hover. :focus and :active are all handled with hidden backgrounds. I totally came up with this idea on my own and didn't have to ask anyone.
      if (!this.props.disabled) {
        // No other states if it's disabled, yo!
        var hover = {
          backgroundColor: this.props.transparent ? 'transparent' : this.getBackgroundColor(this.getThemeMode() == 'light' ? 1 : -1)
        };
        var press = {
          backgroundColor: this.props.transparent ? this.getTextColor() : this.getBackgroundColor(this.getThemeMode() == 'light' ? 2 : -2)
        };
        children.push(_react2['default'].createElement('div', { key: 'button-backgrounds' }, _react2['default'].createElement('div', { className: 'button-hover', style: hover }), _react2['default'].createElement('div', { className: 'button-focus button-press', style: press })));
      }
      return _get(Object.getPrototypeOf(Button.prototype), 'render', this).call(this, children);
    }
  }]);

  return Button;
})(_View3['default']);

exports['default'] = Button;
module.exports = exports['default'];