import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
  // make modals float in the center
  '.modal': {
    display: 'none',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});

// Modal is component used by the root-view to render a global View
// that overlays the root-view.
export default class Modal extends React.Component {

  constructor(...args){
    super(...args);
    this.state = {};
  }

  setContent(el){
    this.setState({content: el});
  }

  clearContent(){
    if( this.state.content ){
      this.setState({content:null});
    }
  }

  onClickOutside(){

  }

  render(){
    let style = {};
    let modal;
    if( this.state.content ){
      style.display = 'flex';
      modal = <View layer={0} raised={3} size="intrinsic">{this.state.content}</View>;
    }
    return (
      <div className="modal" style={style}>{modal}</div>
    );
  }

}
