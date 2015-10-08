import React from 'react';
import Button from './Button';
import CSS from './utils/css';
import Icon from './Icon';
import CheckIcon from './icons/CheckIcon';

CSS.register({
  '.button.menuitem': {
    textTransform: 'none',
  },
  '.button.menuitem > .text': {
    padding: '1rem',
  },
  '.button.menuitem > .icon': {
    marginLeft: '0.5rem',
  },
  '.button.menuitem > .alt': {
    alignSelf: 'center',
    marginLeft: '3rem',
  },
});

export default class MenuItem extends Button {

  static propTypes = {
    ...Button.propTypes,
    // checked shows this item as a selectable items with a checkmark icon.
    // checked can be one of three states
    //   checked=undefined: item is not a selectable thing
    //   checked=true: Show as selected
    //   checked=false: Show as unselected
    checked: React.PropTypes.bool,
  }

  static defaultProps = {
    ...Button.defaultProps,
    align: 'left',
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.menuitem = true;
    return cs;
  }

  hasSubMenu(){
    return React.Children.count(this.props.children) > 0;
  }

  getMouseEnterHandler(){
    if( this.hasSubMenu() ){
      return this.expand.bind(this);
    }
    return;
  }

  getMouseLeaveHandler(){
    if( this.hasSubMenu() ){
      return this.contract.bind(this);
    }
    return;
  }

  // expand open the sub level of menu items
  expand(){
    // let menu = <Menu>
    //   {this.props.children}
    // </Menu>;
  }

  // contract closes the sub level of menu items
  contract(){

  }

  hasIcon(){
    if( typeof this.props.checked != 'undefined' ){
      return true;
    }
    return super.hasIcon();
  }

  getIcon(){
    if( typeof this.props.checked != 'undefined' ){
      return this.props.checked ?
        CheckIcon : // show tick state
        Icon;       // use Icon base class as a blank
    }
    return super.getIcon();
  }

  hasTip(){
    if( this.hasSubMenu() ){
      return true;
    }
    return super.hasTip();
  }

  getTip(){
    if( this.hasSubMenu() ){
      return `▶`;
    }
    return super.getTip();
  }

  getTipContent(){
    let tip = this.getTip();
    return <Text subtle scale={1} key="tip" className="alt">{tip}</Text>;
  }


  getContent(){
    let children = super.getContent();
    if( this.hasTip() ){
      children.push(this.getTipContent());
    }
    return children;
  }

}
