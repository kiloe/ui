import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
  '.image img': {
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

export default class Image extends View {

  static propTypes = {
    ...View.propTypes,
    src: React.PropTypes.string,
    top: React.PropTypes.bool,
  }

  static defaultProps = {
    ...View.defaultProps,
    row: true,
    align: 'center',
    size: 'intrinsic',
    top: false,
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.image = true;
    return cs;
  }

  getStyle(){
    let style = super.getStyle();

    style.justifyContent = 'space-around';
    if ( this.props.top ) style.justifyContent = 'flex-start';

    return style;
  }


  render(){
    let s = {};
    return super.render( <img src={this.props.src} style={s} /> );
  }

}
