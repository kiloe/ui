import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
  '.text span': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
  },
  '.text.rowOf1 span': {
    WebkitLineClamp: 1,
  },
  '.text.rowOf2 span': {
    WebkitLineClamp: 2,
  },
  '.text.rowOf3 span': {
    WebkitLineClamp: 3,
  },
  '.text.rowOf4 span': {
    WebkitLineClamp: 4,
  },
  '.text.rowOf5 span': {
    WebkitLineClamp: 5,
  },
});

// Text is (unsurprizingly) for displaying chunks of text.
// Unlike View's (but like Icons), Text blocks do not have background color.
// When you set the theme's paletteMode you are setting the color of the text NOT the background.
export default class Text extends View {

  static propTypes = {
    ...View.propTypes,
    // lines limits the number of lines of text that will be displayed
    lines: React.PropTypes.number,
    // color is a CSS color value (default is to calculate the color from the palette)
    color: React.PropTypes.string,
    // subtle makes the text more muted, it's basically a shortcut for setting theme={textMode:'secondary'}
    subtle: React.PropTypes.bool,
  }

  static defaultProps = {
    ...View.defaultProps,
    lines: 0, // 0 means no limit
  }

  getColor(){
    if( this.props.color ){
      return this.props.color;
    }
    return this.getTheme().getColoredTextColor(false, this.getLayer(),this.getTopLayer());
  }

  getBackgroundColor(){
    return 'transparent';
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.text = true;
    if ( this.props.lines > 0 ) cs[ 'rowOf' + this.props.lines ] = true;
    return cs;
  }

  getStyle(){
    let style = super.getStyle();
    style.color = this.getColor();
    return style;
  }

  getThemeConfig(){
    let cfg = super.getThemeConfig();
    if( this.props.subtle ){
      cfg.textMode = 'secondary';
    }
    return cfg;
  }


}
