import React from 'react';
import Text from './Text';
import CSS from './utils/css';

CSS.register({
});

// Title is a Text block for headings
// If you like this, you may also like: Subheading, Headline, Display
export default class Title extends Text {

  static scale = 1.4;

  getClassNames(){
    let cs = super.getClassNames();
    cs.title = true;
    return cs;
  }

  getScale(){
    let scale = super.getScale();
    return this.constructor.scale * scale;
  }

}

