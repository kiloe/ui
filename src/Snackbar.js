import React from 'react';
import Modal from './Modal';
import View from './View';
import CSS from './utils/css';


CSS.register({
  '.modal.snackbar .inner': {
    animationName: 'modalSlideUp',
    backgroundColor: '#323232',
    color: 'rgba(255,255,255,0.85)',
    position: 'absolute',
    bottom: '0px',
  },
  '.modal.snackbar .inner > div': {
    margin: '14px 24px',
  },
  '.modal.snackbar.fullWidth .inner': {
    left: '0px',
    width: '100%',
  },
  '.modal.snackbar.floating .inner': {
    minWidth: '288px',
    maxWidth: '568px',
  },
  
});

export default class Snackbar extends Modal {

  static propTypes = {
    ...Modal.propTypes,
    text: React.PropTypes.string,
    actionText: React.PropTypes.string,
    action: React.PropTypes.func,
    
  }

  static defaultProps = {
    ...Modal.defaultProps,
    relative: false,
    shade: false,
  }

  getChildren(){
    return this.props.children;
  }
  

  getClassNames(){
    let cs = super.getClassNames();
    cs.snackbar = true;
    if ( this.props.size == 'fill' ) cs.fullWidth = true;
    else cs.floating = true;
    return cs;
  }

  
  getContent(){
    let style = {};
    let action = '';
    if ( this.props.actionText && this.props.action ) action = ( <Text className="action" accent align="right" onClick={this.props.action}>{this.props.actionText.toUpperCase()}</Text> );
    return (
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>{this.props.text}</div> {action}
      </div>
    );
  }

}
