import React from 'react';
import Modal from './Modal';
import View from './View';

// Dialog is just a slighlty more convient way of using Modal.
// Dialogs are always raised and padded
// Dialogs have shade by default
export default class Dialog extends Modal {

  static propTypes = {
    ...Modal.propTypes,
    // add default dialog padding
    pad: React.PropTypes.bool,
  }

  static defaultProps = {
    ...Modal.defaultProps,
    relative: false,
    shade: true,
  }

  getChildren(){
    return this.props.children;
  }

  getContent(){
    let style = {};
    if( this.props.pad ){
      style.padding = '2rem';
    }
    return (
      <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <View layer={0} style={style}>
          {this.getChildren()}
        </View>
      </div>
    );
  }

}
