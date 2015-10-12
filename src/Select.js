import React from 'react';
import MenuItem from './MenuItem';
import CSS from './utils/css';

CSS.register({
  '.select': {
  },
  '.select.closed > .menuitem': {
  },
  '.select.open': {
  },
});

// A select field is basically a Text area with a Menu on top
export default class Select extends MenuItem {

  static defaultProps = {
    ...MenuItem.defaultProps,
    options: React.PropTypes.arrayOf(React.PropTypes.shape({
      key: React.PropTypes.string.isRequired,
      value: React.PropTypes.string.isRequired,
    })),
  }

  constructor(...args){
    super(...args);
    this.state.selected = null;
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.select = true;
    if( this.state.open ){
      cs.open = true;
    } else {
      cs.closed = true;
    }
    return cs;
  }

  toggleOpen(){
    this.setState({
      open: !this.state.open,
    });
  }

  select(opt){
    this.menu.pop();
    this.setState({selected: opt}, () => {
      // this.menu.forceUpdate();
      // this.showMenu();
    });
  }

  // normalize options input
  // [{key:x,value:y},...]
  getOptionsArray(){
    let opts = this.props.options;
    return Object.keys(opts).map((k) => {
      return {key:k, value:opts[k]};
    });
  }

  getItems(){
    let selectedKey = this.state.selected && this.state.selected.key;
    return this.getOptionsArray().map((opt) => {
      let checked = selectedKey == opt.key;
      return <SelectItem
        key={opt.key}
        checked={checked}
        label={opt.key}
        onClick={this.select.bind(this,opt)}
      />;
    });
  }

  getMenu(){
    return (
      <Menu>
        {this.getItems()}
      </Menu>
    );
  }

  getMenuConfig(){
    return {
      obscure: true,
      direction: 'bottom',
    };
  }

  getLabel(){
    if( this.state.selected ){
      return this.state.selected.key;
    }
    return this.props.placeholder || 'Choose...';
  }

  hasLabel(){
    return true;
  }

  hasMenu(){
    return true;
  }

  hasTip(){
    return false;
  }

}

