import React from 'react';
import CSS from './utils/css';
import ReactDOM from 'react-dom';
import shallowEqual from './utils/shallowEqual';

// Overlay
CSS.register({
  '.overlay': {
    height: '100%',
  },
});

// Overlay is component used by the certain key Views to render modals
export default class Overlay extends React.Component {

  constructor(...args){
    super(...args);
  }

  componentWillMount(){
    this.mounted = true;
    document.body.addEventListener('click', this.onClickBody);
  }

  componentWillUnmount(){
    this.mounted = false;
    document.body.removeEventListener('click', this.onClickBody);
  }

  shouldComponentUpdate(nextProps, nextState){
    if( !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) ){
      return true;
    }
    return false;
  }

  // splice updates the stack and causes a render
  // splice(start, deleteCount, ...items){
  //   let stack = [...this.state.stack];
  //   items = items.map(item => {
  //     if( item.key || item.props.key  ){
  //       return item;
  //     }
  //     // use a random key to prevent react trying to be clever and reusing
  //     // the DOM elements. This ensures that the intrinsic sizes of dialogs
  //     // get calculated correctly and that the animation fires.
  //     // modals are not performance sensitive so this should be ok....I think
  //     let key = Math.random().toString();
  //     return React.cloneElement(item, {key:key});
  //   });
  //   // update...
  //   stack.splice(start, deleteCount, ...items);
  //   console.log('splice', start,deleteCount, ...items);
  //   console.log('result', stack);
  //   this.setState({stack});
  // }

  // set(owner, modal){
  //   if( !modal.key ){
  //     throw new Error('key prop is not optional for Modal');
  //   }
  //   let owners = this._state.owners;
  //   let id = owner.getID();
  //   let key = modal.key;
  //   if( !owners[id] ){
  //     owners[id] = {};
  //   }
  //   owners[id][key] = modal;
  // }

  // clear(owner){
  //   let owners = this._state.owners;
  //   let id = owner.getID();
  //   delete owners[id];
  // }

  // forward onClickOutside events to children
  onClickBody = (e) => {
    let modals = this.getModalRefs().reverse();
    for( let modal of modals ){
      if( !modal ){
        continue; // not ready yet
      }
      if( modal.contains(e.target) ){
        continue;
      }
      modal.onClickOutside(e);
    }
  }

  registerModalRef(idx,item){
    this._modals[idx] = item;
  }

  getModalRefs(){
    return this._modals || [];
  }

  map(fn){
    let all = [];
    for( let id of this.state.owners ){
      for( let key of this.state.owners[id] ){
        all.push(fn(this.state.owners[id][key]));
      }
    }
    return all;
  }

  render(){
    // register refs for each modal
    this._modals = React.Children.map(this.props.children, () => null );
    let modals = React.Children.map(this.props.children, (modal,i) => {
      return React.cloneElement(modal, {
        ref: this.registerModalRef.bind(this,i),
        ...modal.props,
      });
    });
    return (
      <div className="overlay">
        {modals}
      </div>
    );
  }

}


