import React from 'react';
import CSS from './utils/css';
import View from './View';
import ListItem from './ListItem';

CSS.register({

  '.gridtile': {
    margin: '0',
    flexDirection: 'column',
    display: 'flex',
    flexGrow: '0',
    position: 'relative',
  },
  '.gridtile.header': {
    flexDirection: 'column-reverse',
  },
  '.gridtile .tile-content': {
    width: '100%',
    height: '100%',
    left: '0px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  '.gridtile .tile-action': {
    left: '0px',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  '.gridtile.header .tile-action': {
    top: '0px',
  },
  '.gridtile.footer .tile-action': {
    bottom: '0px',
  },
  '.gridlist.inner .gridtile .tile-action': {
    position: 'absolute',
  },


});

export default class GridTile extends View {

  static propTypes = {
    ...View.propTypes,

    // The background image of the tile
    image: React.PropTypes.string,
    // If true, the action area will be at the top
    header: React.PropTypes.bool,
    // If true, the action area will be at the bottom
    footer: React.PropTypes.bool,
    // The action area can either be inside the tile image or outside.
    // Note that if "outer" is used then the action area isn't included in the 'height' of the tile
    actionPosition: React.PropTypes.oneOf(['inner','outer']),
    // CSS string for the background of the action area. Used for setting gradients or transparent blocks
    actionBackground: React.PropTypes.string,
    // The width of each tile (px or %)
    // Note that the 'scale' prop can affect this
    width: React.PropTypes.string,
    // The height of each tile (excluding "outer" action areas)
    height: React.PropTypes.string,


  }

  static defaultProps = {
    ...View.defaultProps,

    // Scale is effectively the same as 'colspan' in tables
    scale: 1,
  }

  getStyle(){
    let style = super.getStyle();
    style.flexBasis = this.props.width;
    style.justifyContent = 'flex-start';

    return style;
  }


  getClassNames(){
    let cs = super.getClassNames();
    cs.gridtile = true;
    cs.header = this.props.header;
    cs.footer = this.props.footer;

    return cs;
  }



  render(){
    let children = [];
    let contentStyle = {};
    let actionStyle = {};
    contentStyle.backgroundImage = 'url(' + this.props.image + ')';
    contentStyle.height = this.props.height;
    actionStyle.background = this.props.actionBackground;


    let newChildren = React.Children.map(this.props.children, function(child) {
      // Make sure they're all transparent and don't inherit the scale
      return React.cloneElement(child, { transparent: true, scale: 1 } );
    }.bind(this));

    children.push( <div className="tile-content" style={contentStyle}></div> );
    children.push( <div className="tile-action" style={actionStyle}>{ newChildren }</div> );

    return super.render(children);
  }

}
