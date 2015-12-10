import React from 'react';
import List from './List';
import CSS from './utils/css';
import GridTile from './GridTile';

CSS.register({

  '.gridlist': {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  '.gridlist.padding-thin': {
    margin: '-1px 0 0 -1px',
  },
  '.gridlist.padding-thin > *': {
    margin: '1px 0 0 0',
  },
  '.gridlist.padding-thin .gridtile > *': {
    margin: '0 0 0 1px',
  },
  '.gridlist.padding-thick': {
    margin: '-4px 0 0 -4px',
  },
  '.gridlist.padding-thick > *': {
    margin: '4px 0 0 0',
  },
  '.gridlist.padding-thick .gridtile > *': {
    margin: '0 0 0 4px',
  },


});

export default class GridList extends List {

  static propTypes = {
    ...List.propTypes,

    // The number of Grid Tiles per row. This works by giving the appropriate % width to all child tiles.
    columns: React.PropTypes.number,
    // The action area position of child tiles (see GridTile)
    actionPosition: React.PropTypes.oneOf(['inner','outer']),
    // The action area background of the child tiles (see GridTile)
    actionBackground: React.PropTypes.string,
    // The height of the child tiles (see GridTile)
    tileHeight: React.PropTypes.string,
    // The padding between tiles. Either 1px or 4px (from the spec)
    padding: React.PropTypes.oneOf(['thin','thick']),
    // When no image is provided to a child tile, this is used.
    defaultImage: React.PropTypes.string,
    // The action area location of the child tiles (see GridTile)
    header: React.PropTypes.bool,
    // The action area location of the child tiles (see GridTile)
    footer: React.PropTypes.bool,

  }

  static defaultProps = {
    ...List.defaultProps,
    columns: 2,
    row: true,
    scroll: false,
    padding: 'thin',
    tileHeight: '20rem',
    actionPosition: "inner",
    defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=", // black bg

  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.gridlist = true;
    cs['padding-thin'] = (this.props.padding == 'thin');
    cs['padding-thick'] = (this.props.padding == 'thick');
    cs.inner = (this.props.actionPosition == 'inner');
    cs.outer = (this.props.actionPosition == 'outer');

    return cs;
  }

  getStyle(){
    let style = super.getStyle();
    style.justifyContent = 'flex-start';

    return style;
  }

  render(){
    let newChildren = React.Children.map(this.props.children, function(child) {

      let newProps = Object.assign( {
        width: (100/this.props.columns*child.props.scale)+'%',
        image: this.props.defaultImage,
        height: this.props.tileHeight,
        actionPosition: this.props.actionPosition,
        header: this.props.header,
        footer: this.props.footer,
        actionBackground: this.props.actionBackground,
      }, child.props); //The props should be overridden by the GridTile element

      return React.cloneElement(child, newProps );
    }.bind(this));

    return super.render(newChildren);
  }

}
