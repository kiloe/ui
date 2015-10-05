import React from 'react';

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

  render(){
    if( this.state.content ){
      return this.props.content;
    }
    return <span></span>;
  }

}
