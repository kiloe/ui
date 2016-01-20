import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
  '.view.icon': {
    position: 'relative',
    alignItems: 'center',
    overflow: 'visible',
    width: '100%',
    display: 'block',
    height: 'auto',
    position: 'relative',
    paddingTop: '30px', // XXX: This needs fixing. It was to sort out SVG icons being displayed properly in Safari.
                        // There's an issue with Safari where the SVGs aren't displayed if the width/height is a %,
                        // so I found a fix which used padding-top: 100% but that caused other issues. This works for now.
  },

});

export default class Icon extends View {

  static propTypes = {
    ...View.propTypes,
    // Use stroke rather than fill color
    outline: React.PropTypes.bool,
    // color is a CSS color value (default is to calculate the color from the palette)
    color: React.PropTypes.string,
  }

  getBackgroundColor(){
    return 'transparent';
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.icon = true;
    return cs;
  }

  // Extend this
  getSVG(){
    return <svg viewBox="0 0 48 48"></svg>;
  }

  // getSize of the icon to display. Unless overrided by size prop
  // icon size is determined by container size and scale
  getSize(){
    // user set fixed size
    let size = super.getSize();
    if( typeof size == 'number' ){
      return size * this.getScale();
    }
    // The 'intrinsic' size of an icon is to maintain the aspect ratio
    // of the cross-axis ie. if container's height=10 then icon's width=10
    if( this.props.size == 'intrinsic' ){
      if( this.context && this.context.size ){
        let parentSize = this.context.size;
        if( typeof parentSize == 'number' ){
          return parentSize;
        }
      }
    }
    return 1.6 * this.getScale();
  }

  getColor(){
    if( this.props.color ){
      return this.props.color;
    }
    return this.getTheme().getColoredTextColor(false, this.getLayer(), this.getTopLayer(), 'primary');
  }

  getBorderWidth(){
    return this.getTheme().getBorderWidth();
  }

  render(){
    let style = {
      padding: this.getBorderWidth(),
    };
    if( this.props.outline ){
      style.stroke = this.getColor();
      style.strokeWidth = this.getBorderWidth();
      style.fill = this.getBackgroundColor();
    } else {
      style.fill = this.getColor();
    }
    let svg = React.cloneElement(this.getSVG(),{
      red: 'icon',
      style: style,
      width: '100%',
      height: '100%',
    });
    return super.render(svg);
  }

}
