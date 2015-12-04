import React from 'react';
import CSS from './utils/css';
import View from './View';
import ListItem from './ListItem';

CSS.register({

  '.gridtile': {
    margin: '0',
    flexDirection: 'row',
    display: 'flex',
    flexGrow: '0',
  },
  '.gridtile .tile-content': {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

});

export default class GridTile extends View {

  static propTypes = {
    ...View.propTypes,

    image: React.PropTypes.string,
    header: React.PropTypes.instanceOf(ListItem),
    footer: React.PropTypes.instanceOf(ListItem),
    actionPosition: React.PropTypes.oneOf(['inner','outer']),
    width: React.PropTypes.string,
    height: React.PropTypes.string,
    //spacing: React.PropTypes.number,


  }

  static defaultProps = {
    ...View.defaultProps,

    //actionPosition: 'inner',
    //spacing: 1,
  }

  getStyle(){
    let style = super.getStyle();
    style.flexBasis = this.props.width;
    style.height = this.props.height;
    //style.backgroundImage = 'url(' + this.props.image + ')';
    style.justifyContent = 'flex-start';
   // style.margin = '-' + (this.props.spacing||1) + 'px';
    //style.border = (this.props.spacing||1) + 'px solid white';

    return style;
  }


  getClassNames(){
    let cs = super.getClassNames();
    cs.gridtile = true;

    return cs;
  }



  render(){
    let children = [];
    let style = {};
    style.backgroundImage = 'url(' + this.props.image + ')';
    //style.padding = (this.props.spacing||1)/2 + 'px';
    //style.margin = (this.props.spacing||1)/2 + 'px';

    children.push( <div className="tile-content" style={style} /> );

    return super.render(children);
  }

}
