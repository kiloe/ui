import React from 'react';
import MenuItem from './MenuItem';
import CSS from './utils/css';

CSS.register({
});

export default class SelectItem extends MenuItem {

  static propTypes = {
    ...MenuItem.propTypes,
    checked: React.PropTypes.bool,
  }

}
