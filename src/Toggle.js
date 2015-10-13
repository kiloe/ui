import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
  '.switch': {
    overflow: 'visible',
  },
  '.switch > label': {
    display: 'inline-block',
    position: 'relative',
    width: '40px',
    height: '16px',
    borderRadius: '8px',
    background: 'rgba(0,0,0,0.26)',
    transition: 'background 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
    verticalAlign: 'middle',
    cursor: 'pointer',
  },
  '.switch > label .knob': {
    content: `''`,
    position: 'absolute',
    top: '-4px',
    left: '-4px',
    width: '24px',
    height: '24px',
    background: '#fafafa',
    boxShadow: '0 2px 8px rgba(0,0,0,0.28)',
    borderRadius: '50%',
    transition: 'left 0.28s cubic-bezier(0.4, 0, 0.2, 1), background 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '.switch > label:active .knob': {
    boxShadow: '0 2px 8px rgba(0,0,0,0.28), 0 0 0 20px rgba(128,128,128,0.1)',
  },
  '.switch > input:checked + label .knob': {
    left: '20px',
  },
});

export default class Switch extends View {

  constructor(...args){
    super(...args);
    this.state = this.state || {};
    this.state.value = this.getInitialValue();
  }

  componentWillReceiveProps(nextProps){
    super.componentWillReceiveProps(nextProps);
    this.state.value = this.getInitialValue(nextProps);
  }

  getInitialValue(nextProps){
    let props = nextProps || this.props || {};
    return props.value || false;
  }

  getValue(){
    return this.state.value;
  }

  onChange = () => {
    this.setState({value: !this.state.value});
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.toggle = true;
    cs.switch = true;
    return cs;
  }

  getStyle(){
    let style = super.getStyle();


    return style;
  }

  // globally unique id for this item used to link the label
  getFieldId(){
    if( !this._fid ){
      this._fid = Math.random().toString();
    }
    return this._fid;
  }

  render(){
    let fid = this.getFieldId();
    let checked = this.getValue();
    let labelStyle = {};
    let knobStyle = {}; //hehe
    if( checked ){
      let theme = this.getTheme({paletteMode:'primary'});
      labelStyle.background = theme.getBackgroundColor(false, this.getLayer(), this.getTopLayer(), theme.getMode()=='light' ? -2 : 2);
      knobStyle.background = theme.getBackgroundColor(false, this.getLayer()+1, this.getTopLayer());
    }
    return super.render([
      <input id={fid} type="checkbox" hidden="hidden" checked={this.getValue()} onChange={this.onChange} />,
      <label htmlFor={fid} style={labelStyle}>
        <span className="knob" style={knobStyle} ></span>
      </label>
    ]);
  }
}
