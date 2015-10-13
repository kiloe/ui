import React from 'react';
import Doc from './Doc';
import View from '../../package/View';


export default class Toggles extends React.Component {

  render(){
    let data = [
      {
        title: 'Default Toggle',
        src: Doc.jsx`
          <Toggle label="Toggle me" />
        `,
        info:`
          A Toggle is field that can either be true/false
        `
      },
      {
        title: 'Disabled Toggle',
        src: Doc.jsx`
          <Toggle disabled value={true} />
        `,
        info:`
          Toggles can be disabled and the label is optional
        `
      },
      {
        title: 'Switch',
        src: Doc.jsx`
          <Toggle switch label="Turn me on" />
        `,
        info:`
          Add the switch prop to make it look like a switch
        `
      },
      {
        title: 'Disabled Switch',
        src: Doc.jsx`
          <Toggle switch disabled label="Unswitchable" value={true} />
        `,
        info:`
          Disabled switches don't do very much.
        `
      },
      {
        title: 'Round Toggle',
        src: Doc.jsx`
          <Toggle round label="Toggle Me!" />
        `,
        info:`
          Round Toggles are often prefured for 'radio' buttons (see Select)
        `
      },
      {
        title: 'Icon Toggle',
        src: Doc.jsx`
          <View row>
            <Toggle icon={CloudIcon} />
            <Toggle icon={StarIcon} />
            <Toggle icon={FavoriteIcon} />
          </View>
        `,
        info:`
          Set an icon to use it as a toggle switch.
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

