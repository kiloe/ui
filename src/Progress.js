import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
  '.progress': {
    position: 'relative',
  },
  '.progress .progressBG': {
    position: 'absolute',
    opacity: '0.3',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
  },
  '.progress .progressBar': {
    position: 'absolute',
    height: '100%',
    top: '0',
    left: '0',
  }
});

export default class Progress extends View {

  static propTypes = {
    ...View.propTypes,

    value: React.PropTypes.number,
    max: React.PropTypes.number,
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

    let barStyle = {
      backgroundColor: this.getBackgroundColor(),
      width: w+'%',
    };
    let backgroundStyle = {
      backgroundColor: this.getBackgroundColor(), // this.getThemeMode() == 'light' ? -5 : 5 ),
    };
    let children = [];
    children.push( <span style={backgroundStyle} className="progressBG" key="progressBG"></span> );
    children.push( <span style={barStyle} className="progressBar" key="progressBar"></span> );
    
    return super.render(children);

  }
}
