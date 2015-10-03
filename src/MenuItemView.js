import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
  '.view.menuitem': {
    display: 'block',
    padding: 8,
    margin: 8,
  },
  '.view.menuitem:hover': {
    background: 'blue'
  }
});

export default class MenuItemView extends View {

  static defaultProps = {
    ...View.defaultProps,
    raised: 1,
    theme: {mode: 'transparent'}
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.menuitem = true;
    return cs;
  }

  render(){
    return super.render(
      this.props.label
    );
  }

}
