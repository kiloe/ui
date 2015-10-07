import React from 'react';
import View from './View';

export default class Toolbar extends View {

  static defaultProps = {
    ...View.defaultProps,
    row: true,
    raised: 2,
  }

  // getSize returns the height of the toolbar (in rem)
  // unless specifically overrided by the size prop, a toolbar's size
  // is dictated by the scale prop
  getSize(){
    let size = super.getSize();
    if( typeof size != 'undefined' ){
      return size;
    }
    return 3 * this.getScale();
  }

  // getStyle(){
  //   let style = super.getStyle();
  //   style.padding = '0.5rem 0';
  //   return style;
  // }

}
