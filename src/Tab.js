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

  getMenuConfig(){
    let parent = this.refs.view.parentNode.parentNode;
    return {
      obscure: true,
      direction: 'bottom',
      pos: this.refs.view ? {
        top: parent.offsetTop,
        left: parent.offsetLeft + this.refs.view.offsetLeft,
      } : null,
    };
  }

  getTip(){
    if( this.hasMenu() ){
      return <div>▼</div>;
    }
    return super.getTip();
  }

}
