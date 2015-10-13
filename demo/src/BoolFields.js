import React from 'react';
import Doc from './Doc';
import View from '../../package/View';


export default class BoolFields extends React.Component {

  render(){
    let data = [
      {
        title: 'BoolField (checkbox)',
        src: Doc.jsx`
          <BoolField label="Enable me" />
        `,
        info:`
          A BoolField is field that can either be true/false
        `
      },
      {
        title: 'Disabled checkbox',
        src: Doc.jsx`
          <BoolField disabled label="Unclickable" value={true} />
        `,
        info:`
          A BoolField is field that can either be true/false
        `
      },
      {
        title: 'BoolField Switch',
        src: Doc.jsx`
          <BoolField switch label="Turn me on" />
        `,
        info:`
          A BoolField is field that can either be true/false
        `
      },
      {
        title: 'Disabled Switch with initial value',
        src: Doc.jsx`
          <BoolField switch disabled value={true} />
        `,
        info:`
          A BoolField is field that can either be true/false
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

