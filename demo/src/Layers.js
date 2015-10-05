import React from 'react';
import View from '../../package/View';
import UI from '../../package/index';
import Button from '../../package/Button';
import CallSplitIcon from '../../package/icons/CallSplitIcon';
import LockIcon from '../../package/icons/LockIcon';
import DeleteIcon from '../../package/icons/DeleteIcon';
import LockOpenIcon from '../../package/icons/LockOpenIcon';
import ColorizeIcon from '../../package/icons/ColorizeIcon';

UI.registerCSS({
  '.splitter *': {
    transition: 'all 0.7s ease !important'
  },
});


class Split extends React.Component {

  static MODES = [{},{primary:true},{accent:true},{grey:true}]

  constructor(...args){
    super(...args);
    this.state = {};
  }

  onSplit(){
    this.setState({split: true});
  }

  onMerge(){
    if( this.props.parent ){
      this.props.parent.setState({split: false});
    }
  }

  onCyclePaletteMode(){
    let m = this.state.mode || 0;
    m++;
    if( m == Split.MODES.length ){
      m = 0;
    }
    this.setState({mode: m});
  }

  getMode(){
    return Split.MODES[this.state.mode || 0];
  }

  componentDidMount(){
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
    var btn = {
      opacity: this.state.raised && !this.state.split ? '1' : '0',
    };
    let children = this.state.split ? [
      <Split parent={this} raised={this.state.raised} key="a" row={!this.props.row} />,
      <Split parent={this} raised={this.state.raised} key="b" row={!this.props.row} />
    ] : <View key="a" row style={{alignItems: 'center'}}>
      <Button style={btn} raised icon={CallSplitIcon} onClick={this.onSplit.bind(this)} />
      <Button style={btn} icon={this.state.lock ? LockOpenIcon : LockIcon} onClick={this.onToggleLock.bind(this)} />
      <Button style={btn} icon={DeleteIcon} onClick={this.onMerge.bind(this)} />
      <Button style={btn} icon={ColorizeIcon} onClick={this.onCyclePaletteMode.bind(this)} />
    </View>;
    let initprops = this.props.initprops || {};
    if( this.state.lock ){
      initprops.layer = 0;
    }
    let props = {
      style: s,
      row: this.props.row,
      raised: this.props.raised,
      ...initprops,
      ...this.getMode(),
    };
    return (
      <View {...props}>
        {children}
      </View>
    );
  }
}

export default class Layers extends React.Component {
  render(){
    return <Split initprops={{layer:0, primary:false, className:'splitter', raised:true}}/>;
  }
}
