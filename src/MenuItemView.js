import React from 'react';
import View from './View';

export default class MenuItemView extends View {

  static defaultProps = {
    ...View.defaultProps,
    raised: 1,
    theme: {mode: 'transparent'}
  }

  static styles = {
    ...View.styles,
    '.view.menuitem': {
      display: 'block',
      padding: 8,
      margin: 8,
    },
    '.view.menuitem:hover': {
      background: 'blue'
    }
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
