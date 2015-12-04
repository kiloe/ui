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
    //alignItems: 'stretch',
    //alignContent: 'stretch',
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

    columns: React.PropTypes.number,
    //children: React.PropTypes.arrayOf(React.PropTypes.instanceOf(GridTile)),
    actionPosition: React.PropTypes.oneOf(['inner','outer']),
    tileHeight: React.PropTypes.string,
    padding: React.PropTypes.oneOf(['thin','thick']),
    defaultImage: React.PropTypes.string,
    header: React.PropTypes.bool,
    footer: React.PropTypes.bool,

  }

  static defaultProps = {
    ...List.defaultProps,
    columns: 1,
    row: true,
    scroll: false,
    padding: 'thin',
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
        width: (100/this.props.columns)+'%',
        image: this.props.defaultImage,
        height: this.props.tileHeight,
        actionPosition: this.props.actionPosition,
        header: this.props.header,
        footer: this.props.footer,
      }, child.props); //The props should be overridden by the GridTile element

      return React.cloneElement(child, newProps );
    }.bind(this));

    return super.render(newChildren);
  }

}
