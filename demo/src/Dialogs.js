import React from 'react';
import Doc from './Doc';
import View from '../../package/View';
import Headline from '../../package/Headline';
import Button from '../../package/Button';


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

    let doc = <Button label="show dialog" raised onClick={this.show} />;
    if( this.state.show ){
      let src = Doc.jsx`
        <Dialog id="example" shade onClickOutside={hideDialog}>
          <Title>Modal Dialog</Title>
          <Text>Any content can appear within a Dialog</Text>
          <View row>
            <Dialog id="dialog-in-dialog">
              <Text>Even Dialogs can be in Dialogs</Text>
            </Dialog>
          </View>
          <View row align="right">
            <Button label="Cancel" outline subtle onClick={hideDialog} />
            <Button label="Continue" primary outline subtle onClick={hideDialog} />
          </View>
        </Dialog>
      `;
      doc = <Doc key="modaldialog" title="Modal Diloag" src={src} onClick={this.hide}>
        Place a Modal or Dialog anywhere to overlay content.
      </Doc>;
    }
    return (
      <View scroll>
        <Headline>Dialogs</Headline>
        <View>
          {doc}
        </View>
      </View>
    );
  }

}

