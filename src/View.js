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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsThemeManager = require('./utils/themeManager');

var _utilsCss = require('./utils/css');

var _utilsCss2 = _interopRequireDefault(_utilsCss);

var SIZES = ['fill', 'intrinsic'];
var THEME_MODES = ['light', 'dark'];
var PALETTE_MODES = ['primary', 'accent', 'grey'];

_utilsCss2['default'].register({
  '.view': {
    boxSizing: 'content-box',
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    alignContent: 'stretch',
    borderRadius: 1,
    // overflow: 'hidden',
    transition: {
      left: _utilsCss2['default'].transitions.swift,
      right: _utilsCss2['default'].transitions.swift,
      top: _utilsCss2['default'].transitions.swift,
      bottom: _utilsCss2['default'].transitions.swift,
      width: _utilsCss2['default'].transitions.swift,
      height: _utilsCss2['default'].transitions.swift,
      flexGrow: _utilsCss2['default'].transitions.swift,
      flexShrink: _utilsCss2['default'].transitions.swift,
      flexBasis: _utilsCss2['default'].transitions.swift,
      flex: _utilsCss2['default'].transitions.swift
    },
    // zIndex: 1,
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    UserSelect: 'none'
  },
  '.view.scroll': {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch'
  },
  '.view .view:nth-child(1)': {
    // zIndex:10
  },
  '.view.vsplit': {
    flexDirection: 'row'
  },
  '.view.z1': {
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    zIndex: 1
  },
  '.view.z2': {
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    zIndex: 2
  },
  '.view.z3': {
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    zIndex: 3
  },
  '.view.z4': {
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    zIndex: 4
  },
  '.view.z5': {
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
    zIndex: 5
  }
});

// View is a flex-box building block.

var View = (function (_React$Component) {
  _inherits(View, _React$Component);

  _createClass(View, null, [{
    key: 'propTypes',
    value: {
      // when row=false child Views will stack in rows (like a side nav)
      // when row=true child Views will flow horizonatally (like a toolbar)
      row: _react2['default'].PropTypes.bool,
      // Set to a non-zero value to raise the view off the page in the z-axis
      // by adding a shadow effect.
      // raised=true is the same as raised=1
      raised: _react2['default'].PropTypes.oneOf([0, 1, 2, 3, 4, 5, true]),
      // Attach an onClick handler to the view
      onClick: _react2['default'].PropTypes.func,
      // Assign a theme config for this View (and all decents). If not specifed and
      // no theme config is set from a accentdant the global default theme is used.
      theme: _react2['default'].PropTypes.shape({
        // set the named primary palette ('red', 'blue', etc). Should be constant.
        primaryPalette: _react2['default'].PropTypes.string,
        // Pick 3 hues (e.g. ['100','500','700']) for the app to use. This should be a constant.
        // It doesn't have to be 3 values but the number should be odd so that the middle value is seen as the default hue.
        primaryHues: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
        // set the named accent palette ('red', 'blue', etc). Should be constant.
        accentPalette: _react2['default'].PropTypes.string,
        // Pick 1 main hue for the app (e.g. '500').
        accentHue: _react2['default'].PropTypes.string,
        // The theme mode. 'light' or 'dark'
        mode: _react2['default'].PropTypes.oneOf(THEME_MODES),
        // Whether it should be using primaryPalette, accentPalette or the 'grey' palette
        paletteMode: _react2['default'].PropTypes.oneOf(PALETTE_MODES),
        // This decides the opacity of the text. Note: 'disabled' and 'hint' result in the same opacity but I split them because they're for different uses.
        textMode: _react2['default'].PropTypes.oneOf(['primary', 'secondary', 'disabled', 'hint']),
        // The current hue (weight). e.g. '100', '500'. Or 'A300' if paletteMode is 'accent'
        hue: _react2['default'].PropTypes.string,
        // switch foreground/background colors
        invert: _react2['default'].PropTypes.bool

      }),
      // Shortcut props for setting palette theme + hue
      // Note: do not use this for controlling logic, instead fetch the palette via getTheme()
      light: _react2['default'].PropTypes.bool,
      dark: _react2['default'].PropTypes.bool,
      transparent: _react2['default'].PropTypes.bool,
      primary: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.bool]),
      accent: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.bool]),
      grey: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.bool]),
      // Shortcut for setting pallete invert
      invert: _react2['default'].PropTypes.bool,
      // The current layer of material/paper
      layer: _react2['default'].PropTypes.number,
      // The top-most layer of material/paper
      // XXX: Will be (hopefully) set automatically later
      topLayer: _react2['default'].PropTypes.number,
      // Size gives the View a either a fixed width in rem (if row) or fixed height rem (if column).
      // OR size=fill which means take up all the space (default).
      // OR special value 'intrinsic' can be used to say only take up what you need.
      size: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.oneOf(SIZES)]),
      // Set to true to hide the component. If a size is set, then this
      // will toggle between size -> zero
      hide: _react2['default'].PropTypes.bool,
      // Set to enable scrolling within the view
      // Note: any child Views MUST have their size prop set for this to work.
      scroll: _react2['default'].PropTypes.bool,
      // Disable the component
      disabled: _react2['default'].PropTypes.bool,
      // Align the item left/right/center
      align: _react2['default'].PropTypes.oneOf(['left', 'right', 'center']),
      // Scale is a mulitpler that affects certain key elements/properties.
      // In most scenarios it can be thought of as a font-sizing method
      scale: _react2['default'].PropTypes.number,
      //The View is a divider (with bottom border)
      divider: _react2['default'].PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'contextTypes',
    value: {
      parent: _react2['default'].PropTypes.object
    },
    enumerable: true
  }, {
    key: 'childContextTypes',
    value: {
      parent: _react2['default'].PropTypes.object
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      row: false,
      raised: 0,
      scroll: false,
      disabled: false,
      size: 'fill',
      align: 'center',
      divider: false
    },
    enumerable: true
  }]);

  function View() {
    _classCallCheck(this, View);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(View.prototype), 'constructor', this).apply(this, args);
    this.state = {};
  }

  // getChildContext returns the context for children

  _createClass(View, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        parent: this
      };
    }

    // getParent fetches parent View
  }, {
    key: 'getParent',
    value: function getParent() {
      if (!this.context) {
        return undefined;
      }
      return this.context.parent;
    }

    // The first View to be rendered becomes the "root".
    // All descentant Views can tell the root to alter it's state.
    // This is how modals work... a child View can setState({modal: component})
    // and that gets rended as a child of the root view.
  }, {
    key: 'getRoot',
    value: function getRoot() {
      var parent = this.getParent();
      return !parent ? this : parent;
    }

    // isRow returns true if the parent view that this view resides in
    // has been set to show it's children as columns.
  }, {
    key: 'isColumn',
    value: function isColumn() {
      return this.getParent().props.row;
    }

    // getClassNames builds and returns all CSS classes
    // that will be given to the View.
    // Classes that extend from View can override/extend this to
    // add their own classes.
  }, {
    key: 'getClassNames',
    value: function getClassNames() {
      var cs = {
        view: true
      };
      if (this.props.className) {
        cs[this.props.className] = true;
      }
      cs.vsplit = this.props.row;
      // only non-transparent views can be raised
      var mode = this.getThemeMode();
      if (mode != 'transparent' && !this.props.disabled) {
        // Material items can't be raised if they're disabled. It's science.
        var z = this.getRaise();
        if (z) {
          cs['z' + z] = true;
        }
      }
      return cs;
    }

    // getThemeMode returns the current theme mode.
  }, {
    key: 'getThemeMode',
    value: function getThemeMode() {
      return this.getTheme().getMode();
    }
  }, {
    key: 'isIntrinsic',
    value: function isIntrinsic() {
      return this.props.size == 'intrinsic';
    }

    // getSize returns the element fixed-size if available or undefined if not.
  }, {
    key: 'getSize',
    value: function getSize() {
      var size = this.props.size;
      if (typeof size != 'number') {
        return undefined;
      }
      return size;
    }

    // Return an interger between 0 and 5 that represents how far
    // off the page the element is raised. 0=flat 5=most-raised
  }, {
    key: 'getRaise',
    value: function getRaise() {
      if (!this.props.raised) {
        return 0;
      }
      if (this.props.raised === true) {
        return 1;
      }
      return this.props.raised;
    }
  }, {
    key: 'isInverted',
    value: function isInverted() {
      return this.props.invert;
    }
  }, {
    key: 'getTextColor',
    value: function getTextColor() {
      var theme = this.getTheme();
      return theme.getTextColor(false, this.getLayer(), this.getTopLayer());
    }

    // getBackgroundColor returns the current foreground color
    // for the active palette. ie. if theme=light, this returns the
    // light background color.
  }, {
    key: 'getBackgroundColor',
    value: function getBackgroundColor() {
      var hueOffset = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      var theme = this.getTheme();
      return theme.getBackgroundColor(false, this.getLayer(), this.getTopLayer(), hueOffset);
    }

    // getStyle builds all the inline CSS styles that will be applied
    // to the View element.
    // Classes extending from View can override/extend this method
    // to add their own CSS properties.
  }, {
    key: 'getStyle',
    value: function getStyle() {
      var style = this.props.style || {};
      style = _extends({}, style); // React doesn't want us update old style
      var size = this.getSize();

      if (typeof size == 'number') {
        if (this.props.hide) {
          size = 0;
        }
        style.flex = '0 0 ' + size + 'rem';
        style[this.isColumn() ? 'width' : 'height'] = size + 'rem';
        style[this.isColumn() ? 'height' : 'width'] = 'auto';
      } else if (this.isIntrinsic()) {
        style[this.isColumn() ? 'width' : 'height'] = '-webkit-max-content';
        style.flex = '0 0 auto';
      }

      if (!style.backgroundColor) {
        style.backgroundColor = this.getBackgroundColor();
      }
      style.color = this.getTextColor();
      if (this.isClickable()) {
        style.cursor = 'pointer';
      }
      if (this.props.scroll) {
        style.position = 'relative';
      } else if (!style.justifyContent) {
        style.justifyContent = this.props.align == 'left' ? 'flex-start' : this.props.align == 'right' ? 'flex-end' : 'center';
      }
      if (!style.fontSize) {
        style.fontSize = this.getScale() + 'rem';
      }
      if (this.props.divider) {
        style.borderBottom = '1px solid ' + (this.getTheme().getMode() == 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)');
      }
      return style;
    }

    // isClickable returns true/false to decide if the item should
    // appear as clickable. Some styles use this method to decide
    // wether or not to show :hover or other indictators that the
    // component is clickable. Override in subclass to disable.
  }, {
    key: 'isClickable',
    value: function isClickable() {
      return !this.props.disabled && this.props.onClick;
    }

    // getThemeConfig fetches the active palette configuration.
    // It merges the palette configs from props/parent/global.
  }, {
    key: 'getThemeConfig',
    value: function getThemeConfig() {
      var _this = this;

      var parent = this.getParent();
      var inheritedTheme = parent ? parent.getThemeConfig() : _utilsThemeManager.defaultTheme;
      var shortcutPaletteMode = PALETTE_MODES.filter(function (name) {
        return !!_this.props[name];
      })[0];
      var shortcutTheme = {};
      if (shortcutPaletteMode) {
        shortcutTheme.paletteMode = shortcutPaletteMode;
        if (typeof this.props[shortcutPaletteMode] == 'string') {
          shortcutTheme.hue = this.props[shortcutPaletteMode];
        }
      }
      var shortcutMode = THEME_MODES.filter(function (name) {
        return !!_this.props[name];
      })[0];
      if (shortcutMode) {
        shortcutTheme.mode = shortcutMode;
      }
      if (this.isInverted()) {
        shortcutTheme.invert = true;
      }
      if (this.props.disabled) {
        if (this.props.invert && (this.props.primary || this.props.accent)) {
          shortcutTheme.invert = false;
        }
        shortcutTheme.textMode = 'disabled';
        shortcutTheme.paletteMode = 'grey'; //Can't have primary or accent if disabled.
      }
      var propsTheme = {};
      if (this.props.theme) {
        propsTheme = this.props.theme;
      }
      return _extends({}, inheritedTheme, shortcutTheme, propsTheme);
    }

    // getTheme returns the merged palette.
  }, {
    key: 'getTheme',
    value: function getTheme() {
      return new _utilsThemeManager.ThemeManager(this.getThemeConfig());
    }

    // getLayer returns the current (or inherited) layer number
  }, {
    key: 'getLayer',
    value: function getLayer() {
      var layer = this.props.layer;
      if (typeof layer != 'number') {
        var _parent = this.getParent();
        layer = _parent ? _parent.getLayer() : 0;
        if (this.props.raised) {
          layer += 1; //XXX: Should either be raise (0-5) or just (0-1)
        }
      }
      if (typeof layer != 'number') {
        layer = 0;
      }
      return layer;
    }

    // getTopLayer returns the top layer number (top be automatically calculated
  }, {
    key: 'getTopLayer',
    value: function getTopLayer() {
      var topLayer = this.props.topLayer;
      if (typeof topLayer != 'number') {
        var _parent2 = this.getParent();
        topLayer = _parent2 ? _parent2.getTopLayer() : 0;
      }
      if (typeof topLayer != 'number') {
        topLayer = 0;
      }
      topLayer = 1; //XXX: Just for now
      return topLayer;
    }

    // getScale returns the current (or inherited) scale factor
  }, {
    key: 'getScale',
    value: function getScale() {
      var scale = this.props.scale;
      if (typeof scale != 'number') {
        var _parent3 = this.getParent();
        scale = _parent3 ? _parent3.getScale() : 1;
      }
      if (typeof scale != 'number') {
        return 1;
      }
      return scale;
    }

    // onClickOutside is the event fired when someone clicks outside of
    // an active modal. This method is only accessed on the root.
  }, {
    key: 'onClickOutside',
    value: function onClickOutside() {
      this.setState({ modal: null });
    }

    // onClick is called when a click event on the View DOM node
    // is triggered.
  }, {
    key: 'onClick',
    value: function onClick(e) {
      if (this.getRoot() == this) {
        this.onClickOutside(e);
      }
      if (this.isClickable() && this.props.onClick) {
        this.props.onClick(e);
      }
    }

    // Calling this method with a react element will
    // cause the element to be rendered as a child of the root.
    // This allows for a single modal element to be rendered for things
    // like popup menus and modal dialogs.
    // Call with null to remove the modal.
  }, {
    key: 'setModal',
    value: function setModal(view) {
      this.getRoot().setState({ modal: view });
    }

    // render does what it says on the tin.
    // subclasses can call super.render(children) if they
    // need to extend render.
  }, {
    key: 'render',
    value: function render(children) {
      children = children || this.props.children;
      // wrap in a scrolly thing if scrolling
      if (this.props.scroll) {
        children = _react2['default'].createElement(View, {
          className: 'scroll',
          style: { justifyContent: 'stretch' },
          row: this.props.row }, children);
      }
      // if we are the root then we might need to
      // render an additional child for the modal.
      var modal = undefined;
      if (this == this.getRoot() && this.state.modal) {
        modal = this.state.modal;
      }
      // render
      return _react2['default'].createElement('div', { ref: 'view',
        'data-layer': this.getLayer(),
        'data-layer-prop': this.props.layer,
        onClick: this.isClickable() || this.getRoot() == this ? this.onClick.bind(this) : undefined,
        onClickCapture: this.props.onClickCapture,
        style: this.getStyle(),
        className: (0, _classnames2['default'])(this.getClassNames()),
        disabled: this.props.disabled }, children, modal);
    }
  }]);

  return View;
})(_react2['default'].Component);

exports['default'] = View;
module.exports = exports['default'];