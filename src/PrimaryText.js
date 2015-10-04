import React from 'react';
import View from './View';
import Text from './Text';

export default class PrimaryText extends Text {

  static propTypes = {
    ...View.propTypes,
  }

  static defaultProps = {
    ...View.defaultProps,
    theme: { textMode: 'primary' },
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.primaryText = true;


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
