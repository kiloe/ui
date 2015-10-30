import React from 'react';
import View from './View';
import CSS from './utils/css';

import ReactDOM from 'react-dom';

const rowsHeight = 32;

CSS.register({

  // TODO: scrap this, I was just playing with how to move the placeholder, it's webkit only so not great
  '.textField': {
    marginBottom: '6px',
    position: 'relative',
  },
  '.textField input, .textField textarea': {
    border: 'none',
    flex: '1',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1.3rem',
    padding: '0px',
    margin: '8px 0px 7px 0px',
    backgroundColor: 'transparent',
    color: 'inherit',
    lineHeight: '32px',
    opacity: '0.9',
  },
  '.textField input:focus, .textField textarea:focus': {
    boxShadow: 'none',
    outline: 'none',
    backgroundPosition: '0 0',
    opacity: '1',
  },
  '.textField input::-webkit-input-placeholder, .textField textarea::-webkit-input-placeholder': {
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
  '.textField .placeholder': {
    position: 'absolute',
    top: '14px',
    fontSize: '1.3rem',
    transition: 'all 0.3s cubic-bezier(.64,.09,.08,1)',
  },
  '.textField .placeholder.title': {
    transform: 'translateY(-20px)',
    fontSize: '1rem',
  },
  '.textField .fieldContainer': {
    position: 'relative',
  },
  '.textField hr.colorBorder': {
    borderStyle: 'none none solid',
    borderBottomWidth: '2px',
    position: 'absolute',
    width: '100%',
    bottom: '8px',
    margin: '0px',
    boxSizing: 'content-box',
    height: '0px',
    transform: 'scaleX(0)',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  },
  '.textField hr.greyBorder': {
    border: 'none',
    borderBottom: 'solid 1px #e0e0e0',
    position: 'absolute',
    width: '100%',
    bottom: '8px',
    margin: '0',
    MozBoxSizing: 'content-box',
    boxSizing: 'content-box',
    height: '0',
  },
  '.textField textarea': {
    width: '100%',
    resize: 'none',
  },
  '.textField textarea.shadow': {
    overflow: 'hidden',
    position: 'absolute',
    opacity: 0,
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
    pattern: React.PropTypes.string,
    error: React.PropTypes.string,
    icon: React.PropTypes.oneOfType([
      React.PropTypes.element,
      React.PropTypes.func,
    ]),
    // set a picker to use to choose a value (ie DatePicker, ColorPicker etc)
    picker: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.node,
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
    this.setState({ value: this.props.value, height: this.props.rows * rowsHeight });
    if ( this.props.multiLine ) this._syncHeightWithShadow();
  }
  


  getClassNames(){
    let cs = super.getClassNames();
    cs.textField = true;
    if ( this.props.icon ) cs.withIcon = true;
    return cs;
  }

  isInvalid(){
    if ( this.props.required && this.state.value == '' ) return 'Required'; //required

    if ( this.state.value.length > this.props.maxlength ) return true; //no message, handled by counter


    //url
    if ( this.state.value.length > 0 && this.props.type == 'url' ) {
      let pattern = /^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?(\#([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?)?$/;
      if( !pattern.test(this.state.value) ) return 'Invalid URL.';
    }
    //number
    if ( this.state.value.length > 0 && this.props.type == 'number' ) {
      let pattern = /^[0-9\.\-]+$/;
      if( !pattern.test(this.state.value) ) return 'Invalid number.';
    }
    //email
    if ( this.state.value.length > 0 && this.props.type == 'email' ) {
      let pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if( !pattern.test(this.state.value) ) return 'Invalid email address.';
    }

    // TODO: this.props.pattern


    return false;
  }

  getBackgroundColor() {
    return 'transparent';
  }

  getTextColor() {
    return this.getTheme({ paletteMode: 'grey' }).getColoredTextColor(false, this.getLayer(),this.getTopLayer(), 'primary');
  }

  getHighlightColor() {
    if ( this.getTheme().getPaletteMode() == 'accent' ) return this.getTheme().getBackgroundColor();
    else return this.getTheme({ paletteMode: 'primary' }).getBackgroundColor(); //the default
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

  getPicker(){
    if( !this.props.picker ){
      return;
    }
    let props = {
      key:'picker',
      onCancel: () => {
        this.setState({showPicker: false, focus:false});
      },
      onSelected: (v) => {
        this.setState({value: v.toString(), showPicker: false, focus:false});
      }
    };
    if( this.props.picker instanceof Function ){
      let Picker = this.props.picker;
      return <Picker {...props} />;
    }
    return React.cloneElement(this.props.picker, props);
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
      color: ( this.state.focus ? this.getHighlightColor() : this.getTextColor() ),
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
    if ( this.props.multiLine ) this._syncHeightWithShadow(event.target.value);
  }

  onFocus = () => {
    this.setState({focus: true, showPicker: (this.props.picker !== undefined) });
  }

  onBlur = () => {
    if( this.state.showPicker ){
      console.log('showPicker onBlur');
      return;
    }
    this.setState({focus: false});
  }

  _syncHeightWithShadow(newValue, e) {
    let shadow = ReactDOM.findDOMNode(this.refs.shadow);

    if (newValue !== undefined) {
      shadow.value = newValue;
    }
    let newHeight = shadow.scrollHeight;
    
    if (this.props.maxRows > this.props.rows) {
      newHeight = Math.min(this.props.maxRows * rowsHeight, newHeight);
    }

    newHeight = Math.max(newHeight, rowsHeight);

    if (this.state.height !== newHeight) {
      this.setState({
        height: newHeight,
      });

      if (this.props.onHeightChange) {
        this.props.onHeightChange(e, newHeight);
      }
    }
  }

  render(){
    let children = [];

    let greyColor = this.getTheme({ paletteMode: 'grey' }).getBackgroundColor();

    let picker = this.getPicker();
    if( this.state.showPicker && picker ){
      children.push(picker);
    }

    let style = {};
    let color = greyColor;
    let counterStyle = { color: color };
    if ( this.isInvalid() ) {
      color = 'red';
      counterStyle = { color: color };
    }
    else if ( this.state.focus ) color = this.getHighlightColor();

    style.color = this.getTextColor();
    
    if ( this.props.multiLine ) style.height = this.state.height;


    let errorMsg = this.isInvalid();

    let fieldGroup = [];
    if ( this.props.placeholder ) {
      let placeholder = <div key="placeholder" className={ 'placeholder' + ( this.state.focus || this.state.value.length > 0 ? ' title' : '' ) } style={{ color: color }}>{ this.props.placeholder }</div>;
      fieldGroup.push( placeholder );
    }

    if ( this.props.multiLine ) {
      fieldGroup.push(
        <span key="textarea-container">
          <textarea rows="1" key="input"
            key="input"
            value={this.state.value}
            name={this.props.name}
            type={this.props.type}
            required={this.props.required}
            pattern={this.props.pattern}
            onChange={this.handleChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            disabled={this.props.disabled}
            style={ style }
          ></textarea>
          <textarea
            className="shadow"
            ref="shadow"
            key="shadow"
            tabIndex="-1"
            rows={this.props.rows}
            readOnly={true}
            value={this.state.value}
             />
        </span> );
    
    }
    else {
      fieldGroup.push(
        <input key="input"
          value={this.state.value}
          name={this.props.name}
          type={this.props.type}
          required={this.props.required}
          pattern={this.props.pattern}
          onChange={this.handleChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          disabled={this.props.disabled}
          style={ style }
        /> );
    }

    fieldGroup.push( <hr key="gborder" className="greyBorder" style={{ borderStyle: (this.props.disabled ? 'dashed' : 'solid' ) }} /> );
    fieldGroup.push( <hr key="cborder" className="colorBorder" style={{ borderColor: color, transform: 'scaleX(' + ( this.state.focus || errorMsg ? '1' : '0' ) + ')' }} /> );

    let field = <View key="field" className="fieldContainer" theme={{ mode: 'transparent' }}>{ fieldGroup }</View>;
    //maxLength={this.props.maxlength}


    if( this.props.icon ){
      children.push( <View key="icon" row style={{ justifyContent: 'space-between' }} theme={{ mode: 'transparent' }}>{ this.getIcon() }{ field }</View> );
    }
    else children.push( field );



    if ( errorMsg ) {
      children.push( <div key="err" className="error">{ errorMsg }</div> );
    }

    if ( this.props.maxlength > 0 ) {
      children.push( <div key="cntr" className="characterCount" style={counterStyle}>{ this.state.value.length } / { this.props.maxlength }</div> );
    }

    return super.render(children);

  }
}
