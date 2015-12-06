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

    image: React.PropTypes.string,
    header: React.PropTypes.bool,
    footer: React.PropTypes.bool,
    actionPosition: React.PropTypes.oneOf(['inner','outer']),
    actionBackground: React.PropTypes.string,
    width: React.PropTypes.string,
    height: React.PropTypes.string,
    colspan: React.PropTypes.number, // XXX: might change the name of this


  }

  static defaultProps = {
    ...View.defaultProps,

    colspan: 1,
    //actionPosition: 'inner',
    //spacing: 1,
  }

  getStyle(){
    let style = super.getStyle();
    style.flexBasis = this.props.width;
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
    let contentStyle = {};
    let actionStyle = {};
    contentStyle.backgroundImage = 'url(' + this.props.image + ')';
    contentStyle.height = this.props.height;
    actionStyle.background = this.props.actionBackground;


    let newChildren = React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, { transparent: true } );
    }.bind(this));


    children.push( <div className="tile-content" style={contentStyle}></div> );
    children.push( <div className="tile-action" style={actionStyle}>{ newChildren }</div> );

    return super.render(children);
  }

}
