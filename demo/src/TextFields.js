import React from 'react';
import Doc from './Doc';
import View from '../../package/View';
import Headline from '../../package/Headline';


export default class TextFieldDemo extends React.Component {


  constructor(...args){
    super(...args);
  }


  render(){
    let data = [
      {
        title: 'Basic Text Field',
        src: Doc.jsx`
          <TextField value="Pre-filled value" />
        `,
        info:`
          With pre-filled value.
        `
      },
      {
        title: 'Text Field with placeholder',
        src: Doc.jsx`
          <TextField placeholder="Placeholder text" />
        `,
        info: ``
      },

    ];
    return (
      <View scroll>
        <Headline>Text Fields</Headline>
        <View>
          {data.map((x,i) => <Doc key={i} title={x.title} src={x.src}>{x.info}</Doc>)}
        </View>
      </View>
    );
  }
  
  
}

