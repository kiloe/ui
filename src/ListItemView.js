import React from 'react';
import View from './View';
import IconView from './IconView';
import CSS from './utils/css';

CSS.register({
  '.listItem .primaryText': {
    fontSize: '16px', // XXX: Need to decide what to do about obeying the spec and working with this app's scale, etc
  },
  '.listItem .secondaryText': {
    fontSize: '14px',
  },
  '.listItem .right.icon': {
    width: '24px',
  },
  '.listItem .left': {
    marginLeft: '1.33rem',
  },
  '.listItem .content': {
    margin: '0 1.33rem',
  },
  '.listItem .right': {
    marginRight: '1.33rem',
  },
  '.listItem .left.iconButton': {
    // XXX: when it's an iconButton, it has padding already. How can we generalise this?
    marginLeft: '0.5rem',
  },
  '.listItem .right.iconButton': {
    marginRight: '0.5rem',
  }
});

// Note: A List Item / Tile should have a maximum of 3 lines of text.
// If more are needed, use a card (according to the Material spec).

export default class ListItemView extends View {

  static propTypes = {
    ...View.propTypes,
    left: React.PropTypes.oneOfType([ React.PropTypes.node, React.PropTypes.bool ]),
    right: React.PropTypes.oneOfType([ React.PropTypes.node, React.PropTypes.bool ]),
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

  constructor(...args){
    super(...args);

  }


  getStyle(){
    let style = super.getStyle();

    style.justifyContent = 'space-between';
    style.padding = '8px 0px';
    style.flexGrow = '0'; // List items shouldn't stretch out to fill the vertical space
    // style.flex = '1 0 0';

    return style;
  }


  onClick(e){
    super.onClick(e);

  }


  render(){

    const ICON_SIZE = 1.6;
    const AVATAR_SIZE = 4;

    let children = [];
    // TODO: handle when left and right are just set to true
    // (e.g. There's no element but there should be a space as if there were.)
    if( this.props.left ){
      let s = {
       // paddingRight: '16px',


      };

      let size = "intrinsic";
      if ( this.props.left.type.prototype instanceof IconView ) size = ICON_SIZE;
      else if ( this.props.left.props.avatar ) size = AVATAR_SIZE;

      let left = React.cloneElement(this.props.left,{
        //size: size,
        style: s,
        key: 'left',
        className: 'left',
      });
      children.push( left );
    }

    // XXX: Quickfix for Flex
    children.push( <View key="content" className="content" style={{flex:'1 0 0'}}>{this.props.children}</View> ); //content
    if( this.props.right ){
      let s = {
        //right style
        //margin: '0 0.5rem',
      };

      let size = "intrinsic";
      if ( this.props.right.type.prototype instanceof IconView ) size = ICON_SIZE;
      else if ( this.props.right.props.avatar ) size = AVATAR_SIZE;

      let right = React.cloneElement(this.props.right,{

        key: 'right',
        className: 'right',
        //size: size,
        style: {
          justifyContent: 'flex-start',
        },

      });
      children.push( right );
    }


    return super.render(children);
  }

}
