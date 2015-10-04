import React from 'react';
import Doc from './Doc';

export default class Cards extends React.Component {

  render(){
    let src = Doc.jsx`
      <View row>
        <Card>
          Hello
        </Card>
        <Card>
          <Image src="http://i.imgur.com/wt4NRqA.jpg" />
        </Card>
      </View>
    `;
    return (
        <Doc src={src}>Cards are fun</Doc>
    );
  }
}
