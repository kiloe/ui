import React from 'react';
import Button from './Button';
import CSS from './utils/css';
import Icon from './Icon';
import CheckIcon from './icons/CheckIcon';
import Menu from './Menu';

CSS.register({
  '.button.menuitem': {
    textTransform: 'none',
    height: '4rem', // XXX: trying to sort height in Firefox
  },
  '.button.menuitem > .text': {
    padding: '1rem',
    whiteSpace: 'nowrap',
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
    // parent is the parent menuitem
    parent: React.PropTypes.object,
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

  hasMenu(){
    if( React.Children.count(this.props.children) > 0 ){
      return true;
    }
    return super.hasMenu();
  }

  getMenu(){
    if( React.Children.count(this.props.children) > 0 ){
      return <Menu parent={this}>
        {React.Children.map(this.props.children, (item) => {
          return React.cloneElement(item, {parent: this});
        })}
      </Menu>;
    }
  }

  getClickHandler(){
    if( this.hasMenu() ){
      return this.toggleCascadingMenu;
    }
    if( this.props.onClick ){
      return this.props.onClick;
    }
    return this.toggleCascadingMenu;
  }

  toggleCascadingMenu = (e) => {
    this.toggleMenu(e);
    if( this.props.onClick ){
      this.props.onClick(e);
    }
  }

  getMenuConfig(){
    return {
      obscure: false,
      direction: 'right',
    };
  }

  getMouseEnterHandler(){
    // if( this.hasMenu() ){
    // }
    return;
  }

  getMouseLeaveHandler(){
    // if( this.hasMenu() ){
    // }
    return;
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
    if( this.hasMenu() ){
      return true;
    }
    return super.hasTip();
  }

  getTip(){
    if( this.hasMenu() ){
      return <div style={{transform:'scaleX(0.6)'}}>▶</div>;
    }
    return super.getTip();
  }

  getTipContent(){
    let tip = this.getTip();
    let style = {
      fontSize: (this.getFontSize() * 0.85) + 'rem',
    };
    return <Text subtle style={style} key="tip" className="alt">{tip}</Text>;
  }


  getContent(){
    let children = super.getContent();
    if( this.hasTip() ){
      children.push(this.getTipContent());
    }
    return children;
  }

}
