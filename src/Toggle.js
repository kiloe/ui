import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
  '.toggle': {
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  '.switch': {
    overflow: 'visible',
  },
  '.switch .control': {
    display: 'inline-block',
    position: 'relative',
    width: '40px',
    height: '16px',
    borderRadius: '8px',
    transition: 'background 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
    verticalAlign: 'middle',
    cursor: 'pointer',
  },
  '.switch .control .marker': {
    content: `''`,
    position: 'absolute',
    top: '-4px',
    left: '-4px',
    width: '24px',
    height: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.28)',
    borderRadius: '50%',
    transition: 'left 0.28s cubic-bezier(0.4, 0, 0.2, 1), background 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '.switch .control:active .marker': {
    boxShadow: '0 2px 8px rgba(0,0,0,0.28), 0 0 0 20px rgba(128,128,128,0.1)',
  },
  '.switch input:checked + .control .marker': {
    left: '20px',
  },
  '.checkbox .control, .round .control': {
    display: 'none',
  },
  '.checkbox input': {
    position: 'relative',
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    outline: 0,
    width: '1.2rem',
    height: '1.2rem',
  },
  '.checkbox input:before': {
    content: `''`,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: '1',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    transition: 'all 0.3s ease-in-out',
  },
  '.checkbox input:checked:before': {
    transform: 'rotate(-50deg) translateY(.15rem)',
    height: '.5rem',
    borderTopStyle: 'none',
    borderRightStyle: 'none',
  },
  '.round input': {
    position: 'relative',
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    outline: 0,
    width: '1.2rem',
    height: '1.2rem',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black', // XXX: needs settings from theme
  },
  '.round input:before': {
    content: `''`,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: '1',
    width: '100%',
    height: '100%',
    background: 'black', // XXX: needs setting from theme
    transition: 'all 0.3s ease-in-out',
    transform: 'scale(0)',
    transformOrigin: '50% 50%',
    borderRadius: '50%',
  },
  '.round input:checked:before': {
    transform: 'scale(0.65)',
    transformOrigin: '50% 50%',
  },
  '.toggle > .text': {
    paddingLeft: '.5rem',
  },
  '.row > .toggle + .toggle': {
    marginLeft: '1rem',
  },
  '.col > .toggle + .toggle': {
    marginTop: '0.5rem',
  },

});


export default class Toggle extends View {

  static propTypes = {
    ...View.propTypes,
    // onChange callback that is called with the signature onChange(value,event)
    onChange: React.PropTypes.func,
    // value is the initial value of the control
    value: React.PropTypes.bool,
    // switch styles the fields as an on/off switch
    switch: React.PropTypes.bool,
    // label is the text label next to the field
    label: React.PropTypes.string,
  }

  static defaultProps = {
    ...View.defaultProps,
    row: true,
  }

  constructor(...args){
    super(...args);
    this.state = this.state || {};
    this.state.value = this.getInitialValue();
  }

  getInitialValue(nextProps){
    let props = nextProps || this.props || {};
    return props.value || props.checked;
  }

  getValue(){
    if( this.props.checked != 'undefined' ){
      return this.props.checked;
    }
    return this.state.value;
  }

  onChange = (e) => {
    let v = !this.state.value;
    if( this.props.onChange ){
      this.props.onChange(v, e);
    }
    if( e.isDefaultPrevented()) {
      return;
    }
    this.setState({value: v});
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.toggle = true;
    if( this.props.switch ){
      cs.switch = true;
    } else if( this.props.round ){
      cs.round = true;
    } else {
      cs.checkbox = true;
    }
    return cs;
  }

  getStyle(){
    let style = super.getStyle();


    return style;
  }

  // globally unique id for this item used to link the label
  getFieldId(){
    if( !this._fid ){
      this._fid = this.getID() + 'field';
    }
    return this._fid;
  }

  render(){
    let fid = this.getFieldId();
    let checked = this.getValue();
    let controlStyle = {};
    let markerStyle = {}; //hehe
    let isLight = this.getThemeMode() == 'light';
    let hideInput = this.props.switch ? 'hidden' : undefined;
    if( checked && !this.props.disabled ){
      let theme = this.getTheme({paletteMode:'primary'});
      controlStyle.background = theme.getBackgroundColor(false, this.getLayer(), this.getTopLayer(), isLight ? -2 : 1);
      markerStyle.background = theme.getBackgroundColor(false, this.getLayer(), this.getTopLayer());
    } else {
      let theme = this.getTheme();
      controlStyle.background = theme.getBackgroundColor(false, this.getLayer(), this.getTopLayer(), isLight ? 3 : -2);
      markerStyle.background = theme.getBackgroundColor(false, this.getLayer(), this.getTopLayer(), isLight ? 0 : -1);
    }
    let children = [
      <View row style={{overflow:'visible'}} size="intrinsic">
        <input id={fid} type="checkbox" hidden={hideInput} checked={this.getValue()} onChange={this.onChange} />
        <label htmlFor={fid} className="control" style={controlStyle}>
          <span className="marker" style={markerStyle} ></span>
        </label>
      </View>
    ];
    if( this.props.label ){
      children.push(<Text htmlFor={fid}>{this.props.label}</Text>);
    }
    return super.render(children);
  }

}
