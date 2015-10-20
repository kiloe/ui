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
        title: 'Modal',
        clickToRun: true,
        src: Doc.jsx`
          <Modal id="modalexample" onClickOutside={stopDemo} pos={{bottom:50,right:50}}>
            <View pad accent>
              <Text>This is modal content</Text>
              <Text>Click anywhere to dismiss</Text>
            </View>
          </Modal>
        `,
        info:`
          You can render a Modal anywhere and it will display it's content overlayed on the screen.
          Modal is a low-level component for displaying overlay content. You probably want a Dialog really...
        `
      },
      {
        title: 'Modal',
        clickToRun: true,
        src: Doc.jsx`
          <Modal id="modalexample" shade pos={{top:100,left:50}}>
            <View pad accent>
              <Text>* Shade highlights the modal</Text>
              <Text>* Shade prevents click events</Text>
              <Button label="DISMISS" onClick={stopDemo} raised />
            </View>
          </Modal>
        `,
        info:`
          Use 'shade' prop to dim the area the modal displays in and prevent clicks passing through.
        `
      },
      {
        title: 'Dialog',
        clickToRun: true,
        src: Doc.jsx`
          <Dialog id="dialogexample" pad>
            <Text title>Modal Dialog</Text>
            <Text>Any content can appear within a Dialog</Text>
            <Select radio required options={{'Yay Modals!':1,'Boo Modals':2}} value={1} />
            <View row align="right">
              <Button label="Continue" primary outline subtle onClick={stopDemo} />
            </View>
          </Dialog>
        `,
        info:`
          Dialog is a common form of Modal, it shows it's content overlayed and raised on the screen, with
          a "shade". Simply render it somewhere to have it displayed.
        `
      },
      {
        title: 'Dialog in Dialog',
        clickToRun: true,
        src: Doc.jsx`
          <Dialog id="outter" shade>
            <Text>This is the outter dialog</Text>
            <Dialog id="inner" onClickOutside={stopDemo}>
              <Text>This inner dialog is displayed on top as it is nested within another dialog</Text>
            </Dialog>
            <Text>This is the outter dialog</Text>
            <Text>This is the outter dialog</Text>
            <Text>This is the outter dialog</Text>
            <Text>This is the outter dialog</Text>
            <Text>This is the outter dialog</Text>
          </Dialog>
        `,
        info:`
          Dialogs can be used within dialogs. The inner-most dialog will be on the top.
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

