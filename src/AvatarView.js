import React from 'react';
import View from './View';
import ImageView from './ImageView';

export default class AvatarView extends ImageView {

  static propTypes = {
    ...View.propTypes,
    avatar: React.PropTypes.bool,
  }

  static defaultProps = {
    ...View.defaultProps,
    size: 3.5,
  }

  static styles = {
    ...ImageView.styles,
    '.avatar img': {
      borderRadius: '50%',
    }
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.avatar = true;
    return cs;
  }

  getStyle(){
    let style = super.getStyle();

    //style.width = this.getSize()+'rem';
    //style.height = this.getSize()+'rem';



    return style;
  }



}
