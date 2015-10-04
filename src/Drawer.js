import React from 'react';
import View from './View';
import {viewport,Viewport} from './utils/viewport';
import CSS from './utils/css';

const TOP = -1;
const BOTTOM = 1;
const LEFT = -1;
const RIGHT = 1;

CSS.register({
  '.drawer': {
    zIndex: 100,
    transform: 'translateZ(0)', // enable GPU
  },
});

export default class Drawer extends View {


  static propTypes = {
    // Set to the name of a breakpoint at which the drawer should
    // get docked in place as if it is just a normal View
    docked: React.PropTypes.oneOf(Object.keys(Viewport.breakpoints.width)),
    // Set to the side you want the drawer to reveal from
    side: React.PropTypes.oneOf([LEFT,RIGHT,TOP,BOTTOM]),
    // Set to true to reveal the floating drawer
    // this will override the "hide" property when drawer is not docked
    active: React.PropTypes.bool,
    // ..and all View props
    ...View.propTypes
  }

  static defaultProps = {
    ...View.defaultProps,
    depth: 2,
    side: LEFT,
    theme: {mode:'light'},
    size: 25,
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.drawer = true;
    return cs;
  }

  getSize(){
    let size = super.getSize();
    if( !size ){
      throw new Error('Drawer must have a fixed size');
    }
    return size;
  }

  getStyle(){
    let style = super.getStyle();
    // If props.docked is set then dock the drawer back into the
    // page when the viewport size is met
    if( this.props.docked ){
      let axis = this.isColumn() ? 'width' : 'height';
      if( viewport[axis][this.props.docked] ){
        return style;
      }
    }
    // Float the view off the page.
    // Use props.active to reveal it
    // Use props.side to dictate which side to float
    style.position = 'absolute';
    let offset = this.props.active ? 0 : 0 - this.getSize();
    if( this.isColumn() ){
      style.top = 0;
      style.height = '100%';
      if( this.props.side == LEFT ){
        style.left = `${offset}rem`;
      } else {
        style.right = `${offset}rem`;
      }
    } else {
      style.left = 0;
      style.width = '100%';
      if( this.props.side == TOP ){
        style.top = `${offset}rem`;
      } else {
        style.bottom = `${offset}rem`;
      }
    }
    return style;
  }

}
