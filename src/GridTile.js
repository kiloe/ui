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
    position: 'relative',
  },
  '.gridtile.header .tile-content > *, .gridtile.footer .tile-content > *': {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  '.gridtile.header .tile-content > *': {
    top: '0px',
  },
  '.gridtile.footer .tile-content > *': {
    bottom: '0px',
  },



});

export default class GridTile extends View {

  static propTypes = {
    ...View.propTypes,

    image: React.PropTypes.string,
    header: React.PropTypes.bool,
    footer: React.PropTypes.bool,
    actionPosition: React.PropTypes.oneOf(['inner','outer']),
    width: React.PropTypes.string,
    height: React.PropTypes.string,


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
    cs.header = this.props.header;
    cs.footer = this.props.footer;

    return cs;
  }



  render(){
    let children = [];
    let style = {};
    style.backgroundImage = 'url(' + this.props.image + ')';

    children.push( <div className="tile-content" style={style}><div>{ this.props.children }</div></div> );

    return super.render(children);
  }

}
