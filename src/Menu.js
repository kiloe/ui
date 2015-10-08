import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
  '.menu': {
    alignSelf: 'center',
  },
});

export default class Menu extends View {

  static propTypes = {
    ...View.propTypes,
    style: React.PropTypes.object,
  }

  static defaultProps = {
    ...View.defaultProps,
    raised: true,
    size: 'intrinsic',
    theme: {mode: 'light'},
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.menu = true;
    return cs;
  }

  getStyle(){
    let style = super.getStyle();
    style.position = 'static'; // XXX: I have no idea why this is needed, but without it menus dont work in modals!?!
    return style;
  }

  // render(){
  //   return super.render(
  //     <View size="intrinsic">{this.props.children}</View>
  //   );
  // }
}
