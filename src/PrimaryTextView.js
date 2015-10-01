import React from 'react';
import View from './View';
import TextView from './TextView';

export default class PrimaryTextView extends TextView {

  static propTypes = {
    ...View.propTypes,
  }

  static defaultProps = {
    ...View.defaultProps,
    theme: { textMode: 'primary' },
  }

  static styles = {
    ...TextView.styles,
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
