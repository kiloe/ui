import React from 'react';
import Doc from './Doc';
import View from '../../package/View';


export default class Steppers extends React.Component {

  constructor(...args){
    super(...args);
    this.state = {};
  }


  render(){

    let data = [
      {
        title: 'Stepper',
        src: Doc.jsx`
          <Stepper type="horizontal">
            <Step number={1} label="First step" complete>
              <p>Content of step 1.</p>
            </Step>
            <Step number={2} label="Second step" active>
              <p>Content of step 2.</p>
            </Step>
            <Step number={3} label="Third step">
              <p>Content of step 3.</p>
            </Step>
          </Stepper>
        `,
        info:`
          
        `
      },
     
    ];

    return (
      <View scroll>
        <View>
          {data.map((x,i) => <Doc key={i} title={x.title} clickToRun={x.clickToRun} src={x.src}>{x.info}</Doc>)}
        </View>
      </View>
    );
  }

}

