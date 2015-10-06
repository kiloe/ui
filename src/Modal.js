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
      let props = {
        row: false,
        theme: {mode:'transparent'},
        style: {
          position: 'absolute',
          top:0,
          left:0,
          right:0,
          bottom:0,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '5rem',
          ...this.props.style,
        }
      };
      return <View {...props}>
        <View layer={0} raised={3} theme={{mode:'light'}} size="intrinsic">{this.state.content}</View>
      </View>;
    }
    return <span></span>;
  }

}
