import React from 'react';
import Modal from './Modal';
import View from './View';

// Dialog is just a slighlty more convient way of using Modal.
// Dialogs are always raised and padded
// Dialogs have shade by default
export default class Dialog extends Modal {

  static propTypes = {
    ...Modal.propTypes,
  }

  static defaultProps = {
    ...Modal.defaultProps,
    relative: false,
    shade: true,
  }

  getContent(){
    let style = {};
    style.padding = '1.5rem';
    return (
      <View raised={2} style={style}>
        {this.props.children}
      </View>
    );
  }

}
