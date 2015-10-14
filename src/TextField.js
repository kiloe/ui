import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({


});


export default class TextField extends View {

  static propTypes = {
    ...View.propTypes,

    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    name: React.PropTypes.string,
    multiLine: React.PropTypes.bool,
    type: React.PropTypes.string,
    rows: React.PropTypes.number,
    maxRows: React.PropTypes.number,
    //html's maxlength
    maxlength: React.PropTypes.number,
    required: React.PropTypes.bool,
    icon: React.PropTypes.oneOfType([
      React.PropTypes.element,
      React.PropTypes.func,
    ]),
  }

  static defaultProps = {
    ...View.defaultProps,
    value: '',
    placeholder: '',
    multiLine: false,
    type: 'text',
    rows: 1,
    required: false,
  }

  constructor(...args){
    super(...args);
    this.state = this.state || {};
    this.state.value = '';
  }

  componentDidMount(){
    this.setState({ value: this.props.value });
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.textField = true;
    return cs;
  }

  getStyle(){
    let style = super.getStyle();
    return style;
  }

  // getIcon returns the icon as an element or undefined if no icon prop
  getIcon(){
    if( !this.props.icon ){
      return;
    }
    let props = {
      key:'icon',
      size:'intrinsic',
      outline: this.props.outline,
      color: this.getTextColor(),
    };
    if( this.props.icon instanceof Function ){
      let Icon = this.props.icon;
      return <Icon {...props} />;
    }
    return React.cloneElement(this.props.icon, props);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render(){
    let children = [];

    if( this.props.icon ){
      children.push(this.getIcon());
    }

    children.push(
      <input
        value={this.state.value}
        placeholder={this.props.placeholder}
        name={this.props.name}
        type={this.props.type}
        required={this.props.required}
        maxLength={this.props.maxlength}
        onChange={this.handleChange}
        disabled={this.props.disabled}
      />
      );

    return super.render(children);

  }
}
