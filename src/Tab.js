import React from 'react';
import MenuItem from './MenuItem';
import CSS from './utils/css';

CSS.register({
  '.button.tab': {
    textAlign: 'center',
  },
});

export default class Tab extends MenuItem {

  static defaultProps = {
    ...MenuItem.defaultProps,
    align: 'center',
    size: 'fill',
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.tab = true;
    return cs;
  }

}
