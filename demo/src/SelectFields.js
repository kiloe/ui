import React from 'react';
import Doc from './Doc';
import View from '../../package/View';
import Headline from '../../package/Headline';


export default class SelectFields extends React.Component {

  render(){
    let data = [
      {
        title: 'Select',
        src: Doc.jsx`
          <Select placeholder="Select Language" options={{
            English: 'en',
            French: 'fr',
            Spanish: 'es',
          }} />
        `,
        info:`
          Select fields are basically menus
        `
      },
    ];
    return (
      <View scroll>
        <Headline>Selectboxes</Headline>
        <View>
          {data.map((x,i) => <Doc key={i} title={x.title} src={x.src}>{x.info}</Doc>)}
        </View>
      </View>
    );
  }

}

