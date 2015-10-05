import React from 'react';
import View from '../../package/View';

class Split extends React.Component {

  constructor(...args){
    super(...args);
    this.state = {};
  }

  onClick(){
    this.setState({split: true});
  }

  render(){
    let handler = this.onClick.bind(this);
    let s = {
      margin: '1.5rem',
      justifyContent: 'center',
      textAlign: 'center',
      verticalAlign: 'cetner',
    };
    let children = this.state.split ? [
      <Split key="a" row={!this.props.row} />,
      <Split key="b" row={!this.props.row} />
    ] : <View>ClickMe</View>;
    return (
      <View raised layer={this.props.layer} style={s} onClick={handler} row={this.props.row}>
        {children}
      </View>
    );
  }
}

export default class Layers extends React.Component {
  render(){
    return <Split layer={0} />;
  }
}
