
import {COLORS,LIGHT_HUES} from './colors';



// Everything colour-related. It's based on Google's Material Design spec as much as possible.
// It's actually fairly complicated but I've tried to provide lots of functions for everything.


// Note: Function with names including 'ColorObject' return an object with  { palette, hue, alpha }. This is so we can get the text colour too.
// Functions with just 'Color' return a CSS string in _rgba() form.


// The main functions which will be used by Views are:
//    getBackgroundColor( hue, layer, topLayer ) - For use with containers and layers.
//    getTextColor( hue, layer, topLayer, textMode ) - For the current text Color.
//    getCurrentColor( hue, alpha=1 ) - Get the current main colour for a button, icon or something like that.


function isAccentHue(hue){
  return !Number.isInteger(parseInt(hue,10));
}

export let defaultTheme = {
  primaryPalette: 'blue',            // The app's primary palette (should be a constant). Options: see colors.js.
  primaryHues: ['100','500','700'],  // Pick 3 hues for the app to use (based on spec). Array (should be a constant). It doesn't have to be 3 values but the number should be odd so that the middle value is seen as the default hue. Options: see colors.js.
  accentPalette: 'pink',             // The app's accent palette (this should be a constant). Options: see colors.js.
  accentHue: 'A200',                 // Pick 1 main hue for the app. Options: see colors.js.
  mode: 'light',                     // The current theme mode (usually for containers or the whole app). Options: 'light', 'dark', 'transparent'
  paletteMode: 'grey',               // The current palette mode. Options: 'primary', 'accent', 'grey'.
  textMode: 'primary',               // The current text mode. Options: 'primary', 'secondary', 'disabled', 'hint'
  hue: undefined,                    // The current user-forced hue (weight). Options: see colors.js.
};

export class ThemeManager {

  constructor(cfg){
    this.cfg = {
      ...defaultTheme,
      ...cfg,
    };
  }

  // Get the current colour
  //
  // Examples:
  // getCurrentColor() - uses the *current* hue in the context cfg
  // getCurrentColor( '300' ) - uses hue of 300 from the palette
  // getCurrentColor( 1 ) - uses the 2nd (zero-index) Primary hue
  // getCurrentColor( 'default' ) - uses the middle Primary hue or the accent hue
  getCurrentColor( hue, alpha=1 ) {
    let color = this._getCurrentColorObjectByHue( hue, alpha );

    return this.getColorFromPalette(color.palette, color.hue, color.alpha);
  }

  _getCurrentColorObjectByHue( hue, alpha=1 ) {
    let palette = 'grey';
    if ( this.cfg.paletteMode == 'primary' ) palette = this.cfg.primaryPalette;
    else if ( this.cfg.paletteMode == 'accent' ) palette = this.cfg.accentPalette;

    hue = this.getHue( hue );

    return { palette: palette, hue: hue, alpha: alpha };

  }


  getHue( hue ) {
    if ( typeof hue == 'undefined' || hue === false ) hue = this.cfg.hue; //use the context hue

    if ( this.cfg.paletteMode == 'primary' ) {
      if ( typeof hue == 'number' && this.cfg.primaryHues[hue] ) hue = this.cfg.primaryHues[hue]; //XXX: experimenting with choosing one of the 3 primary hues.
      else if ( hue == 'default' ) hue = this.getPrimaryHue(); //XXX: experimenting with 'default'. Gets the middle of the primary hues.
    }
    else if ( this.cfg.paletteMode == 'accent' ) {
      // Note: This *should* check that the hue is an accent hue (e.g. it starts with 'A')
      // But it's possible we might want to use one of the other hues. Let's keep it flexible.
      if ( hue == 'default' ) hue = this.cfg.accentHue; //XXX: experimenting with 'default'.
    }
    else {
      if ( hue == 'default' ) hue = 500; //XXX: experimenting with 'default'.
    }

    return hue;
  }


  getPrimaryHue() {
    return this.cfg.primaryHues[Math.floor(this.cfg.primaryHues.length / 2)];
  }


  // Based on the current paletteMode, return the current palette name
  getCurrentPaletteName() {
    if ( this.cfg.paletteMode == 'primary' ) return this.cfg.primaryPalette;
    else if ( this.cfg.paletteMode == 'accent' ) return this.cfg.accentPalette;
    else return 'grey';
  }


  // Use the current palette and hue to get the background colour
  // If the hue parameter is specified then override the current hue
  // If the layer and topLayer are specified then override the hue with a calculated value based on the layer. See _getHueByLayer()
  getBackgroundColor( hue, layer, topLayer, hueOffset = 0 ) {
    if ( this.cfg.mode == 'transparent' ) return this.getTransparent(); //XXX: Still not sure about the 'transparent' mode

    let color = this._getBackgroundColorObjectWithSwitch( hue, layer, topLayer );

    return this.getColorFromPalette( color.palette, color.hue, color.alpha, hueOffset );
  }

  _getBackgroundColorObjectWithSwitch( hue, layer, topLayer ) {
    return this._getBackgroundColorObject( hue, layer, topLayer );
  }

  _getBackgroundColorObject( hue, layer, topLayer ) {

    // If the layers are specified then override the hue specified
    if ( typeof layer == 'number' && typeof topLayer == 'number' ){
      hue = this._getHueByLayer( this.getCurrentPaletteName(), layer, topLayer );
    }

    return this._getCurrentColorObjectByHue( hue );

  }

  // getColoredTextColor returns a color suitable for use as text
  // while getTextColor returns a suitable color to work on the primary/accent color
  // getColoredTextColor returns the primary/accent color in a hue that is readable
  // upon the current theme's light/dark background.
  getColoredTextColor( hue, layer, topLayer, textMode ) {
    if( this.cfg.paletteMode == 'grey' ){
      return this.getTextColor( hue, layer, topLayer, textMode );
    }
    // XXX: right now this is just the same as getBackgroundColor
    // but it SHOULD take into account the rest of the theme and pick
    // the hue that is most suitable (ie most of the time it will probably
    // need to be a darker hue like A700 for accent or 500+ for normal
    let textColor = this._getBackgroundColorObject( hue, layer, topLayer);
    let background = this._getTextColorObject( hue, layer, topLayer, textMode );
    let alpha = this._getAlphaForTextMode(background, textMode);
    return this.getColorFromPalette( textColor.palette, textColor.hue, alpha );

  }

  // Find out if the background colour is dark or light. Base text colour will be white and black respectively.
  // Then set the text's alpha based on the textMode
  getTextColor( hue, layer, topLayer, textMode ) {
    let color = this._getTextColorObjectWithSwitch( hue, layer, topLayer, textMode );
    return this.getColorFromPalette( color.palette, color.hue, color.alpha );
  }

  _getTextColorObjectWithSwitch( hue, layer, topLayer, textMode ) {
    return this._getTextColorObject( hue, layer, topLayer, textMode );
  }

  _getAlphaForTextMode(background, textMode){
    if ( typeof textMode == 'undefined' ){
      textMode = this.cfg.textMode; //get the current textMode from the context
    }
    if( textMode == 'primary' ){
      return 0.85;
    }
    if( textMode == 'secondary' ){
      return this.isHueLight( background.palette, background.hue ) ?
        0.54 : // light background, dark text
        0.60 ; // dark background, light text
    }
    return 0.30; //XXX: Maybe 0.38 - the spec says both multiple times, contradicting itself
  }

  _getTextColorObject( hue, layer, topLayer, textMode ) {
    let background = this._getBackgroundColorObject( hue, layer, topLayer );
    let textHue = this.isHueLight( background.palette, background.hue ) ? '1000' : 0;
    let alpha = this._getAlphaForTextMode(background, textMode);
    return { palette: 'grey', hue: textHue, alpha: alpha };
  }


  _getHueByLayer( paletteName, layer, topLayer ) {
    let accentHue = this.cfg.hue || this.cfg.accentHue || 'A400';
    let hues = Object.keys( COLORS[paletteName] )
      .filter(s => this.cfg.paletteMode == 'accent' && isAccentHue(accentHue)  ? isAccentHue(s) : !isAccentHue(s));
    if ( this.cfg.paletteMode == 'primary' ) {
      let hue = this.cfg.hue || this.getPrimaryHue();
      hues = this._getArrayItemsAfter( hues, hue, true); //Restrict the range
    }
    if ( this.cfg.paletteMode == 'accent' ) {
      let hue = this.cfg.hue || this.cfg.accentHue;
      hues = this._getArrayItemsAfter( hues, hue, true); //Restrict the range
    }

    if ( this.cfg.mode == 'light' ) {
      // Example: in the 'grey' palette, layer 1 of 4 would be hues[3] (200)
      // Example: in the 'grey' palette, layer 4 of 4 would be hues[0] (0)
      return hues[ Math.min( hues.length-1, (topLayer - layer) ) ];
    }
    else if ( this.cfg.mode == 'dark' ) {
      // Example: in the 'grey' palette, layer 1 of 4 would be hues[11] (1000)
      // Example: in the 'grey' palette, layer 4 of 4 would be hues[9] (700)
      return hues[ Math.max( 0, ( hues.length - (layer+1) ) ) ];
    }
  }

  _offsetHue( paletteName, hue, offset ) {
    if ( offset == 0 ) return hue;

    let hues = Object.keys( COLORS[paletteName] );
    if ( !isNaN(hue) ) hues = hues.filter( function(s) { return !isNaN(s); } ); //use only the primary hues
    else hues = hues.filter( function(s) { return isNaN(s); } ); //use only the accent hues

    let pos = hues.indexOf(hue);

    if ( pos < 0 ) return hue; // This is an error but just return the hue untouched

    let newPos = Math.max(0, Math.min( (pos + offset), hues.length-1 ) );

    // XXX: If the hue is at the start or end of the range, then the offset can't go off the end, so it just uses the end value
    // But maybe instead it should go the other way (getting lighter instead of darker or vice-versa)?

    return hues[ newPos ] || hue;

  }


  getColorFromPalette(paletteName, hue=500, alpha=1, hueOffset=0){

    hue = this._offsetHue( paletteName, hue, hueOffset );

    let palette = COLORS[paletteName];
    if( !palette ){
      throw new Error(`invalid palette name: ${paletteName}`);
    }
    let color = palette[hue];
    if( !color ){
      throw new Error(`invalid hue for palette ${paletteName}: ${hue}`);
    }

    return this._rgba(color,alpha);
  }



  _getHexFromColorObject( color ) {
    let rgb = COLORS[ color.palette ][ color.hue ];

    return this._toHex(rgb[0])+this._toHex(rgb[1])+this._toHex(rgb[2]);
  }

  getHexFromPaletteHue( paletteName, hue ) { // For the palette tables example
    let rgb = COLORS[ paletteName ][ hue ];
    return this._toHex(rgb[0])+this._toHex(rgb[1])+this._toHex(rgb[2]);
  }


  getAllPalettes() {
    return COLORS;
  }

  getAllPaletteNames() {
    return Object.keys( COLORS );
  }

  isHueLight( paletteName, hue ) {
    if( hue == 0 ){
      return true;
    }
    if( hue == 1000 ){
      return false;
    }
    if( !LIGHT_HUES[paletteName] ){
      throw new Error(`no palette ${paletteName} in LIGHT_HUES`);
    }
    return LIGHT_HUES[paletteName].indexOf(hue) > -1;
  }

  isHueDark( paletteName, hue ) {
    return !this.isHueLight( paletteName, hue );
  }


  getMode() {
    return this.cfg.mode;
  }

  getPaletteMode() {
    return this.cfg.paletteMode;
  }

  getBorderWidth(){
    return '0.07142857142857142rem';
  }

  getFontFamily(){
    return 'Roboto';
  }

  getBaseFontSize(){
    return 12;
  }

  getSpacing(){
    return 1.34;
  }


  //Helpers

  getWhite( alpha=1 ) {
    return this._rgba([255,255,255],alpha);
  }

  getBlack( alpha=1 ) {
    return this._rgba([0,0,0],alpha);
  }

  getTransparent() {
    return this._rgba([0,0,0],0);
  }

  _toHex(n) {
    n = parseInt(n,10);
    if( isNaN(n) ){
      return '00';
    }
    n = Math.max(0,Math.min(n,255));
    return '0123456789ABCDEF'.charAt((n-n%16)/16)
      + '0123456789ABCDEF'.charAt(n%16);
  }

  _rgba(v, alpha){
    if( typeof alpha == 'number' ){
      if( alpha > 1 ){
        throw new Error(`invalid value ${alpha} for alpha`);
      }
      v = [...v];
      v[3] = alpha;
    }
    let rgb = v.length > 3 ? 'rgba' : 'rgb';
    return `${rgb}(${v.join(',')})`;
  }

  // Given an array and a value, return
  _getArrayItemsAfter( arr, value, inc=true ) {
    let pos = arr.indexOf( value );
    if ( pos < 0 ) return arr; //if value not found then just return the whole array
    return arr.slice( pos + ( inc ? 0 : 1 ) );
  }

}


export default {
  theme: defaultTheme,
  Manager: ThemeManager,
};
