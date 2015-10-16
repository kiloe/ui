import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({

  // TODO: scrap this, I was just playing with how to move the placeholder, it's webkit only so not great
  '.textField': {
    marginBottom: '6px',
    borderBottom: '1px solid grey',
  },
  '.textField input': {
    border: 'none',
    //willChange: 'background-position',
    //transition: 'all 0.3s cubic-bezier(.64,.09,.08,1)',
    //backgroundPosition: '-100vw 0',
    //backgroundSize: '100vw 100%',
    //backgroundRepeat: 'no-repeat',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1.3rem',
    padding: '15px 0px 7px 0px',
    backgroundColor: 'transparent',
    color: 'inherit',
  },
  '.textField input:focus': {
     padding: '15px 0px 6px 0px',
  },
  '.textField input:focus, .textField input:valid': {
    boxShadow: 'none',
    outline: 'none',
    backgroundPosition: '0 0',
  },
  '.textField input:focus::-webkit-input-placeholder, .textField input:valid::-webkit-input-placeholder': {
    transform: 'translateY(-20px)',
    visibility: 'visible !important',
    fontSize: '1rem',
  },
  '.textField input::-webkit-input-placeholder': {
    transition: {
      all: CSS.transitions.swift,
    },
  },

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
    error: React.PropTypes.string,
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
  
  isValid(){
    if ( this.props.required && this.state.value == '' ) return false; //required
    return true;
  }

  getLayer(){
    return this.context.layer;
  }

  getRegisterLayerHandler(){
    return; // don't bother registering text fields as layers
  }
  
  getRaise(){
    return 0;
  }
  
  getStyle(){
    let style = super.getStyle();
    
    let color = this.getTheme({ paletteMode: 'grey' }).getBackgroundColor();
    if ( !this.isValid() ) color = 'red';
    else if ( this.state.focus ) color = this.getTheme({ paletteMode: 'primary' }).getBackgroundColor();
    
    let lineWidth = ( this.state.focus ? '2px' : '1px' );
    style.borderBottom = (this.props.disabled ? 'dotted' : 'solid' ) + ' ' + lineWidth + ' ' + color;
    //style.background = 'linear-gradient(to bottom, rgba(255,255,255,0) 96%, ' + color + ' 96%)';
    
    
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
      color: ( this.state.focus ? this.getTheme({ paletteMode: 'primary' }).getBackgroundColor() : this.getTextColor() ),
    };
    if( this.props.icon instanceof Function ){
      let Icon = this.props.icon;
      return <Icon {...props} />;
    }
    return React.cloneElement(this.props.icon, props);
  }
  
  getError(){
    if ( this.props.error ) return this.props.error;
    
    return false;
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }
  
  onFocus = (event) => {
    this.setState({focus: true});
  } 
  
  onBlur = (event) => {
    this.setState({focus: false});
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
        required
        maxLength={this.props.maxlength}
        onChange={this.handleChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        disabled={this.props.disabled}
      />
      );

    return super.render(children);

  }
}
