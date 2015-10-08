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

  // render(){
  //   return super.render(
  //     <View size="intrinsic">{this.props.children}</View>
  //   );
  // }
}
