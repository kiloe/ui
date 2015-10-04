
// Viewport is an interface to query info about the viewport/device.
// It uses media queries to define breakpoints on the viewport width/height
// and emit a 'change' event when the breakpoint state has changed.
//
// When running in a browser or environment without matchMedia support
// it will always return as "medium".
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var Viewport = (function () {
  _createClass(Viewport, null, [{
    key: 'breakpoints',
    value: {
      width: {
        small: 320,
        medium: 700,
        large: 1024,
        huge: 1400
      },
      height: {
        small: 320,
        medium: 700,
        large: 1024,
        huge: 1400
      }
    },
    enumerable: true
  }]);

  function Viewport() {
    var _this = this;

    _classCallCheck(this, Viewport);

    this.unsupported = typeof window == 'undefined' || !window.matchMedia;
    ['width', 'height'].forEach(function (name) {
      _this[name] = _Object$keys(Viewport.breakpoints[name]).reduce(function (o, k) {
        if (_this.unsupported) {
          o[k] = false;
          return o;
        }
        var w = Viewport.breakpoints[name][k];
        var m = window.matchMedia('(min-' + name + ': ' + w + 'px)');
        o[k] = m.matches;
        m.addListener(function (m) {
          var update = _this[name][k] != m.matches;
          _this[name][k] = m.matches;
          if (update) {
            _this.emit('change', m);
          }
        });
        return o;
      }, {});
    });
    // If cannot use queries... start as medium (useful for testing).
    if (this.unsupported) {
      this.width.medium = true;
      this.height.medium = true;
    }
  }

  // Intensionally simplistic "emit" event management.

  _createClass(Viewport, [{
    key: 'emit',
    value: function emit(name, e) {
      if (!this.fn) {
        return;
      }
      this.fn(e);
    }

    // Intensionally simplistic "on" event management.
    // keeping it simple removes the need to remove the handlers.
  }, {
    key: 'on',
    value: function on(name, fn) {
      this.fn = fn;
      return this;
    }

    // Are we running in a browser?
  }, {
    key: 'isBrowser',
    value: function isBrowser() {
      return typeof window != 'undefined' && typeof document != 'undefined';
    }

    // Attempt to make the viewport fullscreen
    // noop when not a browser.
    // Poached from: http://www.html5rocks.com/en/mobile/fullscreen/
  }, {
    key: 'toggleFullscreen',
    value: function toggleFullscreen() {
      if (!this.isBrowser()) {
        return;
      }
      var doc = window.document;
      var docEl = doc.documentElement;
      var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
      var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
      if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
      } else {
        cancelFullScreen.call(doc);
      }
    }

    // Attemp to hide the address bar when viewport is a mobile browser.
    // noop when not a browser.
  }, {
    key: 'toggleAddressBar',
    value: function toggleAddressBar() {
      // scrollTo hack doesn't work much anymore :(
    }
  }]);

  return Viewport;
})();

exports.Viewport = Viewport;
var viewport = new Viewport();

exports.viewport = viewport;
exports['default'] = viewport;