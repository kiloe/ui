import React from 'react';
import MenuItem from './MenuItem';
import SelectItem from './SelectItem';
import CSS from './utils/css';
import Text from './Text';

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
    ])
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
    let selectedValue = this.state.selected && this.state.selected.value;
    let items = [];
    let data = this.getOptionData();
    let grouped = data.length > 1;
    if( !this.props.required ){
      items.push(<SelectItem
        key="__none"
        checked={!selectedValue}
        label="None"
        onClick={this.select.bind(this,undefined)}
      />);
    }
    for( let group of data ){
      if( grouped ){
        items.push(<Text key={group.group} subtle pad>{group.group}</Text>);
      }
      for( let opt of group.options ){
        let checked = selectedValue == opt.value;
        items.push(<SelectItem
          key={opt.key}
          checked={checked}
          label={opt.key}
          onClick={this.select.bind(this,opt)}
        />);
      }
    }
    return items;
  }

  getMenu(){
    return (
      <Menu parent={this}>
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

}

