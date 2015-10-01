import React from 'react';
import View from './View';
import ButtonView from './ButtonView';

// These differ from Buttons with just an icon.
// The way they appear in the spec is there is no hover state and the background colour is
// the same as the icon colour but with transparency.

export default class IconButtonView extends ButtonView {

  static propTypes = {
    ...View.propTypes,
  }

  static contextTypes = {
    ...View.contextTypes
  }

  static defaultProps = {
    ...View.defaultProps,
    fab: false,
    invert: true,
    row: true,
    align: 'center',
    size: 'intrinsic',
  }

  static styles = {
    ...ButtonView.styles,
    '.button.iconButton .button-hover, .button.iconButton .button-focus, .button.iconButton .button-press': {
      opacity: '0',
    },
    '.button.iconButton:active .button-press': {
      opacity: '0.3',
    },
    '.button.iconButton:focus .button-press': {
      opacity: '0.2',
    }
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.button = true;
    cs.circular = true; //is circular
    cs.iconButton = true; //is an icon button (but not FAB)
    return cs;
  }

  constructor(...args){
    super(...args);
  }


  getStyle(){
    let style = super.getStyle();
    style.justifyContent = 'center';
    return style;
  }

  isInverted() {
    return this.props.accent || this.props.primary;
  }


  getTextColor( hueOffset ) {
    return super.getTextColor( hueOffset );
  }

  getBackgroundColor() {
    return this.getTheme().getTransparent();
  }





  render(){

    let children = [];
    if( this.props.icon ){
      let s = {
        padding:
          this.props.align == 'left' ? '0 0.5rem 0 0' :
          this.props.align == 'right' ? '0 0 0 0.5rem' :
          this.props.label && !this.props.fab ? '0 0.5rem 0 0' :
          0
      };
      let iconSize = 1.6;
      children.push(React.cloneElement(this.props.icon,{key:'icon', style:s,size:iconSize}));
    }


    // :hover. :focus and :active are all handled with hidden backgrounds. I totally came up with this idea on my own and didn't have to ask anyone.
    if ( !this.props.disabled ) { // No other states if it's disabled, yo!
      let bgOffset1 = { backgroundColor: this.getTextColor()};
      let bgOffset2 = { backgroundColor: this.getTextColor()};
      children.push(<div key="button-backgrounds"><div className="button-focus" style={bgOffset1}></div><div className="button-press" style={bgOffset2}></div></div>);
    }
    return super.render(children);
  }

}
