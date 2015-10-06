import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
  '.progress': {
    position: 'relative',
  },
  '.progress *': {
    position: 'absolute',
    height: '100%',
    top: '0',
    left: '0',
  },
  '.progress .bufferBG': {
    opacity: '0.3',
    width: '100%',
  },
  '.progress .progressBG, .progress .bufferBar': {
    opacity: '0.3',
    width: '100%',
  },
  '.progress .progressBar': {
  }
});

export default class Progress extends View {

  static propTypes = {
    ...View.propTypes,

    value: React.PropTypes.number,
    max: React.PropTypes.number,
    buffer: React.PropTypes.number,
  }

  static defaultProps = {
    ...View.defaultProps,
    value: 0,
    max: 100,
  }



  getClassNames(){
    let cs = super.getClassNames();
    cs.progress = true;
    return cs;
  }


  getStyle(){
    let style = super.getStyle();
    style.backgroundColor = 'transparent';
    return style;
  }

  render(){
  
    let w = Math.max( 0, Math.min( this.props.value / this.props.max * 100, 100 ) );
    let buffer = Math.max( 0, Math.min( this.props.buffer, 100 ) );

    let barStyle = {
      backgroundColor: this.getBackgroundColor(),
      width: w+'%',
    };
    let backgroundStyle = {
      backgroundColor: this.getBackgroundColor(),
    };
    
    let bufferStyle = {};
    if ( this.props.buffer ) {
      backgroundStyle = {
        backgroundColor: 'white',
      };
      bufferStyle = {
        backgroundColor: this.getBackgroundColor(),
        width: buffer+'%',
      };
    }
    
    let children = [];
    if ( this.props.buffer ) {
      children.push( <span style={backgroundStyle} className="bufferBG" key="bufferBG"></span> );
      children.push( <span style={bufferStyle} className="bufferBar" key="bufferBar"></span> );
    }
    else children.push( <span style={backgroundStyle} className="progressBG" key="progressBG"></span> );
    
    children.push( <span style={barStyle} className="progressBar" key="progressBar"></span> );
    
    return super.render(children);

  }
}
