import React from 'react';
import Doc from './Doc';
import View from '../../package/View';


export default class ToggleFields extends React.Component {

  render(){
    let data = [
      {
        title: 'Toggle Switch',
        src: Doc.jsx`
          <Toggle switch />
        `,
        info:`
          A Toggle is field that can either be true/false
        `
      },
    ];
    return (
      <View scroll>
        <View>
          {data.map((x,i) => <Doc key={i} title={x.title} src={x.src}>{x.info}</Doc>)}
        </View>
      </View>
    );
  }

}

