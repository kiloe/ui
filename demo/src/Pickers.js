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
        clickToRun: true,
        src: Doc.jsx`
          <TimePicker onCancel={stopDemo} />
        `,
        info:`
          It picks times
        `
      },
      {
        title: 'Time Picker (AM/PM)',
        clickToRun: true,
        src: Doc.jsx`
          <TimePicker ampm onCancel={stopDemo} />
        `,
        info:`
          It picks times
        `
      },
      {
        title: 'Quick Time Picker',
        clickToRun: true,
        src: Doc.jsx`
          <TimePicker quick onCancel={stopDemo} />
        `,
        info:`
          Use quick when you want a picker like on android where you don't have to press OK
        `
      },
      {
        title: 'Date Picker',
        clickToRun: true,
        src: Doc.jsx`
          <DatePicker onCancel={stopDemo} />
        `,
        info:`
          It picks dates
        `
      },
    ];
    return (
      <View scroll>
        <View>
          {data.map((props,i) => <Doc key={i} {...props} />)}
        </View>
      </View>
    );
  }


}

