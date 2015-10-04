import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
  '.view.icon': {
    position: 'relative',
    alignItems: 'center',
  }
});

export default class Icon extends View {

  getBackgroundColor(){
    return 'transparent';
  }

  constructor(...args){
    super(...args);
    this.state = {active:false};
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.icon = true;
    return cs;
  }

  getSVG(){
    throw new Error('Icon cannot be used directly... require something from ./icons');
  }

  // getSize of the icon to display. Unless overrided by size prop
  // icon size is determined by container size and scale
  getSize(){
    // user set fixed size
    let size = super.getSize();
    if( typeof size == 'number' ){
      return size * this.getScale();
    }
    // The 'intrinsic' size of an icon is to maintain the aspect ratio
    // of the cross-axis ie. if container's height=10 then icon's width=10
    if( this.props.size == 'intrinsic' ){
      let parent = this.getParent();
      if( parent ){
        let parentSize = parent.getSize();
        if( typeof parentSize == 'number' ){
          return parentSize;
        }
      }
    }
    return 1.6 * this.getScale();
  }


  render(){
    let svg = React.cloneElement(this.getSVG(),{
      red: 'icon',
      style: {
        fill: this.getTextColor(),
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
      },
      width: '100%',
      height: '100%',
    });
    return super.render(svg);
  }

}
