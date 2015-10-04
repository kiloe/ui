import React from 'react';
import View from '../../package/View';
import UI from '../../package/index';

UI.registerCSS({
  '.palette-table': {
  },
  '.palette-table .color-group': {
    margin: '15px',
  },
  '.palette-table .color-header': {
    marginBottom: '5px',
  },
  '.palette-table .color-header .name': {
    marginBottom: '30px',
  },
  '.palette-table .color-group .color-row': {
    padding: '15px',
  },
  '.palette-table .color-group .color-row .hue': {
    flex: '1',
  },
});

export default class PaletteTable extends View {

  static defaultProps = {
    ...View.defaultProps,
  }

  getStyle(){
    let style = super.getStyle();

    style.flexFlow = 'row wrap';
    return style;
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs['palette-table'] = true;
    return cs;
  }

  _toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  render(){

    let children = [];
    let theme = this.getTheme();
    let palettes = theme.getAllPalettes();
    let paletteNames = Object.keys( palettes );


    for ( let paletteName of paletteNames ) {
      let rows = [];
      let palette = palettes[paletteName];
      let hues = Object.keys( palette );

      let paletteNameFormatted = this._toTitleCase(paletteName.replace('-',' '));

      let hue = "500";
      let hex = "#" + theme.getHexFromPaletteHue( paletteName, hue );
      rows.push(<View key={paletteName+'-head'} className="color-row color-header" row={false} theme={{ primaryPalette: paletteName, hue: hue, paletteMode: 'primary' }}><div className="name" row align="left">{paletteNameFormatted}</div><View row><div className="hue">{hue}</div><div className="hex" align="right" style={{ textAlign: 'right' }}>{hex}</div></View></View>);

      for ( let hue of hues ) {
        let hex = "#" + theme.getHexFromPaletteHue( paletteName, hue );

        let rowTheme = false;
        if ( hue.substr(0,1) != "A" ) {
          rowTheme = { primaryPalette: paletteName, hue: hue, paletteMode: 'primary' };
        }
        else {
          rowTheme = { accentPalette: paletteName, hue: hue, paletteMode: 'accent' };
        }

        rows.push(<View key={paletteName+'-'+hue} className="color-row" row theme={rowTheme}><div className="hue" layer={0}>{hue}</div><div className="hex" layer={0} align="right" style={{ textAlign: 'right' }}>{hex}</div></View>);

      }
      children.push(<View key={paletteName} className="color-group" row={false} size={30}>{rows}</View>);

    }
    return super.render(children);

  }

}
