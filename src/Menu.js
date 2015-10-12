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
    depth: React.PropTypes.number, // internal use for modal
  }

  static defaultProps = {
    ...View.defaultProps,
    raised: true,
    size: 'intrinsic',
    theme: {mode: 'light'},
    depth: 0,
  }

  static childContextTypes = {
    ...View.childContextTypes,
    depth: React.PropTypes.number,
  }

  getChildContext(){
    let cxt = super.getChildContext();
    cxt.depth = this.getDepth();
    return cxt;
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

  getDepth(){
    return this.props.depth || 0;
  }

}
