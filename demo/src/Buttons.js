import React from 'react';

import View from '../../package/View';
import Button from '../../package/Button';
import CloudIcon from '../../package/icons/CloudIcon';

import Doc from './Doc';

export default class ButtonsDemo extends React.Component {

  constructor(...args){
    super(...args);
    this.state = {
      label:true,
      icon:false,
      outline: false,
      fill:false,
      primary:false,
      accent:false,
      subtle:false,
      disabled:false,
      raised:false,
    };
  }

  set(flag, v){
    this.setState({[flag]: v});
  }

  render(){

    let filters = Object.keys(this.state).map(k => {
      let v = this.state[k];
      return <span><input key={k} type="checkbox" onChange={this.set.bind(this, k, !v)} checked={v} />{k}</span>;
    });

    let flags = {
      label:this.state.label ? 'button' : false,
      icon:this.state.icon ? CloudIcon : false,
      outline: this.state.outline,
      size:this.state.fill ? 'fill' : 'intrinsic',
      primary:this.state.primary,
      accent:this.state.accent,
      subtle:this.state.subtle,
      disabled:this.state.disabled,
      raised: this.state.raised,
    };

    flags = Object.keys(flags).reduce((o,k) => {
      if( !flags[k] ){
        return o;
      }
      if( k == 'size' && flags[k] == Button.defaultProps.size ){
        return o;
      }
      o[k] = flags[k];
      return o;
    },{});

    let src = Doc.jsx`
      <View row pad>
        <Button ${flags} />
        <Button ${flags} />
        <Button ${flags} />
      </View>
    `;

    return (
      <View scroll>
        <Doc src={src} title="Button">
          {filters}
        </Doc>
      </View>
    );
  }
}

