import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
  '.view.text': {
    display: 'block',
  },
  '.view.text .content': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  '.view.text.clamp .content': {
    position: 'relative',
  },
  '.view.text.clamp .content .after': {
    content: '"..."',
    fontSize: '1rem',
    color:'inherit',
    lineHeight: 'inherit',
    position:'absolute',
    bottom:0,
    right:0,
    paddingLeft:'2rem',
  }
});

function fadeTo(cssColor){
  return `linear-gradient(to right, rgba(255, 255, 255, 0), ${cssColor} 75%) repeat scroll 0 0 rgba(0, 0, 0, 0)`;
}

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
    // display makes the text almost unusably large
    display: React.PropTypes.bool,
    // headline is larger than title, it's for things like page headings
    headline: React.PropTypes.bool,
    // title marks the text as a title and sets the size accordingly
    title: React.PropTypes.bool,
    // subheading is a bit smaller than title
    subheading: React.PropTypes.bool,
    // hint is very small
    hint: React.PropTypes.bool,
  }

  static defaultProps = {
    ...View.defaultProps,
    lines: 0, // 0 means no limit
    size: 'intrinsic',
    row: false,
  }

  getColor(){
    if( this.props.color ){
      return this.props.color;
    }
    let inheritedTheme = this.context ? this.context.theme : {};
    if( inheritedTheme.paletteMode != 'grey' ){
      return this.getTheme().getTextColor(false, this.getLayer(), this.getTopLayer());
    }
    return this.getTheme().getColoredTextColor(false, this.getLayer(),this.getTopLayer());
  }

  getBackgroundColor(){
    return 'transparent';
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.text = true;
    if( this.props.lines > 0 ){
      cs.clamp = true;
    }
    return cs;
  }

  getSizeMultiplier(){
    if( this.props.display ){
      return 5;
    }
    if( this.props.headline ){
      return 2.4;
    }
    if( this.props.title ){
      return 1.5;
    }
    if( this.props.subheading ){
      return 1.1;
    }
    if( this.props.hint ){
      return 0.8;
    }
    return 1;
  }

  getFontSize(){
    return super.getFontSize() * this.getSizeMultiplier();
  }

  getStyle(){
    let style = super.getStyle();
    style.color = this.getColor();
    // style.flexGrow = 0;
    // style.flexBasis = '100%';
    return style;
  }

  getThemeConfig(){
    let cfg = super.getThemeConfig();
    if( this.props.subtle ){
      cfg.textMode = 'secondary';
    }
    return cfg;
  }

  render(){
    React.Children.forEach(n => { // XXX: debug
      if( typeof n != 'string' ){
        console.error(`${this.constructor.name} expects String children not: ${n}`);
      }
    });
    if( this.props.lines > 0 ){
      let contentStyle = {};
      contentStyle.height = (this.getLineHeight() * this.props.lines) + 'rem';
      contentStyle.background = fadeTo('#FFF'); // XXX: needs to fade to parent's bg color somehow
      return super.render(<div className="content" style={contentStyle}>
        {this.props.children}
        <span className="after" style={contentStyle}/>;
      </div>);
    }
    let Tag = this.props.htmlFor ? React.DOM.label : React.DOM.div;
    return super.render(
      Tag({className: 'content', htmlFor: this.props.htmlFor}, this.props.children)
    );
  }


}
