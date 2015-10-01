import React from 'react';
import View from './View';


export default class DividerView extends View {

  static defaultProps = {
    ...View.defaultProps,
    divider: true,
  }

}
