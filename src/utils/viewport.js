
// Viewport is an interface to query info about the viewport/device.
// It uses media queries to define breakpoints on the viewport width/height
// and emit a 'change' event when the breakpoint state has changed.
//
// When running in a browser or environment without matchMedia support
// it will always return as "medium".
export class Viewport {

  static breakpoints = {
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
  }

  constructor(){
    this.unsupported = typeof window == 'undefined' || !window.matchMedia;
    ['width', 'height'].forEach(name => {
      this[name] = Object.keys(Viewport.breakpoints[name]).reduce( (o,k) => {
        if( this.unsupported ){
          o[k] = false;
          return o;
        }
        let w = Viewport.breakpoints[name][k];
        let m = window.matchMedia(`(min-${name}: ${w}px)`);
        o[k] = m.matches;
        m.addListener(m => {
          let update = this[name][k] != m.matches;
          this[name][k] = m.matches;
          if( update ){
            this.emit('change', m);
          }
        });
        return o;
      },{});
    });
    // If cannot use queries... start as medium (useful for testing).
    if( this.unsupported ){
      this.width.medium = true;
      this.height.medium = true;
    }
  }

  // Intensionally simplistic "emit" event management.
  emit(name, e){
    if( !this.fn ){
      return;
    }
    this.fn(e);
  }

  // Intensionally simplistic "on" event management.
  // keeping it simple removes the need to remove the handlers.
  on(name, fn){
    this.fn = fn;
    return this;
  }

  // Are we running in a browser?
  isBrowser(){
    return typeof window != 'undefined' && typeof document != 'undefined';
  }

  // Attempt to make the viewport fullscreen
  // noop when not a browser.
  // Poached from: http://www.html5rocks.com/en/mobile/fullscreen/
  toggleFullscreen() {
    if( !this.isBrowser() ){
      return;
    }
    var doc = window.document;
    var docEl = doc.documentElement;
    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
    }
    else {
      cancelFullScreen.call(doc);
    }
  }

  // Attemp to hide the address bar when viewport is a mobile browser.
  // noop when not a browser.
  toggleAddressBar(){
    // scrollTo hack doesn't work much anymore :(
  }

  // return width of viewport
  getWidth(){
    return window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
  }

  // return height of viewport
  getHeight(){
    return window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
  }

}

export const viewport = new Viewport();

export default viewport;
