import React from 'react';
import MenuItem from './MenuItem';
import SelectItem from './SelectItem';
import CSS from './utils/css';
import Text from './Text';
import BoolField from './BoolField';

CSS.register({
  '.select .alt': {
    transform: 'scaleY(0.6)',
  },
  '.select.closed > .menuitem': {
  },
  '.select.open': {
  },
});

// A select field is basically a Text area with a Menu on top
export default class Select extends MenuItem {

  static propTypes = {
    ...MenuItem.propTypes,
    // options sets the available option values for the select list.
    // it takes several common formats but the general common form is:
    // [{key:x1, value:y1},{key:x2,value:y2},...]
    options: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.arrayOf(React.PropTypes.string),
      React.PropTypes.arrayOf(React.PropTypes.shape({
        key: React.PropTypes.string.isRequired,
        value: React.PropTypes.any.isRequired,
      })),
      React.PropTypes.arrayOf(React.PropTypes.shape({
        group: React.PropTypes.string.isRequired,
        options: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.arrayOf(React.PropTypes.string),
          React.PropTypes.arrayOf(React.PropTypes.shape({
            key: React.PropTypes.string.isRequired,
            value: React.PropTypes.any.isRequired,
          })),
        ]),
      })),
      React.PropTypes.object,
    ]),
    // radio renders the options as radio buttons rather than a dropdown
    radio: React.PropTypes.bool,
  }

  static defaultProps = {
    ...MenuItem.defaultProps,
    divider: true,
    tip: '▼',
  }

  constructor(...args){
    super(...args);
    this.state = this.state || {};
    this.state.selected = this.getInitialValue();
  }

  componentWillReceiveProps(nextProps){
    this.state.selected = this.getInitialValue(nextProps);
  }

  gotSelectedRef(ref){
    this._selected = ref;
    if( !this._selected ){
      return;
    }
    if( this._menu ){
      this.gotSelectedAndMenuRefs();
    }
  }

  gotMenuRef(ref){
    this._menu = ref;
    if( !this._menu ){
      return;
    }
    if( this._selected ){
      this.gotSelectedAndMenuRefs();
    }
  }

  getOptionCount(){
    return this.getOptionData().reduce((n,group) => {
      return n + group.options.length;
    },0);
  }

  gotSelectedAndMenuRefs(){
    // If the list is really long then shift it around so that it fits on the
    // screen with the selected item under the position.
    //
    // XXX: this entire thing is basically wrong and needs alot of work...
    //
    if( this.getOptionCount() > 10 ){
      setTimeout(() => {
        // shift menu so that the selected item is directly over the selectbox
        let modal = this._menu.refs.view.parentNode.parentNode;
        let selectedNode = this._selected.refs.view;
        let scroll = this.getScrollParent().refs.view;
        let viewableHeight = scroll.offsetHeight - 40;
        let modalHeight = modal.offsetHeight;
        if( modalHeight > viewableHeight ){
          modalHeight = viewableHeight;
          this._menu.refs.view.parentNode.style.height = (modalHeight) + 'px';
          this._menu.refs.view.style.overflow = 'auto';
        }
        let shiftY = (modal.offsetTop + modalHeight) - (scroll.scrollTop + viewableHeight);
        if( shiftY > 0 ){
          modal.style.top = (modal.offsetTop - shiftY + 20) + 'px';
          modal.style.overflowY = 'scroll';
          modal.style.margin = '4px'; // keep raise
        }
        setTimeout(() => {
          modal.scrollTop = selectedNode.offsetTop - shiftY;
        },1);
      },1);
    }
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
    this.setState({selected: opt});
  }

  // normalize options input to:
  // [{group:"name", options:[{key:x,value:y},...]}]
  getOptionData(){
    let data = this.props.options;
    if( typeof data == 'string' ){
      data = data.split(/,/).map(s => s.trim());
    }
    let groups = [];
    let objectMapper = function(o){
      return (k) => { return {key:k, value:o[k]}; };
    };
    let normalizeOption = function(option){
      if( typeof option == 'string' ){
        return {key:option, value:option};
      }
      if( option.key && !option.value ){
        throw new Error('option with key but no value');
      }
      if( option.value && !option.key ){
        throw new Error('option with value but no key');
      }
      return option;
    };
    // map simple objects to key/values if required
    let normalizeOptions = function(options){
      if( Array.isArray(options) ){
        return options.map(normalizeOption);
      }
      return Object.keys(options).map(objectMapper(options));
    };
    // Handle arrays of groups and arrays of values
    let defaultGroup = {group:'default', options:[]};
    if( Array.isArray(data) ){
      data.forEach(opt => {
        if( opt.group ){
          groups.push({
            group: opt.group,
            options: normalizeOptions(opt.options),
          });
        } else {
          defaultGroup.options.push(normalizeOption(opt));
        }
      });
      if( defaultGroup.options.length > 0 ){
        groups.push(defaultGroup);
      }
    // handle simple objects
    } else {
      defaultGroup.options = normalizeOptions(data);
      groups.push(defaultGroup);
    }
    return groups;
  }

  getInitialValue(nextProps){
    let v = (this.props || nextProps || {}).value;
    if( typeof v == 'string' ){
      v = {key:v, value:v};
    }
    return v;
  }

  // return the currently selected value
  getValue(){
    if( typeof this.state.selected == 'undefined' || this.state.selected === null ){
      return null;
    }
    return this.state.selected.value;
  }

  getItems(){
    let selectedValue = null;
    if( this.state.selected && typeof this.state.selected.value != 'undefined' ){
      selectedValue = this.state.selected.value;
    }
    let items = [];
    let data = this.getOptionData();
    let grouped = data.length > 1;
    let Item = this.props.radio ? BoolField : SelectItem;
    if( !this.props.required ){
      items.push(<Item
        key="__none"
        checked={selectedValue === null}
        label="None"
        onClick={this.select.bind(this,undefined)}
        radio={this.props.radio}
      />);
    }
    for( let group of data ){
      if( grouped ){
        items.push(<Text key={group.group} subtle pad>{group.group}</Text>);
      }
      for( let opt of group.options ){
        let checked = selectedValue == opt.value;
        items.push(<Item
          key={opt.key}
          ref={checked ? this.gotSelectedRef.bind(this) : undefined}
          checked={checked}
          label={opt.key}
          onClick={this.select.bind(this,opt)}
          radio={this.props.radio}
        />);
      }
    }
    return items;
  }

  getMenu(){
    this._menu = null;
    this._selected = null;
    return (
      <Menu parent={this} ref={this.gotMenuRef.bind(this)}>
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
    return true;
  }

  getTip(){
    return this.props.tip;
  }

  isRow(){
    if( this.props.radio ){
      if( this.props.row === true ){
        return true;
      }
      return false;
    }
    return true;
  }

  getContent(){
    if( this.props.radio ){
      return this.getItems();
    }
    return super.getContent();
  }

}

