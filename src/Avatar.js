import React from 'react';
import View from './View';
import Image from './Image';
import CSS from './utils/css';

CSS.register({
  '.avatar img': {
    borderRadius: '50%',
  },
  '.listItem .avatar': {
    alignSelf: 'flex-start',
  }
});

export default class Avatar extends Image {

  static propTypes = {
    ...View.propTypes,
    avatar: React.PropTypes.bool,
  }

  static defaultProps = {
    ...View.defaultProps,
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.avatar = true;
    return cs;
  }

  getSize(){
    let size = super.getSize() || 3.5;
    return size * this.getScale();
  }

  getStyle(){
    let style = super.getStyle();

    // I just put these back in as Avatars were broken in Chrome. Not sure why.
    style.width = this.getSize()+'rem';
    style.height = this.getSize()+'rem';



    return style;
  }



}
