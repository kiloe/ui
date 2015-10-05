import React from 'react';
import Doc from './Doc';

export default class Cards extends React.Component {

  render(){
    let src = Doc.jsx`
      <View>
        <Card>
          <View size={5} row>
            <Button raised label="hello" />
          </View>
        </Card>
        <Card>
          <Media src="http://i.imgur.com/wt4NRqA.jpg" />
          <View>Just some text</View>
        </Card>
        <Card>
          <Media src="http://i.imgur.com/wt4NRqA.jpg" />
        </Card>
      </View>
    `;
    return (
        <Doc src={src}>Cards are fun</Doc>
    );
  }
}
