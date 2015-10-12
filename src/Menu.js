import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
  '.menu': {
    alignSelf: 'center',
  },
});

export default class Menu extends View {

  static propTypes = {
    ...View.propTypes,
    parent: React.PropTypes.object, // internal use parent menu
  }

  static defaultProps = {
    ...View.defaultProps,
    raised: true,
    size: 'intrinsic',
    theme: {mode: 'light'},
  }

  static childContextTypes = {
    ...View.childContextTypes,
    depth: React.PropTypes.number,
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.menu = true;
    return cs;
  }

  getStyle(){
    let style = super.getStyle();
    style.position = 'static'; // XXX: I have no idea why this is needed, but without it menus dont work in modals!?!
    return style;
  }

  getClickHandler(){
    return this.hideParent;
  }

  hideParent = () => {
    console.log('clicked menu');
    if( this.props.parent ){
      this.props.parent.hideMenu();
    }
  }

}
