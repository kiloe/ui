import React from 'react';
import View from '../../package/View';
import UI from '../../package/index';
import Button from '../../package/Button';
import CallSplitIcon from '../../package/icons/CallSplitIcon';
import LockIcon from '../../package/icons/LockIcon';
import LockOpenIcon from '../../package/icons/LockOpenIcon';

UI.registerCSS({
  '.splitter *': {
    transition: 'all 0.3s ease !important'
  },
});

class Split extends React.Component {

  constructor(...args){
    super(...args);
    this.state = {};
  }

  onSplit(){
    this.setState({split: true});
    setTimeout(() => {
      this.setState({raised: true});
    }, 100);
  }

  onToggleLock(){
    this.setState({lock: !this.state.lock});
  }

  render(){
    let s = {
      margin: this.props.raised ? '1.5rem' : 0,
      justifyContent: 'center',
      textAlign: 'center',
      verticalAlign: 'cetner',
    };
    let children = this.state.split ? [
      <Split raised={this.state.raised} key="a" row={!this.props.row} />,
      <Split raised={this.state.raised} key="b" row={!this.props.row} />
    ] : <View row style={{alignItems:'center'}}>
      <Button disabled={this.state.lock} icon={CallSplitIcon} onClick={this.onSplit.bind(this)} />
      <Button icon={this.state.lock ? LockOpenIcon : LockIcon} onClick={this.onToggleLock.bind(this)} />
    </View>;
    let initprops = this.props.initprops || {};
    if( this.state.root ){
      initprops.layer = 0;
    }
    return (
      <View debug={true} {...initprops} raised={this.props.raised} style={s} row={this.props.row}>
        {children}
      </View>
    );
  }
}

export default class Layers extends React.Component {
  render(){
    return <Split initprops={{layer:0, primary:false, className:'splitter'}}/>;
  }
}
