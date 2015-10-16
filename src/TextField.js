import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({

  // TODO: scrap this, I was just playing with how to move the placeholder, it's webkit only so not great
  '.textField': {
    marginBottom: '6px',
  },
  '.textField input': {
    border: 'none',
    flex: '1',
    //willChange: 'background-position',
    //transition: 'all 0.3s cubic-bezier(.64,.09,.08,1)',
    //backgroundPosition: '-100vw 0',
    //backgroundSize: '100vw 100%',
    //backgroundRepeat: 'no-repeat',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1.3rem',
    padding: '8px 0px 1px 0px',
    marginBottom: '6px',
    backgroundColor: 'transparent',
    color: 'inherit',
    lineHeight: '32px',
  },
  '.textField input:focus': {
    boxShadow: 'none',
    outline: 'none',
    backgroundPosition: '0 0',
  },
  '.textField input:focus::-webkit-input-placeholder': {
    transform: 'translateY(-20px)',
    visibility: 'visible !important',
    fontSize: '1rem',
  },
  '.textField input::-webkit-input-placeholder': {
    transition: {
      all: CSS.transitions.swift,
    },
  },
  '.textField .error': {
    color: 'red',
    fontSize: '1rem',
  },
  '.textField .characterCount': {
    fontSize: '1rem',
    textAlign: 'right',
  },
  '.textField .icon': {
    padding: '11px',
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
  
  isInvalid(){
    if ( this.props.required && this.state.value == '' ) return "Required"; //required
    //if ( this.state.value.length > this.props.maxlength ) return "Too long";
    
    return false;
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
    
    return this.isInvalid();
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
    
    let style = {};
    let color = this.getTheme({ paletteMode: 'grey' }).getBackgroundColor();
    if ( this.isInvalid() ) color = 'red';
    else if ( this.state.focus ) color = this.getTheme({ paletteMode: 'primary' }).getBackgroundColor();

    style.paddingBottom = ( this.state.focus ? '0px' : '1px' );    
    let lineWidth = ( this.state.focus ? '2px' : '1px' );
    style.borderBottom = (this.props.disabled ? 'dotted' : 'solid' ) + ' ' + lineWidth + ' ' + color;
    //style.background = 'linear-gradient(to bottom, rgba(255,255,255,0) 96%, ' + color + ' 96%)';
    

    let field =
      <input
        value={this.state.value}
        placeholder={this.props.placeholder}
        name={this.props.name}
        type={this.props.type}
        required={this.props.required}
        onChange={this.handleChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        disabled={this.props.disabled}
        style={ style }
      />;
    //maxLength={this.props.maxlength}

    if( this.props.icon ){
      children.push( <View row style={{ justifyContent: 'space-between' }}>{ this.getIcon() }{ field }</View> );
    }
    else children.push( field );
    
    let errorMsg = this.isInvalid();
    if ( errorMsg ) {
      children.push( <div className="error">{ errorMsg }</div> );
    }
    
    if ( this.props.maxlength > 0 ) {
      let counterStyle = { color: this.getTheme({ paletteMode: 'grey' }).getBackgroundColor() };
      if ( this.state.value.length > this.props.maxlength ) counterStyle.color = 'red'; // error
      children.push( <div className="characterCount" style={counterStyle}>{ this.state.value.length } / { this.props.maxlength }</div> );
    }

    return super.render(children);

  }
}
