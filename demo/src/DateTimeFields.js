import React from 'react';
import Doc from './Doc';
import View from '../../package/View';


export default class TextFieldDemo extends React.Component {


  constructor(...args){
    super(...args);
  }


  render(){
    let data = [
      {
        title: 'Time Picker (24hr)',
        src: Doc.jsx`
          <TimePicker />
        `,
        info:`
          It picks times
        `
      },
      {
        title: 'Time Picker (AM/PM)',
        src: Doc.jsx`
          <TimePicker ampm />
        `,
        info:`
          It picks times
        `
      },
      {
        title: 'Date Picker',
        src: Doc.jsx`
          <DatePicker />
        `,
        info:`
          It picks dates
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

