import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
  '.modals': {
    height: '100%',
  },
  '.modal': {
    display: 'flex',
    pointerEvents: 'none',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  '.modal ': {
    animationDuration: '300ms',
    animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
    animationFillMode: 'forwards',
    transformOrigin: 'top center',
    animationName: 'modalin',
  },
  '@keyframes modalin': `
    0% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  `,
  '.modal.off > div': {
    animationName: 'modalout',
  },
  '@keyframes modalout': `
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0);
    }
  `,
});

class PopEvent {
  constructor(view){
    this.defaultPrevented = false;
    this.propagationStopped = false;
    this.view = view;
  }

  preventDefault(){
    this.defaultPrevented = true;
  }

  stopPropagation(){
    this.propagationStopped = true;
  }
}


// Modal is component used by the root-view to render a stack of Views
// positioned relative to the rootView.
// Modal is very tightly coupled to the View (specifically the rootView), its done this way
// to take advantage of the modal state changes not affecting the main tree.
export default class Modal extends React.Component {

  constructor(...args){
    super(...args);
    this.state = {stack:[]};
  }



  // push adds a View to the stack and triggers a render
  // Usage:
  //
  // let m = modal.push({
  //  view: <View />,            <-- the View to show
  //  pos: e,                    <-- bounding react {left:x1, right:x2, width: ...etc}
  //  onPop: (e) => {},          <-- a function to call when the view is popped, call e.preventDefault() to prevent the pop
  //  onClickOutside:, (e) = {}, <-- a function to call when someone clicks outside of the modal area. Call e.preventDefault() to prevent the default action (to pop), call e.stopPropagation() to stop other modals in the stack getting the clickOutside event
  //  align: ['left','right'],   <-- an array of alignments from the 'pos' in the order they are prefurred [top/left/bottom/right/center]
  // })
  // ...later
  // m.pop()
  push(m){
    if( !m.view ){
      throw new Error(`cannot push ${m.view} on to the modal stack`);
    }
    if( m.onPop && typeof m.onPop != 'function' ){
      throw new Error(`onPop must be function`);
    }
    if( m.onClickOutside && typeof m.onClickOutside != 'function' ){
      throw new Error(`onClickOutside must be function`);
    }
    if( m.onClickOutside === false ){
      m.onClickOutside = (e) => e.preventDefault();
    }
    let stack = this.state.stack.slice();
    stack.push(m);
    this.setState({stack});
    m.pop = () => {
      this.popTo(m.view);
    };
    return m;
  }

  // pop removes the topmost View from the stack and triggers a render.
  // if the item on the stack has an onPop handler, then it will be called.
  // it returns the popped view.
  // if the onPop event prevented the item from getting popped it returns false.
  // it is a no op and returns null if the stack is empty
  pop(){
    let e = this._pop();
    if( !e.defaultPrevented ){
      this.setState({
        stack: this.state.stack.slice(0, -1)
      });
    }
    return e.view;
  }

  // do the pop without updating the state
  // returns the pop event
  _pop(){
    if( this.state.stack.length == 0 ){
      return null;
    }
    let m = this.state.stack[this.state.stack.length - 1];
    let e = new PopEvent(m.view);
    if( m.onPop ){
      m.onPop(e);
    }
    return e;
  }

  isInStack(view){
    for(let i=0; i<this.state.stack.length; i++){
      if( this.state.stack[i].view == view ){
        return true;
      }
    }
    return false;
  }

  // popTo will pop modals from the stack upto (and including) view
  // if m is not in the stack this is a noop
  // if m is falsey it will pop everything
  popTo(view){
    if( !this.isInStack(view) ){
      return false;
    }
    let popped = 0;
    for(let i=this.state.stack.length-1; i>-1; i--){
      let e = this._pop();
      if( e.defaultPrevented){
        break;
      }
      popped++;
      if( e.propagationStopped ){
        break;
      }
      if( e.view == view ){
        break;
      }
    }
    if( popped > 0 ){
      this.setState({
        stack: this.state.stack.slice(0, this.state.stack.length-popped)
      });
    }
  }

  // popAll resets the stack, clearing all modals and firing their onPop event
  // one-by-one. The process can be halted by an onPop event calling stopPropagation
  popAll(){
    return this.popTo(null);
  }

  nodeForModalItem(i){
    let refName = `view_${i}`;
    if( !this.refs[refName] ){
      return false;
    }
    return this.refs['view_'+i].refs.view;
  }

  // bubble click events to each modal
  // fired from rootView
  onClickOutside(e){
    for(let i=this.state.stack.length-1; i>-1; i--){
      let m = this.state.stack[i];
      // check if the event target is inside the modal
      let node = this.nodeForModalItem(i);
      if( node && node.contains(e.target) ){
        return false;
      }
      if( m.onClickOutside ){
        m.onClickOutside(e);
      }
      // default action is to pop the modal stack from that point up
      if( !e.isDefaultPrevented() ){
        this.popTo(m.view);
      }
      if( e.isPropagationStopped() ){
        break;
      }
    }
  }

  render(){
    let enableEvents = {pointerEvents:'auto'};
    let modals = this.state.stack.map((m,i) => {
      let ref = 'view_'+i;
      let style = {};
      let pos = m.pos;
      if( m.owner ){ // the "owner" is the component that we are "popping up" from
        let ownerNode = m.owner.refs.view;
        if( !ownerNode ){
          throw new Error(`cannot use a non View owner`);
        }
        pos = {
          left: ownerNode.offsetLeft,
          top: ownerNode.offsetTop,
        };
        // if owner's node is already in one of our modals
        // then offset from that
        let ownerModal;
        for(let i=0; i<this.state.stack.length; i++){
          let ownerRoot = this.nodeForModalItem(i);
          if( ownerRoot && ownerRoot.contains(ownerNode) ){
            ownerModal = ownerRoot;
            break;
          }
        }
        if( ownerModal ){
          pos.top += ownerModal.parentNode.offsetTop;
          pos.left += ownerModal.parentNode.offsetLeft;
        }
        // align right of owner
        pos.left += ownerNode.offsetWidth;
        style.transformOrigin = 'top left';
      }
      if( pos ){
        style.display = 'block';
        style.position = 'absolute',
        style.left = pos.left;
        style.top = pos.top;
      }
      return (
        <div key={i} className="modal" style={style}>
          <View ref={ref} style={enableEvents} layer={0} raised={3} size="intrinsic">{m.view}</View>;
        </div>
      );
    });
    return (
      <div className="modals" ref="self">
        {modals}
      </div>
    );
  }

}
