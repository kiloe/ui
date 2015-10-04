import React from 'react';
import View from '../../package/View';
import Progress from '../../package/Progress';


export default class ProgressDemo extends React.Component {

  componentDidMount(){
    this.setState({progressInterval: setInterval(() => {
      this.setState( { progress: this.state.progress+0.15 } );
      if ( this.state.progress >= 100 ) {
        clearInterval( this.state.progressInterval );
        this.setState({progressInterval:false});
      }
    },1)});
  }

  componentWillUnmount(){
    if( this.state.progressInterval ){
      clearInterval(this.state.progressInterval);
    }
  }

  constructor(...args){
    super(...args);
    // Initial state
    this.state = {
      progress: 0,
    };
  }
  render(){

    let value = this.state.progress;

    return (
      <View>
        <View row size={5}>
          <h2>Progress Demo</h2>
        </View>
        <View style={{ justifyContent: 'space-around' }}>
          <Progress value={value} max={100} size={1} primary />
        </View>
        <View row size={5}>
        </View>
      </View>
    );
  }
}

