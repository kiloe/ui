import React from 'react';
import CSS from './utils/css';
import viewport from './utils/viewport';

CSS.register({
  '.tiptext': {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 9999,
    textAlign: 'center',
    overflow: 'visible',
  },
  '.tiptext > div': {
    position:'relative',
    whiteSpace: 'nowrap', // XXX: should allow multi line really
    padding: '0.5rem',
    overflow: 'hidden',
    margin: '0 50% 0 -50%',
    animationDuration: '300ms',
    animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
    animationFillMode: 'forwards',
    transformOrigin: 'top center',
  },
  '.tiptext.on > div': {
    animationName: 'tipgrow',
  },
  '@keyframes tipgrow': `
    0% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  `,
  '.tiptext.off > div': {
    animationName: 'tipshrink',
  },
  '@keyframes tipshrink': `
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0);
    }
  `,
});

export default class Tooltip extends React.Component {

  constructor(...args){
    super(...args);
    this.state = {};
  }

  show(label, pos, theme){
    this.clearHideTimer();
    this.setState({
      active: true,
      label: label,
      top: pos.top,
      bottom: pos.bottom,
      left:pos.left,
      right:pos.left,
      width:pos.width,
      theme: theme,
    });
    this.visible = true;
  }

  hide(){
    if( !this.visible ){
      return;
    }
    this.clearHideTimer();
    this.setState({active:false});
    this.visible = false;
  }

  hideSoon(){
    if( !this.visible ){
      return;
    }
    this.clearHideTimer();
    this.hideTimeout = setTimeout(this.hide.bind(this), 500);
  }

  clearHideTimer(){
    clearInterval(this.hideTimeout);
    this.hideTimeout = null;
  }

  render(){
    let style = {};
    let instyle = {};
    let cs = 'tiptext';
    if( this.state.theme ){
      let theme = this.state.theme;
      let mode = theme.getMode();
      let black = 'rgba(0,0,0,0.6)';
      let white = 'rgba(255,255,255,0.8)';
      style.fontSize = '1rem';
      style.lineHeight = '1.5rem';
      let lineHeightInPx = theme.getBaseFontSize() * 1.5;
      if( typeof this.state.top != 'undefined' ){
        style.top = this.state.bottom;
        style.left = this.state.left + (this.state.width / 2);
        // prevent it falling of the screen to the right
        if( style.left + this.state.width > viewport.getWidth() ){
          style.left = viewport.getWidth() - this.state.width;
        }
        // prevent it falling of the screen to the left
        if( style.left < 0 ){
          style.left = 0;
        }
        if( style.top + lineHeightInPx > viewport.getHeight() ){
          style.top = style.top - (viewport.getHeight() - style.top);
        }
      }
      instyle.backgroundColor = mode == 'light' ? black : white;
      instyle.color = mode == 'light' ? white : black;
    }
    let txt;
    if( this.state.label ){
      txt = this.state.label;
    }
    if( this.state.active ){
      style.opacity = '1';
      style.width = 'auto';
      style.height = 'auto';
      instyle.opacity = '1';
      cs += ' on';
    }else{
      cs += ' off';
    }
    return (
        <div className={cs} style={style}>
          <div style={instyle}>{txt}</div>
        </div>
    );
  }

}
