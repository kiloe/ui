import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
  '.toolbar.row > .button + .button': {
    marginLeft: 0,
  }
});

export default class Toolbar extends View {

  static defaultProps = {
    ...View.defaultProps,
    row: true,
    raised: 2,
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.toolbar = true;
    return cs;
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

}
