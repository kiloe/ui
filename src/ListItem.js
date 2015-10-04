import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
  '.listItem': {
    padding: '1.33rem',
  },
});

// Note: A List Item / Tile should have a maximum of 3 lines of text.
// If more are needed, use a card (according to the Material spec).

export default class ListItem extends View {

  static propTypes = {
    ...View.propTypes,
    // left assigns a View to the LHS of the list item.
    // passing an element will place that element in the column,
    // passing 'true' will guess the size of a blank space to fill the column.
    // padding a number will create a space of that 'size'
    left: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.bool,
      React.PropTypes.number,
    ]),
    // right assigns a View to the RHS of the list item.
    // passing an element will place that element in the column,
    // passing 'true' will guess the size of a blank space to fill the column.
    // padding a number will create a space of that 'size'
    right: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.bool,
      React.PropTypes.number,
    ]),
  }

  static defaultProps = {
    ...View.defaultProps,
    row: true,
    size: 'fill',
    align: 'center',
    scroll: false,
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.listItem = true;
    return cs;
  }

  getStyle(){
    let style = super.getStyle();
    style.justifyContent = 'space-between';
    // style.padding = '8px 0px';
    style.flexGrow = '0'; // List items shouldn't stretch out to fill the vertical space
    // style.flex = '1 0 0';
    return style;
  }

  cloneItem(el, i){
    if( !el ){
      return;
    }
    let props = {
      row:
        i == 1 ? false : true,
      size:
        i == 1 ? 'fill' : 'intrinsic',
      key: i,
      className:
        i == 0 ? 'left' :
        i == 1 ? 'content' :
        i == 2 ? 'right' :
        '',
      style: {
        justifyContent: 'space-between',
        margin: '0 0.5rem',
        flexShrink: i==1 ? 1 : 0,
        alignItems:
          i == 1 ? 'stretch' : 'center', //XXX: maybe all should be center
      }
    };
    if( el === true ){
      return <View {...props} size={1.6} />; //XXX: arbitary size?
    }else if( typeof el == 'number' ){
      return <View {...props} size={el * this.getScale()}/>;
    }else if( Array.isArray(el) ){
      return <View {...props}>{el}</View>;
    }
    return <View {...props}>{el}</View>;
  }

  render(){
    return super.render([this.props.left, this.props.children, this.props.right]
      .map(this.cloneItem.bind(this))
      .filter(el => !!el));
  }

}
