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
  },
  '.progress .bufferBG': {
    opacity: '0.3',
    width: '100%',
    right: '0',
    WebkitMask: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+Cjxzdmcgd2lkdGg9IjEyIiBoZWlnaHQ9IjQiIHZpZXdQb3J0PSIwIDAgMTIgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxlbGxpcHNlIGN4PSIyIiBjeT0iMiIgcng9IjIiIHJ5PSIyIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiBmcm9tPSIyIiB0bz0iLTEwIiBkdXI9IjAuNnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogIDwvZWxsaXBzZT4KICA8ZWxsaXBzZSBjeD0iMTQiIGN5PSIyIiByeD0iMiIgcnk9IjIiIGNsYXNzPSJsb2FkZXIiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3giIGZyb209IjE0IiB0bz0iMiIgZHVyPSIwLjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4KICA8L2VsbGlwc2U+Cjwvc3ZnPgo=")',
    mask: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+Cjxzdmcgd2lkdGg9IjEyIiBoZWlnaHQ9IjQiIHZpZXdQb3J0PSIwIDAgMTIgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxlbGxpcHNlIGN4PSIyIiBjeT0iMiIgcng9IjIiIHJ5PSIyIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiBmcm9tPSIyIiB0bz0iLTEwIiBkdXI9IjAuNnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogIDwvZWxsaXBzZT4KICA8ZWxsaXBzZSBjeD0iMTQiIGN5PSIyIiByeD0iMiIgcnk9IjIiIGNsYXNzPSJsb2FkZXIiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3giIGZyb209IjE0IiB0bz0iMiIgZHVyPSIwLjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4KICA8L2VsbGlwc2U+Cjwvc3ZnPgo=")',
    WebkitMaskRepeat: 'repeat-x',
    maskRepeat: 'repeat-x',
  },
  '.progress .progressBG, .progress .bufferBar': {
    opacity: '0.3',
    width: '100%',
    left: '0',
  },
  '.progress .progressBar': {
    left: '0',
  },
});

export default class Progress extends View {

  static propTypes = {
    ...View.propTypes,

    // Value of the progress, between 0 and max
    value: React.PropTypes.number,
    // The maximum value (default: 100)
    max: React.PropTypes.number,
    // Buffer progress, between 0 and max
    // XXX: Is there a time when having it based on max (rather than just a 0-100%) will be annoying?
    buffer: React.PropTypes.number,
  }

  static defaultProps = {
    ...View.defaultProps,
    value: 0,
    max: 100,
    buffer: 0,
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
    let buffer = Math.max( 0, Math.min( this.props.buffer / this.props.max * 100, 100 ) );

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
        backgroundColor: this.getBackgroundColor(),
        width: (100-buffer)+'%',
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
