import React from 'react';
import Doc from './Doc';
import View from '../../package/View';


export default class SelectFields extends React.Component {

  render(){
    let data = [
      {
        title: 'Select with array of strings',
        src: Doc.jsx`
          <Select placeholder="Select Language" options={['English','French','Spanish']} />
        `,
        info:`
          Pass an Array of strings as options.
        `
      },
      {
        title: 'Select with comma seperated values',
        src: Doc.jsx`
          <Select placeholder="Select Language" options={'English,French,Spanish'} />
        `,
        info:`
          Pass a CSV string as options.
        `
      },
      {
        title: 'Select with Object options',
        src: Doc.jsx`
          <Select placeholder="Select Language" value="es" options={{
            English: 'en',
            French: 'fr',
            Spanish: 'es',
          }} />
        `,
        info:`
          Use an Object to build the key/values of simple lists when you don't care about the order.
        `
      },
      {
        title: 'Select with Array options',
        src: Doc.jsx`
          <Select placeholder="Select Language" options={[
            {key:'English', value:'en'},
            {key:'French', value:'fr'},
            {key:'Spanish', value:'es'},
          ]} />
        `,
        info:`
          Use an Array of {key:x,value:y} Objects for simple lists when order is important.
        `
      },
      {
        title: 'Select with groups',
        src: Doc.jsx`
          <Select placeholder="Select Language" options={[
            {group: "common", options: [
              {key:'English', value:'en'},
            ]},
            {group: "other", options: [
              {key:'French', value:'fr'},
              {key:'Spanish', value:'es'},
            ]},
          ]} />
        `,
        info:`
          Add group keys when you want to group options but do not care about the order.
        `
      },
      {
        title: 'Select with required and pre-selected value',
        src: Doc.jsx`
          <Select required options="English,French,Spanish" value="French"/>
        `,
        info:`
          Use 'required' to remove the 'none' option.
          Set value to a value to have it pre-selected.
        `
      },
      {
        title: 'Select with lots of values',
        src: Doc.jsx`
          <Select required options={Array.apply(0, Array(100)).map((_,i) => i+'')} value="50"/>
        `,
        info:`
          Select option should appear over the selectbox when expanded.
        `
      },
      {
        title: 'Radio buttons',
        src: Doc.jsx`
          <Select radio options="English,French,Spanish" value="French"/>
        `,
        info:`
          Radio buttons are just a different way of showing a Select
        `
      },
      {
        title: 'Radio buttons horizontally',
        src: Doc.jsx`
          <Select radio row required options="English,French,Spanish" value="French"/>
        `,
        info:`
          Use row to show options in a row
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

