import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
  '.button': {
    border: 'none',
    borderRadius: 2,
    textTransform: 'uppercase',
    letterSpacing: '0',
    willChange: 'box-shadow, transform',
    WebkitTransition: 'box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1)',
    transition: 'box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1)',
    outline: 'none',
    textAlign: 'center',
  },
  '.button .icon, .button span': {
    zIndex: '1',
  },
  '.button .button-hover, .button .button-focus, .button .button-press': {
    // visibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom:0,
    transition: 'opacity 0.2s ease-in-out',
    opacity: '0',
  },
  '.button:hover .button-hover': {
    // visibility: 'visible',
    opacity:'1',
  },
  '.button:focus:not(:active) .button-focus': {
    // visibility: 'visible',
    opacity:'1',
  },
  '.button:active .button-press': {
    // visibility: 'visible',
    opacity:'1',
  },
  '.button.circular, .button.circular .button-hover, .button.circular .button-focus, .button.circular .button-press': {
    borderRadius: '50%',
    justifyContent: 'center',
  },
  '.button:not(.circular)': {
    // minWidth: '5.3rem', // 88dp minimum for normal flat/raised buttons
  },
  '.dialog .button.flat:not(.circular)': {
    // minWidth: '3.4rem', // 64dp minimum for flat buttons inside dialogs
  },
  '.button.transparent:hover .button-hover': {
    opacity: '0.1',
  },
  '.button.transparent:active .button-press': {
    opacity: '0.3',
  },
  '.button.transparent:focus .button-press': {
    opacity: '0.2',
  }
});

export default class Button extends View {

  static propTypes = {
    ...View.propTypes,
    // Popup menu to active with button //XXX: probably shouldn't live here
    menu: React.PropTypes.element,
    // icon to show on button, can be either an icon element or icon class
    icon: React.PropTypes.oneOfType([
      React.PropTypes.element,
      React.PropTypes.func,
    ]),
    // transparent buttons only have background for the click effects
    transparent: React.PropTypes.bool,
  }

  static defaultProps = {
    ...View.defaultProps,
    row: true,
    align: 'center',
    size: 'intrinsic',
    layer: 0,
  }

  getRaise(){
    if( this.props.transparent ){
      return 0; // can't raise transparent things
    }
    return super.getRaise();
  }

  getSize(){
    // The 'intrinsic' size of an icon-only button is to maintain the aspect ratio
    // of the cross-axis ie. if container's height=10 then icon's width=10
    if( !this.props.label && this.props.size == 'intrinsic' ){
      let parent = this.getParent();
      if( parent ){
        let parentSize = parent.getSize();
        if( typeof parentSize == 'number' ){
          return parentSize;
        }
      }
    }
    return super.getSize();
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.button = true;
    if( this.getRaise() > 0 ){
      cs.raised = true;
    }
    // buttons without labels are round...
    // but since 'fill' would cause weird aspect ratios
    // 'fill' buttons are always square
    if( !this.props.label && this.props.size != 'fill' ){
      cs.circular = true;
    }
    // a 'transparent' button is one where the background
    // color only shows for effects
    if( this.props.transparent ){
      cs.transparent = true;
    }
    return cs;
  }

  getLayer() {
    if ( this.props.raised ) return 0; //reset layer if raised
    else return super.getLayer();
  }

  getStyle(){
    let style = super.getStyle();
    if( this.props.align == 'right' ){
      style.flexDirection = 'row-reverse'; //Reverse the order (e.g. label then icon)
    }
    if( this.props.label ){
      style.padding = this.isColumn() ? '0.75rem 1rem' : '0.5rem 0.5rem';
    }else{
      // style.padding = this.isColumn() ? '0.5rem' : '0.25rem';
      style.justifyContent = 'center';
    }
    return style;
  }

  getBackgroundColor( hueOffset ) {
    if( this.props.transparent ){
      return this.getTheme().getTransparent();
    }
    if ( typeof hueOffset == 'undefined' && this.getRaise() > 0 && this.props.disabled ) {
      hueOffset = ( this.getThemeMode() == 'light' ? 1 : -1 );
    }
    return super.getBackgroundColor( hueOffset );
  }

  onClick(e){
    if( this.props.menu ){
      e.stopPropagation();
      let pos = this.refs.view.getBoundingClientRect();
      let menu = React.cloneElement(this.props.menu,{
        style: {
          left: pos.left,
          top: pos.top,
        }
      });
      this.setModal(menu);
    } else {
      super.onClick(e);
    }
  }

  isClickable(){
    if( this.props.menu && !this.props.disabled ){
      return true;
    }
    return super.isClickable();
  }

  // getIcon returns the icon as an element or undefined if no icon prop
  getIcon(){
    if( !this.props.icon ){
      return;
    }
    let props = {
      key:'icon',
      style:{
        padding:
          this.props.align == 'left' ? '0 0.5rem 0 0' :
          this.props.align == 'right' ? '0 0 0 0.5rem' :
          this.props.label ? '0 0.5rem 0 0' :
          '0.6rem'
      },
      size:'intrinsic'
    };
    if( this.props.icon instanceof Function ){
      let Icon = this.props.icon;
      return <Icon {...props} />;
    }
    return React.cloneElement(this.props.icon, props);
  }

  isInverted(){
    // primary/accent colors only work inverted when transparent
    if( this.props.transparent && (this.props.primary || this.props.accent) ){
      return true;
    }
    return super.isInverted();
  }


  render(c){

    if ( c ) return super.render(c); //er...how should I actually do this?

    let children = [];
    if( this.props.icon ){
      children.push(this.getIcon());
    }
    if( this.props.label ){
      let s = {
        cursor: this.isClickable() ? 'pointer' : 'default',
        backgroundColor: 'transparent',
        alignItems:
          this.props.align == 'left' ? 'flex-start' :
          this.props.align == 'right' ? 'flex-end' :
          'stretch'
      };
      children.push(<View key="label" style={s}>{this.props.label}</View>);
    }

    // :hover. :focus and :active are all handled with hidden backgrounds. I totally came up with this idea on my own and didn't have to ask anyone.
    if ( !this.props.disabled ) { // No other states if it's disabled, yo!
      let hover = {
        backgroundColor: this.props.transparent ?
          'transparent' :
          this.getBackgroundColor( this.getThemeMode() == 'light' ? 1 : -1 )
      };
      let press = {
        backgroundColor: this.props.transparent ?
          this.getTextColor() :
          this.getBackgroundColor( this.getThemeMode() == 'light' ? 2 : -2 )
      };
      children.push(<div key="button-backgrounds">
          <div className="button-hover" style={hover}></div>
          <div className="button-focus button-press" style={press}></div>
      </div>);
    }
    return super.render(children);
  }

}
