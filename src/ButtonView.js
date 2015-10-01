import React from 'react';
import View from './View';


export default class ButtonView extends View {

  static propTypes = {
    ...View.propTypes,
    menu: React.PropTypes.element,
    fab: React.PropTypes.bool, // floating action button
    mini: React.PropTypes.bool, // FAB mini
    icon: React.PropTypes.node, // icon element to use
  }

  static contextTypes = {
    ...View.contextTypes
  }

  static defaultProps = {
    ...View.defaultProps,
    fab: false,
    mini: false,
    row: true,
    align: 'center',
    size: 'intrinsic',
    //layer: 0,
  }

  static styles = {
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
    '.button.fab': {
      width: '4.65rem !important',
      height: '4.65rem !important',
    },
    '.button.fab.mini': {
      width: '3.3rem !important',
      height: '3.3rem !important',
    },
    '.button.iconButton': {
      width: '2rem !important',
      height: '2rem !important',
    },
    '.button:not(.circular):not(.iconButton):not(.fab)': {
      minWidth: '5.3rem', // 88dp minimum for normal flat/raised buttons
    },
    '.dialog .button.flat:not(.circular):not(.iconButton)': {
      minWidth: '3.4rem', // 64dp minimum for flat buttons inside dialogs
    },


  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.button = true;
    if ( this.getRaise() > 0 ) cs.raised = true;
    if ( this.props.fab ) {
      cs.fab = true;
      if ( this.props.mini ) cs.mini = true; //currently just used for FABs
    }
    if ( !this.props.label || this.props.fab ) cs.circular = true; //is circular
    return cs;
  }

  constructor(...args){
    super(...args);
    this.state = {active:false};


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
    if( !this.props.fab ){
      if(this.props.label){
        style.padding = this.isColumn() ? '0.75rem 1rem' : '0.5rem 0.5rem';
      }else{
        style.padding = this.isColumn() ? '0.5rem' : '0.25rem';
      }
    }
    if ( !this.props.label || this.props.fab ) style.justifyContent = 'center';
    return style;
  }



  getBackgroundColor( hueOffset ) {

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


  render(c){

    if ( c ) return super.render(c); //er...how should I actually do this?

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
      if ( this.props.fab ) iconSize = 2; //~24px (from spec)
      children.push(React.cloneElement(this.props.icon,{key:'icon', style:s,size:iconSize}));
    }
    if( !this.props.fab && this.props.label ){
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
      let bgOffset1 = { backgroundColor: this.getBackgroundColor( this.getThemeMode() == 'light' ? 1 : -1 ) };
      let bgOffset2 = { backgroundColor: this.getBackgroundColor( this.getThemeMode() == 'light' ? 2 : -2 ) };
      children.push(<div key="button-backgrounds"><div className="button-hover" style={bgOffset1}></div><div className="button-focus button-press" style={bgOffset2}></div></div>);
    }
    return super.render(children);
  }

}
