import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
  '.text span': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
  },
  '.text.rowOf1 span': {
    WebkitLineClamp: 1,
  },
  '.text.rowOf2 span': {
    WebkitLineClamp: 2,
  },
  '.text.rowOf3 span': {
    WebkitLineClamp: 3,
  },
  '.text.rowOf4 span': {
    WebkitLineClamp: 4,
  },
  '.text.rowOf5 span': {
    WebkitLineClamp: 5,
  },
});

export default class Text extends View {

  static propTypes = {
    ...View.propTypes,
    lines: React.PropTypes.number,
  }

  static defaultProps = {
    ...View.defaultProps,
    lines: 0, // 0 means no limit
  }


  getClassNames(){
    let cs = super.getClassNames();
    cs.text = true;
    if ( this.props.lines > 0 ) cs[ 'rowOf' + this.props.lines ] = true;
    return cs;
  }

  getStyle(){
    let style = super.getStyle();

   // style.flexBasis = '0'; // XXX: to fix width of text
    /*
    if ( this.props.lines > 0 ) {
      style.textOverflow = 'ellipsis';
      style.overflow = 'hidden';
      style.display = '-webkit-box';
      style.WebkitLineClamp = this.props.lines;
      style.WebkitBoxOrient = 'vertical';

    }*/


    return style;
  }

  render(){


    return super.render( this.props.children );
  }

}
