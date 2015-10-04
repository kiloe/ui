import React from 'react';
import View from './View';

export default class List extends View {

  static defaultProps = {
    ...View.defaultProps,
    scroll: true,
    row: false,
  }

  getStyle(){
    let style = super.getStyle();
    // style.paddingTop = '8px';
    return style;
  }

}
