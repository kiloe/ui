import React from 'react';
import Doc from './Doc';
import View from '../../package/View';
import Progress from '../../package/Progress';


export default class ProgressDemo extends React.Component {

  componentDidMount(){
    this.setState({progressInterval: setInterval(() => {
      this.setState( { progress: this.state.progress+0.15, buffer: this.state.buffer+0.2 } );
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
      buffer: 0,
    };
  }
  render(){

    let value = Math.min( Math.floor( this.state.progress * 100) / 100, 100 );
    let buffer = Math.min( Math.floor( this.state.buffer * 100) / 100, 100 );

    let determinateSrc = Doc.jsx`
      <View style={{ justifyContent: 'space-around' }}>
        <Progress value=${value} max={100} size={1} primary />
      </View>
    `;
    
    let bufferSrc = Doc.jsx`
      <View style={{ justifyContent: 'space-around' }}>
        <Progress value=${value} max={100} buffer=${buffer} size={1} primary />
      </View>
    `;
    return (
      <View>
        <View row size={5}>
          <h2>Determinate</h2>
        </View>
        <Doc src={determinateSrc}>Making progress</Doc>
        <View row size={5}>
          <h2>Buffer</h2>
        </View>
        <Doc src={bufferSrc}>Making progress</Doc>
        <View row size={5}>
        </View>
      </View>
    );
  }
}

