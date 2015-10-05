import React from 'react';
import View from '../../package/View';
import UI from '../../package/index';

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

  onClick(){
    this.setState({split: true});
    setTimeout(() => {
      this.setState({raised: true});
    }, 100);
  }

  render(){
    let handler = this.onClick.bind(this);
    let s = {
      margin: this.props.raised ? '1.5rem' : 0,
      justifyContent: 'center',
      textAlign: 'center',
      verticalAlign: 'cetner',
    };
    let children = this.state.split ? [
      <Split raised={this.state.raised} key="a" row={!this.props.row} />,
      <Split raised={this.state.raised} key="b" row={!this.props.row} />
    ] : <View>ClickMe</View>;
    return (
      <View className="splitter" raised={this.props.raised} style={s} onClick={handler} row={this.props.row}>
        {children}
      </View>
    );
  }
}

export default class Layers extends React.Component {
  render(){
    return <Split />;
  }
}
