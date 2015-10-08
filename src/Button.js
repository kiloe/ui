import React from 'react';
import View from './View';
import Text from './Text';
import CSS from './utils/css';

CSS.register({
  '.view.button': {
    boxSizing: 'border-box',
    textTransform: 'uppercase',
    letterSpacing: '0',
    willChange: 'box-shadow, transform',
    WebkitTransition: 'box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1)',
    transition: 'box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1)',
    outline: 'none',
    textAlign: 'center',
    borderStyle: 'solid',
    borderRadius: 2,
  },
  // spacing between adjacent buttons in row
  '.row > .button + .button':{
    marginLeft: '0.5rem'
  },
  // spacing between adjacent buttons in col
  '.col > .button + .button': {
    // marginTop: '0.5rem'
  },
  '.col > .button .text': {
    padding: '0.5rem 0',
  },
  // spacing between label and icon
  '.button > .text + .icon, .button > .icon + .text': {
    marginLeft: '0.5rem'
  },
  '.button .button-hover, .button .button-focus, .button .button-press': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom:0,
    transition: 'opacity 0.2s ease-in-out',
    opacity: '0',
  },
  '.button:hover .button-hover': {
    opacity:'1',
  },
  '.button:focus:not(:active) .button-focus': {
    opacity:'0.1',
  },
  '.button:active .button-press': {
    opacity:'1',
  },
  '.button.circular, .button.circular .button-hover, .button.circular .button-focus, .button.circular .button-press': {
    borderRadius: '50%',
    justifyContent: 'center',
  },
  '.button.subtle:hover .button-hover, .button.outline:hover .button-hover': {
    opacity: '0.1',
  },
  '.button.subtle:active .button-press, .button.outline:active .button-press': {
    opacity: '0.2',
  },
  '.button.subtle:focus .button-press, .button.outline:focus .button-press': {
    opacity: '0.1',
  },
  '.button::after': {
    position: 'absolute',
    content: '" "',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    backgroundImage: 'radial-gradient(circle at center,rgba(255,255,255,0.8)  0%,rgba(255,255,255,0.8) 10%,transparent 11%,transparent 100%)',
    backgroundSize: '1% 1%',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'transparent',
    transition: '1s opacity ease, 0.5s background-size ease-in 0.3s',
    opacity: 0,
  },
  '.button:focus::after': {
    // transition: '0.25s background-size ease-out, 0.0s opacity ease-in',
    boxShadow: '0 10px 10px rgba(0,0,0,0.19), 0 6px 3px rgba(0,0,0,0.23)',
    animation: 'btnripple 1s forwards ease-out',
  },
  '@keyframes btnripple': `
    0% {
      opacity: 0;
      background-size: 1% 1%;
    }
    40% {
      opacity: 0.5;
      background-size: 1000% 1000%;
    }
    100% {
      opacity: 0;
      background-size: 1000% 1000%;
    }
  `
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
    // subtle buttons do not have hover effects or borders and are slightly transparent.
    // they are usually used with only an icon for use as muted auxilary actions
    subtle: React.PropTypes.bool,
    // outline buttons:
    // * the same fill color as a 'grey' button
    // * for primary/accent: text/stroke color is what would usually be the fill color
    // * for grey buttons: text color is same as normal
    // * have a border of the stroke color
    // * if icon used: sets "outline" prop on icon (maybe?)
    outline: React.PropTypes.bool,
  }

  static defaultProps = {
    ...View.defaultProps,
    row: true,
    align: 'center',
    size: 'intrinsic',
    pad: true,
  }

  getRaise(){
    if( this.props.subtle ){
      return 0; // can't raise subtle buttons
    }
    return super.getRaise();
  }

  getPadding(){
    if( !this.isInRow() ){
      return 0;
    }
    return super.getPadding();
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
    if( this.props.subtle ){
      cs.subtle = true;
    }
    if( this.props.outline ){
      cs.outline = true;
    }
    return cs;
  }

  getStyle(){
    let style = super.getStyle();
    if( this.props.align == 'right' ){
      style.flexDirection = 'row-reverse'; //Reverse the order (e.g. label then icon)
    }
    if( !this.props.label ){
      style.justifyContent = 'center';
    }
    style.borderColor = this.getBorderColor();
    style.borderWidth = this.getBorderWidth();
    if( this.props.subtle ){
      style.borderColor = 'transparent';
      style.backgroundColor = 'transparent';
    }
    return style;
  }

  getBackgroundColor(hueOffset) {
    if( this.props.outline ){
      let theme = this.getTheme();
      if( theme.getPaletteMode() != 'grey' ){
        return super.getTextColor();
      }
    }
    return super.getBackgroundColor(hueOffset);
  }

  getBackgroundEffectColor(hueOffset) {
    if( this.props.outline ){
      let textMode = this.props.subtle ? 'hint' : 'primary';
      return this.getTheme().getColoredTextColor(false, this.getLayer(),this.getTopLayer(), textMode);
    }
    return super.getBackgroundColor(hueOffset);
  }

  getTextColor(){
    if( this.props.outline || this.props.subtle ){
      let textMode = this.props.subtle ? 'secondary' : 'primary';
      return this.getTheme().getColoredTextColor(false, this.getLayer(),this.getTopLayer(), textMode);
    }
    return super.getTextColor();
  }

  getBorderColor(){
    if( this.props.outline ){
      let textMode = this.props.subtle ? 'hint' : 'primary';
      return this.getTheme().getColoredTextColor(false, this.getLayer(),this.getTopLayer(), textMode);
    }
    return super.getBackgroundColor();
  }

  getBorderWidth(){
    return this.getTheme().getBorderWidth();
  }

  // buttons inherit layer from parent
  getLayer() {
    let parent = this.getParent();
    if( !parent ){
      return 0;
    }
    return parent.getLayer();
  }

  // raised buttons do not report back so this is a noop
  reportLayerNumberToRootLayer(){
    return;
  }

  // raised buttons do not report back so this is a noop
  forceLayerCalc(){
    return;
  }

  // buttons inherit layer from parent
  getRootLayer(){
    let parent = this.getParent();
    if( !parent ){
      return this;
    }
    return parent.getRootLayer();
  }

  // buttons inherit layer from parent
  getTopLayer(){
    let parent = this.getParent();
    if( !parent ){
      return 0;
    }
    return parent.getTopLayer();
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
      this.setModalContent(menu);
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
      size:'intrinsic',
      outline: this.props.outline,
      color: this.getTextColor(),
    };
    if( this.props.icon instanceof Function ){
      let Icon = this.props.icon;
      return <Icon {...props} />;
    }
    return React.cloneElement(this.props.icon, props);
  }

  getLabel(){
    let props = {
      style: {
        cursor: this.isClickable() ? 'pointer' : 'default',
        alignItems:
          this.props.align == 'left' ? 'flex-start' :
          this.props.align == 'right' ? 'flex-end' :
          'stretch',
        backgroundColor: 'transparent',
        alignSelf: 'center',
      },
      color: this.getTextColor(),

    };
    return <Text key="label" {...props}>{this.props.label}</Text>;
  }

  getTabIndex(){
    return '-1';
  }


  render(){
    let children = [];
    // :hover. :focus and :active are all handled with hidden backgrounds. I totally came up with this idea on my own and didn't have to ask anyone.
    if ( !this.props.disabled ) { // No other states if it's disabled, yo!
      let hover = {
        backgroundColor: this.props.subtle ?
          'transparent' :
          this.getBackgroundEffectColor( this.getThemeMode() == 'light' ? 1 : -1 )
      };
      let press = {
        backgroundColor: this.getBackgroundEffectColor( this.getThemeMode() == 'light' ? 2 : -2 )
      };
      children.push(<div key="button-backgrounds">
          <div className="button-hover" style={hover}></div>
          <div className="button-focus button-press" style={press}></div>
      </div>);
    }
    if( this.props.icon ){
      children.push(this.getIcon());
    }
    if( this.props.label ){
      children.push(this.getLabel());
    }
    return super.render(children);
  }

}
