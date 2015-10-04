import React from 'react';
import View from './View';


export default class Divider extends View {

  static defaultProps = {
    ...View.defaultProps,
    divider: true,
  }

}
