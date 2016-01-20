import React from 'react';
import Dialog from './Dialog';
import CSS from './utils/css';

CSS.register({
  '.picker .view.text .content': {
    textOverflow: 'clip',
  },
});

// Picker is the base class / API for Pickers.
// Pickers are modal dialogs for selecting a single value.
// A Picker can be assigned to a form Input to be used in place of the default entry method.
export default class Picker extends Dialog {

  static propTypes = {
    ...Dialog.propTypes,
    onSelected: React.PropTypes.func,
    onCancel: React.PropTypes.func,
  }

  static defaultProps = {
    ...Dialog.defaultProps,
    id: 'picker',
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.picker = true;
    return cs;
  }
  onClickOutside = () => {
    this.onCancel();
  }

  onCancel = () => {
    console.log('extend me');
  }


}
