'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _colors = require('./colors');

// Everything colour-related. It's based on Google's Material Design spec as much as possible.
// It's actually fairly complicated but I've tried to provide lots of functions for everything.

// Note: Function with names including 'ColorObject' return an object with  { palette, hue, alpha }. This is so we can get the text colour too.
// Functions with just 'Color' return a CSS string in _rgba() form.

// The main functions which will be used by Views are:
//    getBackgroundColor( hue, layer, topLayer ) - For use with containers and layers.
//    getTextColor( hue, layer, topLayer, textMode ) - For the current text Color.
//    getCurrentColor( hue, alpha=100 ) - Get the current main colour for a button, icon or something like that.

var ThemeManager = (function () {
  function ThemeManager(cfg) {
    _classCallCheck(this, ThemeManager);

    this.cfg = _extends({
      primaryPalette: 'blue', // The app's primary palette (should be a constant). Options: see colors.js.
      primaryHues: ['100', '500', '700'], // Pick 3 hues for the app to use (based on spec). Array (should be a constant). It doesn't have to be 3 values but the number should be odd so that the middle value is seen as the default hue. Options: see colors.js.
      accentPalette: 'pink', // The app's accent palette (this should be a constant). Options: see colors.js.
      accentHue: 'A200', // Pick 1 main hue for the app. Options: see colors.js.
      mode: 'light', // The current theme mode (usually for containers or the whole app). Options: 'light', 'dark', 'transparent'

      paletteMode: 'grey', // The current palette mode. Options: 'primary', 'accent', 'grey'.
      textMode: 'primary', // The current text mode. Options: 'primary', 'secondary', 'disabled', 'hint'
      hue: '500', // The current hue (weight). Options: see colors.js.
      invert: false }, cfg);
  }

  // Get the current colour
  //
  // Examples:
  // getCurrentColor() - uses the *current* hue in the context cfg
  // getCurrentColor( '300' ) - uses hue of 300 from the palette
  // getCurrentColor( 1 ) - uses the 2nd (zero-index) Primary hue
  // getCurrentColor( 'default' ) - uses the middle Primary hue or the accent hue

  _createClass(ThemeManager, [{
    key: 'getCurrentColor',
    value: function getCurrentColor(hue) {
      var alpha = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];

      var color = this._getCurrentColorObjectByHue(hue, alpha);

      return this.getColorFromPalette(color.palette, color.hue, color.alpha);
    }
  }, {
    key: '_getCurrentColorObjectByHue',
    value: function _getCurrentColorObjectByHue(hue) {
      var alpha = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];

      var palette = 'grey';
      if (this.cfg.paletteMode == 'primary') palette = this.cfg.primaryPalette;else if (this.cfg.paletteMode == 'accent') palette = this.cfg.accentPalette;

      hue = this.getHue(hue);

      return { palette: palette, hue: hue, alpha: alpha };
    }
  }, {
    key: 'getHue',
    value: function getHue(hue) {
      if (typeof hue == 'undefined' || hue === false) hue = this.cfg.hue; //use the context hue

      if (this.cfg.paletteMode == 'primary') {
        if (typeof hue == 'number' && this.cfg.primaryHues[hue]) hue = this.cfg.primaryHues[hue]; //XXX: experimenting with choosing one of the 3 primary hues.
        else if (hue == 'default') hue = this.getPrimaryHue(); //XXX: experimenting with 'default'. Gets the middle of the primary hues.
      } else if (this.cfg.paletteMode == 'accent') {
          // Note: This *should* check that the hue is an accent hue (e.g. it starts with 'A')
          // But it's possible we might want to use one of the other hues. Let's keep it flexible.
          if (hue == 'default') hue = this.cfg.accentHue; //XXX: experimenting with 'default'.
        } else {
            if (hue == 'default') hue = 500; //XXX: experimenting with 'default'.
          }

      return hue;
    }
  }, {
    key: 'getPrimaryHue',
    value: function getPrimaryHue() {
      return this.cfg.primaryHues[Math.floor(this.cfg.primaryHues.length / 2)];
    }

    // Based on the current paletteMode, return the current palette name
  }, {
    key: 'getCurrentPaletteName',
    value: function getCurrentPaletteName() {
      if (this.cfg.paletteMode == 'primary') return this.cfg.primaryPalette;else if (this.cfg.paletteMode == 'accent') return this.cfg.accentPalette;else return 'grey';
    }

    // Use the current palette and hue to get the background colour
    // If the hue parameter is specified then override the current hue
    // If the layer and topLayer are specified then override the hue with a calculated value based on the layer. See _getHueByLayer()
  }, {
    key: 'getBackgroundColor',
    value: function getBackgroundColor(hue, layer, topLayer) {
      var hueOffset = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

      if (this.cfg.mode == 'transparent') return this.getTransparent(); //XXX: Still not sure about the 'transparent' mode

      var color = this._getBackgroundColorObjectWithSwitch(hue, layer, topLayer);

      return this.getColorFromPalette(color.palette, color.hue, color.alpha, hueOffset);
    }
  }, {
    key: '_getBackgroundColorObjectWithSwitch',
    value: function _getBackgroundColorObjectWithSwitch(hue, layer, topLayer) {
      //includes invert switch
      if (!this.cfg.invert) return this._getBackgroundColorObject(hue, layer, topLayer);else return this._getTextColorObject(hue, layer, topLayer); //switch it
    }
  }, {
    key: '_getBackgroundColorObject',
    value: function _getBackgroundColorObject(hue, layer, topLayer) {

      // If the layers are specified then override the hue specified
      if (typeof layer == 'number' && typeof topLayer == 'number') hue = this._getHueByLayer(this.getCurrentPaletteName(), layer, topLayer);

      return this._getCurrentColorObjectByHue(hue);
    }

    // Find out if the background colour is dark or light. Base text colour will be white and black respectively.
    // Then set the text's alpha based on the textMode
  }, {
    key: 'getTextColor',
    value: function getTextColor(hue, layer, topLayer, textMode) {
      var color = this._getTextColorObjectWithSwitch(hue, layer, topLayer, textMode);

      return this.getColorFromPalette(color.palette, color.hue, color.alpha);
    }
  }, {
    key: '_getTextColorObjectWithSwitch',
    value: function _getTextColorObjectWithSwitch(hue, layer, topLayer, textMode) {
      //includes invert switch
      if (!this.cfg.invert) return this._getTextColorObject(hue, layer, topLayer, textMode);else return this._getBackgroundColorObject(hue, layer, topLayer); //switch it
    }
  }, {
    key: '_getTextColorObject',
    value: function _getTextColorObject(hue, layer, topLayer, textMode) {

      if (typeof textMode == 'undefined') textMode = this.cfg.textMode; //get the current textMode from the context

      var background = this._getBackgroundColorObject(hue, layer, topLayer);
      var textHue = '0';
      var alpha = 1;

      if (this.isHueLight(background.palette, background.hue)) {
        //light background, dark text

        if (textMode == 'primary') alpha = 0.85;else if (textMode == 'secondary') alpha = 0.54;else alpha = 0.26; //XXX: Maybe 0.38 - the spec says both multiple times, contradicting itself

        textHue = '1000'; //black
      } else {
          //dark background, light text

          // The spec actually says 100%, 70% and 30%. But I've changed it to 85% and 60% because 100% is weird
          if (textMode == 'primary') alpha = 0.85;else if (textMode == 'secondary') alpha = 0.60;else alpha = 0.30;

          textHue = '0'; //white
        }

      return { palette: 'grey', hue: textHue, alpha: alpha };
    }
  }, {
    key: '_getHueByLayer',
    value: function _getHueByLayer(paletteName, layer, topLayer) {
      var hues = _Object$keys(_colors.COLORS[paletteName]);
      if (this.cfg.paletteMode == 'accent') hues = hues.filter(function (s) {
        return isNaN(s);
      }); //use only the accent hues
      else hues = hues.filter(function (s) {
          return !isNaN(s);
        }); //remove the accent hues

      if (this.cfg.paletteMode == 'primary') {
        var hue = this.cfg.hue || this.getPrimaryHue();
        hues = this._getArrayItemsAfter(hues, hue, true); //Restrict the range
      }
      if (this.cfg.paletteMode == 'accent') {
        var hue = this.cfg.hue || this.cfg.accentHue;
        hues = this._getArrayItemsAfter(hues, hue, true); //Restrict the range
      }

      if (this.cfg.mode == 'light') {

        // Example: in the 'grey' palette, layer 1 of 4 would be hues[3] (200)
        // Example: in the 'grey' palette, layer 4 of 4 would be hues[0] (0)
        return hues[Math.min(hues.length - 1, topLayer - layer)];
      } else if (this.cfg.mode == 'dark') {

        // Example: in the 'grey' palette, layer 1 of 4 would be hues[11] (1000)
        // Example: in the 'grey' palette, layer 4 of 4 would be hues[9] (700)
        return hues[Math.max(0, hues.length - (layer + 1))];
      }
    }
  }, {
    key: '_offsetHue',
    value: function _offsetHue(paletteName, hue, offset) {
      if (offset == 0) return hue;

      var hues = _Object$keys(_colors.COLORS[paletteName]);
      if (!isNaN(hue)) hues = hues.filter(function (s) {
        return !isNaN(s);
      }); //use only the primary hues
      else hues = hues.filter(function (s) {
          return isNaN(s);
        }); //use only the accent hues

      var pos = hues.indexOf(hue);

      if (pos < 0) return hue; // This is an error but just return the hue untouched

      var newPos = Math.max(0, Math.min(pos + offset, hues.length - 1));

      // XXX: If the hue is at the start or end of the range, then the offset can't go off the end, so it just uses the end value
      // But maybe instead it should go the other way (getting lighter instead of darker or vice-versa)?

      return hues[newPos] || hue;
    }
  }, {
    key: 'getColorFromPalette',
    value: function getColorFromPalette(paletteName) {
      var hue = arguments.length <= 1 || arguments[1] === undefined ? 500 : arguments[1];
      var alpha = arguments.length <= 2 || arguments[2] === undefined ? 100 : arguments[2];
      var hueOffset = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

      hue = this._offsetHue(paletteName, hue, hueOffset);

      var palette = _colors.COLORS[paletteName];
      if (!palette) {
        throw new Error('invalid palette name: ' + paletteName);
      }
      var color = palette[hue];
      if (!color) {
        throw new Error('invalid hue for palette ' + paletteName + ': ' + hue);
      }

      return this._rgba(color, alpha);
    }
  }, {
    key: '_getHexFromColorObject',
    value: function _getHexFromColorObject(color) {
      var rgb = _colors.COLORS[color.palette][color.hue];

      return this._toHex(rgb[0]) + this._toHex(rgb[1]) + this._toHex(rgb[2]);
    }
  }, {
    key: 'getBackgroundHex',
    value: function getBackgroundHex() {
      var color = this._getBackgroundColorObjectWithSwitch();
      return this._getHexFromColorObject();
    }
  }, {
    key: 'getHexFromPaletteHue',
    value: function getHexFromPaletteHue(paletteName, hue) {
      // For the palette tables example
      var rgb = _colors.COLORS[paletteName][hue];
      return this._toHex(rgb[0]) + this._toHex(rgb[1]) + this._toHex(rgb[2]);
    }
  }, {
    key: 'getAllPalettes',
    value: function getAllPalettes() {
      return _colors.COLORS;
    }
  }, {
    key: 'getAllPaletteNames',
    value: function getAllPaletteNames() {
      return _Object$keys(_colors.COLORS);
    }
  }, {
    key: 'isHueLight',
    value: function isHueLight(paletteName, hue) {
      return _colors.LIGHT_HUES[paletteName].indexOf(hue) > -1;
    }
  }, {
    key: 'isHueDark',
    value: function isHueDark(paletteName, hue) {
      return !this.isHueLight(paletteName, hue);
    }
  }, {
    key: 'getMode',
    value: function getMode() {
      return this.cfg.mode;
    }
  }, {
    key: 'getPaletteMode',
    value: function getPaletteMode() {
      return this.cfg.paletteMode;
    }
  }, {
    key: 'isInverted',
    value: function isInverted() {
      return this.cfg.invert;
    }

    //Helpers

  }, {
    key: 'getWhite',
    value: function getWhite() {
      var alpha = arguments.length <= 0 || arguments[0] === undefined ? 100 : arguments[0];

      return this._rgba([255, 255, 255], alpha);
    }
  }, {
    key: 'getBlack',
    value: function getBlack() {
      var alpha = arguments.length <= 0 || arguments[0] === undefined ? 100 : arguments[0];

      return this._rgba([0, 0, 0], alpha);
    }
  }, {
    key: 'getTransparent',
    value: function getTransparent() {
      return this._rgba([0, 0, 0], 0);
    }
  }, {
    key: '_toHex',
    value: function _toHex(n) {
      n = parseInt(n, 10);
      if (isNaN(n)) return "00";
      n = Math.max(0, Math.min(n, 255));
      return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
    }
  }, {
    key: '_rgba',
    value: function _rgba(v, alpha) {
      if (typeof alpha == 'number') {
        v = [].concat(_toConsumableArray(v));
        v[3] = alpha;
      }
      var rgb = v.length > 3 ? 'rgba' : 'rgb';
      return rgb + '(' + v.join(',') + ')';
    }

    // Given an array and a value, return
  }, {
    key: '_getArrayItemsAfter',
    value: function _getArrayItemsAfter(arr, value) {
      var inc = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

      var pos = arr.indexOf(value);
      if (pos < 0) return arr; //if value not found then just return the whole array
      return arr.slice(pos + (inc ? 0 : 1));
    }
  }]);

  return ThemeManager;
})();

exports.ThemeManager = ThemeManager;
var defaultTheme = {
  primaryPalette: 'blue',
  primaryHues: ['100', '500', '700'],
  accentPalette: 'pink',
  accentHue: 'A200',
  mode: 'light'
};

exports.defaultTheme = defaultTheme;
exports['default'] = defaultTheme;
// The current invert flag. Switches the element colour and text colour. Boolean.