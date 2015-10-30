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
        title: 'Basic Text Field',
        src: Doc.jsx`
          <TextField value="Pre-filled title value" placeholder="Title" />
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
      },
      {
        title: 'Password field',
        src: Doc.jsx`
          <TextField placeholder="Password" type="password" />
        `,
      },
      {
        title: 'Multi-line with accent colour',
        src: Doc.jsx`
          <TextField multiLine accent />
        `,
        info:`
          
        `
      },
      {
        title: 'Multi-line with max 4 rows',
        src: Doc.jsx`
          <TextField multiLine maxRows={4} placeholder="Maximum 4 lines" maxlength={200} />
        `,
        info:`
          
        `
      },
      {
        title: 'Text Field with character counter',
        src: Doc.jsx`
          <TextField placeholder="Username" maxlength={10} />
        `,
        info:`
         
        `
      },
      {
        title: 'Number field with icon',
        src: Doc.jsx`
          <TextField icon={<TextFormatIcon/>} type="number" />
        `,
        info:`
          
        `
      },
      {
        title: 'Disabled',
        src: Doc.jsx`
          <TextField placeholder="This is disabled" disabled />
        `,
      },
      {
        title: 'URL with validation',
        src: Doc.jsx`
          <TextField type="url" />
        `,
      },
      {
        title: 'Text field with DatePicker',
        src: Doc.jsx`
          <TextField placeholder="Date" picker={DatePicker} />
        `,
        info:`
          Assign a picker to use more complex modal selector thingys
        `
      },
      {
        title: 'Text field with TimePicker',
        src: Doc.jsx`
          <TextField placeholder="Time" picker={<TimePicker formatValue="h:mm A" quick />} />
        `,
        info:`
          TimePicker for selecting a time
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

