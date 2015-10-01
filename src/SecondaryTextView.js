import React from 'react';
import View from './View';
import TextView from './TextView';

export default class SecondaryTextView extends TextView {

  static defaultProps = {
    ...View.defaultProps,
    theme: { textMode: 'secondary' },
  }

  static styles = {
    ...TextView.styles,
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.secondaryText = true;

    return cs;
  }

  getStyle(){
    let style = super.getStyle();
    delete style.fontSize;

    return style;
  }

  render(){
    return super.render( this.props.children );
  }

}
