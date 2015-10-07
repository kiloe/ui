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
    multiLine: React.PropTypes.bool,
    type: React.PropTypes.string,
    rows: React.PropTypes.number,
    //html's maxlength
    maxlength: React.PropTypes.number,
    required: React.PropTypes.bool,
  }

  static defaultProps = {
    ...View.defaultProps,
    value: "",
    placeholder: "",
    multiLine: false,
    type: "text",
    rows: 1,
    required: false,
  }

  getInitialState() {
    return {value: ''};
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
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render(){
    let children = [];
    
    children.push( 
      <input 
        value={this.state.value} 
        placeholder={this.props.placeholder} 
        type={this.props.type} 
        required={this.props.required}
        maxlength={this.props.maxlength}
        onChange={this.handleChange}
      />
      );
    
    return super.render(children);

  }
}
