import React from 'react';
import CSS from './utils/css';
import ReactDOM from 'react-dom';

CSS.register({
  '.modals': {
    height: '100%',
  },
});

// Modal is component used by the root-view to render a stack of Views
// positioned relative to the rootView.
// Modal is very tightly coupled to the View (specifically the rootView), its done this way
// to take advantage of the modal state changes not affecting the main tree.
export default class Modal extends React.Component {

  constructor(...args){
    super(...args);
    this.state = {stack:[]};
  }

  componentWillMount(){
    document.body.addEventListener('click', this.onClickBody);
  }

  componentWillUnmount(){
    document.body.removeEventListener('click', this.onClickBody);
  }

  // splice updates the stack and causes a render
  splice(start, deleteCount, ...items){
    let stack = [...this.state.stack];
    items = items.map(item => {
      if( item.key || item.props.key  ){
        return item;
      }
      // use a random key to prevent react trying to be clever and reusing
      // the DOM elements. This ensures that the intrinsic sizes of dialogs
      // get calculated correctly and that the animation fires.
      // modals are not performance sensitive so this should be ok....I think
      let key = Math.random().toString();
      return React.cloneElement(item, {key:key});
    });
    // update...
    stack.splice(start, deleteCount, ...items);
    console.log('splice', start,deleteCount, ...items);
    console.log('result', stack);
    this.setState({stack});
  }

  // returns actual item components (not the lightweight things in the stack)
  // each stack item has a corrosponding item in getItemRefs()
  getItemRefs(){
    return this.items;
  }


  // forward onClickOutside events to children
  onClickBody = (e) => {
    let items = this.getItemRefs().reverse();
    for( let item of items ){
      if( item.refs.inner.refs.view.contains(e.target) ){
        continue;
      }
      console.log('calling on', item);
      item.onClickOutside(e);
    }
  }

  registerItem(idx,item){
    this.items[idx] = item;
  }

  render(){
    this.items = this.state.stack.map( () => null );
    let items = this.state.stack.map((item,i) => {
      return React.cloneElement(item, {
        _reg: this.registerItem.bind(this, i),
        pop: this.splice.bind(this, i, Infinity),
      });
    });
    return (
      <div className="modals">
        {items}
      </div>
    );
  }

}
