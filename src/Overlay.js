import React from 'react';
import CSS from './utils/css';
import ReactDOM from 'react-dom';
import shallowEqual from './utils/shallowEqual';

// Overlay
CSS.register({
  '.overlay': {
    //height: '100%', // XXX: Removed for now as it breaks things on Firefox
    zIndex: 10,
  },
});

// Overlay is component used by the certain key Views to render modals
export default class Overlay extends React.Component {

  shouldComponentUpdate(nextProps, nextState){
    if( !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) ){
      return true;
    }
    return false;
  }

  render(){
    // register refs for each modal
    let modals = React.Children.map(this.props.children, (modal,i) => {
      return React.cloneElement(modal, {
        index: i,
        // ...modal.props,
      });
    });
    return (
      <div className="overlay">
        {modals}
      </div>
    );
  }

}


