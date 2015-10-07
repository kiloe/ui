import React from 'react';
import Doc from './Doc';
import View from '../../package/View';


export default class ProgressDemo extends React.Component {

  componentDidMount(){
    this.setState({progressInterval: setInterval(() => {
      this.setState( { progress: this.state.progress+0.15, progressb: this.state.progressb+0.2, bufferb: this.state.bufferb+0.3 } );
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
      progressb: 0,
      bufferb: 0,
    };
  }
  render(){

    let value = Math.min( Math.floor( this.state.progress * 100) / 100, 100 );
    let valueb = Math.min( Math.floor( this.state.progressb * 100) / 100, 100 );
    let bufferb = Math.min( Math.floor( this.state.bufferb * 100) / 100, 100 );

    let determinateSrc = Doc.jsx`
      <View style={{ justifyContent: 'space-around' }}>
        <Progress value=${value} max={100} size={1} primary />
      </View>
    `;

    let bufferSrc = Doc.jsx`
      <View style={{ justifyContent: 'space-around' }}>
        <Progress value=${valueb} max={100} buffer=${bufferb} size={1} primary />
      </View>
    `;

    let indeterminateSrc = Doc.jsx`
      <View style={{ justifyContent: 'space-around' }}>
        <Progress size={1} primary />
      </View>
    `;

    return (
      <View scroll>
        <View row size={5}>
          <h2>Determinate</h2>
        </View>
        <Doc src={determinateSrc}>Making progress</Doc>
        <View row size={5}>
          <h2>Buffer</h2>
        </View>
        <Doc src={bufferSrc}>Making progress</Doc>
        <View row size={5}>
          <h2>Indeterminate</h2>
        </View>
        <Doc src={indeterminateSrc}>Making progress</Doc>
        <View row size={5}>
        </View>
      </View>
    );
  }
}

