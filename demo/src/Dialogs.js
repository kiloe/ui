import React from 'react';
import Doc from './Doc';
import View from '../../package/View';


export default class Dialogs extends React.Component {

  constructor(...args){
    super(...args);
    this.state = {};
    window.hideDialog = this.hide;
  }

  show = () => {
    this.setState({show: true});
  }

  hide = () => {
    this.setState({show: false});
  }

  render(){

    let data = [
      {
        title: 'Dialog',
        clickToRun: true,
        src: Doc.jsx`
          <Dialog id="example" shade onClickOutside={stopDemo}>
            <Title>Modal Dialog</Title>
            <Text>Any content can appear within a Dialog</Text>
            <View row align="right">
              <Button label="Cancel" outline subtle onClick={stopDemo} />
              <Button label="Continue" primary outline subtle onClick={stopDemo} />
            </View>
          </Dialog>
        `,
        info:`
          Place a Modal or Dialog anywhere to overlay content.
        `
      },
      {
        title: 'Dialog in Dialog',
        clickToRun: true,
        src: Doc.jsx`
          <Dialog id="outter" shade>
            <View style={{padding: '10rem'}}>
              <Text>This is the outter dialog</Text>
              <Dialog id="inner" onClickOutside={stopDemo}>
                <Text>This is the inner dialog</Text>
              </Dialog>
              <Text>This is the outter dialog</Text>
              <Text>This is the outter dialog</Text>
              <Text>This is the outter dialog</Text>
              <Text>This is the outter dialog</Text>
              <Text>This is the outter dialog</Text>
            </View>
          </Dialog>
        `,
        info:`
          Place a Modal or Dialog anywhere to overlay content.
        `
      },
    ];

    return (
      <View scroll>
        <View>
          {data.map((x,i) => <Doc key={i} title={x.title} clickToRun={x.clickToRun} src={x.src}>{x.info}</Doc>)}
        </View>
      </View>
    );
  }

}

