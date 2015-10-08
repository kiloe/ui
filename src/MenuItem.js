import React from 'react';
import Button from './Button';
import CSS from './utils/css';

CSS.register({
  '.view.menuitem': {

  }
});

export default class MenuItem extends Button {

  static defaultProps = {
    ...Button.defaultProps,
    align: 'left',
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.menuitem = true;
    return cs;
  }

  getMouseEnterHandler(){
    if( React.Children.count(this.props.children) > 0 ){
      return this.expand.bind(this);
    }
    return;
  }

  getMouseLeaveHandler(){
    if( React.Children.count(this.props.children) > 0 ){
      return this.contract.bind(this);
    }
    return;
  }

  // expand open the sub level of menu items
  expand(){

  }

  // contract closes the sub level of menu items
  contract(){

  }

}
