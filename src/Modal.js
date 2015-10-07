import React from 'react';
import View from './View';

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
    if( this.state.content ){
      return (
        <View layer={0} raised={3} size="intrinsic">{this.state.content}</View>
      );
    }
    return <span></span>;
  }

}
