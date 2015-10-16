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
          Not done yet.
        `
      },
      {
        title: 'Text Field with character counter',
        src: Doc.jsx`
          <TextField placeholder="Username" maxlength={10} />
        `,
        info:`
          Not done yet.
        `
      },
      {
        title: 'Number field with icon',
        src: Doc.jsx`
          <TextField icon={<TextFormatIcon/>} type="number" />
        `,
        info:`
          Not done yet.
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

