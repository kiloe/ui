import React from 'react';
import View from './View';
// import CSS from './utils/css';

export default class Media extends View {

  static propTypes = {
    ...View.propTypes,
    src: React.PropTypes.string,
  }

  static defaultProps = {
    ...View.defaultProps,
    row: true,
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.media = true;
    return cs;
  }

  getStyle(){
    let style = super.getStyle();
    style.backgroundImage = `url(${this.props.src})`;
    style.backgroundSize = 'cover';
    return style;
  }

}
