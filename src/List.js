import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
});

export default class List extends View {



  static defaultProps = {
    ...View.defaultProps,
    scroll: true,
    row: false,
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.list = true;
    return cs;
  }

  getStyle(){
    let style = super.getStyle();
    // style.paddingTop = '8px';
    return style;
  }

}
