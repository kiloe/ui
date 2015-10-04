import React from 'react';
import View from './View';
import Text from './Text';

export default class SecondaryText extends Text {

  static defaultProps = {
    ...View.defaultProps,
    theme: { textMode: 'secondary' },
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
