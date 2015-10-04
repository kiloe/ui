
import {COLORS,LIGHT_HUES} from './colors';



// Everything colour-related. It's based on Google's Material Design spec as much as possible.
// It's actually fairly complicated but I've tried to provide lots of functions for everything.


// Note: Function with names including 'ColorObject' return an object with  { palette, hue, alpha }. This is so we can get the text colour too.
// Functions with just 'Color' return a CSS string in _rgba() form.


// The main functions which will be used by Views are:
//    getBackgroundColor( hue, layer, topLayer ) - For use with containers and layers.
//    getTextColor( hue, layer, topLayer, textMode ) - For the current text Color.
//    getCurrentColor( hue, alpha=100 ) - Get the current main colour for a button, icon or something like that.



export class ThemeManager {

  constructor(cfg){
    this.cfg = {
      primaryPalette: 'blue',            // The app's primary palette (should be a constant). Options: see colors.js.
      primaryHues: ['100','500','700'],  // Pick 3 hues for the app to use (based on spec). Array (should be a constant). It doesn't have to be 3 values but the number should be odd so that the middle value is seen as the default hue. Options: see colors.js.
      accentPalette: 'pink',             // The app's accent palette (this should be a constant). Options: see colors.js.
      accentHue: 'A200',                 // Pick 1 main hue for the app. Options: see colors.js.
      mode: 'light',                     // The current theme mode (usually for containers or the whole app). Options: 'light', 'dark', 'transparent'

      paletteMode: 'grey',               // The current palette mode. Options: 'primary', 'accent', 'grey'.
      textMode: 'primary',               // The current text mode. Options: 'primary', 'secondary', 'disabled', 'hint'
      hue: '500',                        // The current hue (weight). Options: see colors.js.
      invert: false,                     // The current invert flag. Switches the element colour and text colour. Boolean.

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
  getCurrentColor( hue, alpha=100 ) {
    let color = this._getCurrentColorObjectByHue( hue, alpha );

    return this.getColorFromPalette(color.palette, color.hue, color.alpha);
  }

  _getCurrentColorObjectByHue( hue, alpha=100 ) {
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

  _getBackgroundColorObjectWithSwitch( hue, layer, topLayer ) { //includes invert switch
    if ( !this.cfg.invert ) return this._getBackgroundColorObject( hue, layer, topLayer );
    else return this._getTextColorObject( hue, layer, topLayer ); //switch it
  }

  _getBackgroundColorObject( hue, layer, topLayer ) {

    // If the layers are specified then override the hue specified
    if ( typeof layer == 'number' && typeof topLayer == 'number' ) hue = this._getHueByLayer( this.getCurrentPaletteName(), layer, topLayer );

    return this._getCurrentColorObjectByHue( hue );

  }

  // Find out if the background colour is dark or light. Base text colour will be white and black respectively.
  // Then set the text's alpha based on the textMode
  getTextColor( hue, layer, topLayer, textMode ) {
    let color = this._getTextColorObjectWithSwitch( hue, layer, topLayer, textMode );

    return this.getColorFromPalette( color.palette, color.hue, color.alpha );
  }

  _getTextColorObjectWithSwitch( hue, layer, topLayer, textMode ) { //includes invert switch
    if ( !this.cfg.invert ) return this._getTextColorObject( hue, layer, topLayer, textMode );
    else return this._getBackgroundColorObject( hue, layer, topLayer ); //switch it
  }

  _getTextColorObject( hue, layer, topLayer, textMode ) {

    if ( typeof textMode == 'undefined' ) textMode = this.cfg.textMode; //get the current textMode from the context

    let background = this._getBackgroundColorObject( hue, layer, topLayer );
    let textHue = '0';
    let alpha = 1;

    if ( this.isHueLight( background.palette, background.hue ) ) { //light background, dark text

      if ( textMode == 'primary' ) alpha = 0.85;
      else if ( textMode == 'secondary' ) alpha = 0.54;
      else alpha = 0.26; //XXX: Maybe 0.38 - the spec says both multiple times, contradicting itself

      textHue = '1000'; //black
    }
    else { //dark background, light text

      // The spec actually says 100%, 70% and 30%. But I've changed it to 85% and 60% because 100% is weird
      if ( textMode == 'primary' ) alpha = 0.85;
      else if ( textMode == 'secondary' ) alpha = 0.60;
      else alpha = 0.30;

      textHue = '0'; //white
    }

    return { palette: 'grey', hue: textHue, alpha: alpha };

  }


  _getHueByLayer( paletteName, layer, topLayer ) {
    let hues = Object.keys( COLORS[paletteName] );
    if ( this.cfg.paletteMode == 'accent' ) hues = hues.filter( function(s) { return isNaN(s); } ); //use only the accent hues
    else hues = hues.filter( function(s) { return !isNaN(s); } ); //remove the accent hues

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


  getColorFromPalette(paletteName, hue=500, alpha=100, hueOffset=0){

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

  getBackgroundHex() {
    let color = this._getBackgroundColorObjectWithSwitch();
    return this._getHexFromColorObject();
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


  isInverted() {
    return this.cfg.invert;
  }





  //Helpers

  getWhite( alpha=100 ) {
    return this._rgba([255,255,255],alpha);
  }

  getBlack( alpha=100 ) {
    return this._rgba([0,0,0],alpha);
  }

  getTransparent() {
    return this._rgba([0,0,0],0);
  }

  _toHex(n) {
   n = parseInt(n,10);
   if (isNaN(n)) return "00";
   n = Math.max(0,Math.min(n,255));
   return "0123456789ABCDEF".charAt((n-n%16)/16)
        + "0123456789ABCDEF".charAt(n%16);
  }

  _rgba(v, alpha){
    if( typeof alpha == 'number' ){
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


export const defaultTheme = {
      primaryPalette: 'blue',
      primaryHues: ['100','500','700'],
      accentPalette: 'pink',
      accentHue: 'A200',
      mode: 'light',
};

export default defaultTheme;
