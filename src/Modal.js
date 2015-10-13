import React from 'react';
import ReactDOM from 'react-dom';
import CSS from './utils/css';
import shallowEqual from 'fbjs/lib/shallowEqual';

// Modal

CSS.register({
  '.modal': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  '.modal .inner': {
    animationDuration: '300ms',
    animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
    animationFillMode: 'forwards',
    transformOrigin: '50% 50%',
    // maxHeight: '100vh',
    // maxWidth: '100vw',
  },
  '@keyframes modalScaleIn': `
    0% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  `,
  '@keyframes modalSlideDown': `
    0% {
      opacity: 0;
      transform: translateY(-10px) scaleY(0.5);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scaleY(1);
    }
  `,
});

export default class Modal extends React.Component {

  static propTypes = {
    // id is a globally unique name for this modal - it is required because modals are weird, think of it like a React 'key' prop
    id: React.PropTypes.string.isRequired,
    // should the modal cover (rather next offset from) the emitting element (think menus/select)
    obscure: React.PropTypes.bool,
    // direction the modal would prefur to appear relative to the owner
    direction: React.PropTypes.string,
    // if owner is set to DOM node them modal will be attach to it
    owner: React.PropTypes.object,
    // shade adds a dim effect to the page
    shade: React.PropTypes.bool,
    // onClickOutside is an event fired when someone clicks away from the modal
    // default behaviour is to pop the modal... but you can call preventDefault on this event to stop that
    onClickOutside: React.PropTypes.func,
  }

  componentDidMount(){
    this.updatePosition();
  }

  componentWillUnmount(){
    document.body.removeEventListener('click', this.onClickBody);
  }

  shouldComponentUpdate(nextProps, nextState){
    if( !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) ){
      return true;
    }
    return false;
  }

  // move the modal wrapper to the correct place
  updatePosition(){
    let ownerNode = this.getOwnerNode();
    let wrapper = this.refs.wrapper;
    let pos = this.getPosition();
    for(let k in pos){
      wrapper.style[k] = pos[k] + 'px';
    }
    // if onscuring then make sure we completely cover the owner
    if( this.props.obscure ){
      if( ownerNode ){
        this.refs.inner.firstChild.style.minWidth = ownerNode.offsetWidth + 'px';
      }
    }
  }

  getOwnerNode(){
    let owner = this.props.owner;
    if( !owner ){
      return;
    }
    let ownerNode = ReactDOM.findDOMNode(owner);
    if( !ownerNode ){
      throw new Error(`no dom node for owner?`, owner);
    }
    return ownerNode;
  }

  // get the abspositioning based on alignment to owner
  // requires DOM so must be caleld when refs available.
  getPosition(){
    let dir = this.props.direction || 'left';
    let pos = this.props.pos || {};
    let obscure = this.props.obscure;
    if( !this.props.owner ){
      return pos;
    }
    let ownerNode = this.getOwnerNode(this.props.owner);
    let ownerWrapperTop = 0;
    let ownerWrapperLeft = 0;
    if( this.refs.wrapper.parentNode.contains(ownerNode) ){
      let ownerWrapper = ownerNode;
      while( ownerWrapper && ownerWrapper.className != 'modal' ){
        ownerWrapper = ownerWrapper.parentNode;
      }
      ownerWrapperTop = ownerWrapper.offsetTop;
      ownerWrapperLeft = ownerWrapper.offsetLeft;
    }
    if( dir == 'left' ){
      pos.top = ownerWrapperTop + ownerNode.offsetTop;
      pos.right = ownerWrapperLeft + ownerNode.offsetLeft;
      if( !obscure ){
        pos.right += ownerNode.offsetWidth;
      }
    } else if( dir == 'right' ){
      pos.top = ownerWrapperTop + ownerNode.offsetTop;
      pos.left = ownerWrapperLeft + ownerNode.offsetLeft + ownerNode.offsetWidth;
      if( obscure ){
        pos.left -= ownerNode.offsetWidth;
      }
    } else if( dir == 'top' ){
      pos.bottom = ownerWrapperTop + ownerNode.offsetTop;
      pos.left = ownerWrapperLeft + ownerNode.offsetLeft;
      if( obscure ){
        pos.bottom -= ownerNode.offsetHeight;
      }
    } else if( dir == 'bottom' ){
      pos.top = ownerWrapperTop + ownerNode.offsetTop;
      pos.left = ownerWrapperLeft + ownerNode.offsetLeft;
      if( !obscure ){
        pos.top -= ownerNode.offsetHeight;
      }
    } else {
      console.warn(`invalid direction ${dir} for modal popup`);
    }
    return pos;
  }

  getOrigin(){
    switch( this.props.direction || 'left' ){
      case 'left'  : return 'top right';
      case 'right' : return 'top left';
      case 'top'   : return 'bottom center';
      case 'bottom': return 'top center';
      default      : return '50% 50%';
    }
  }

  // is node inside this modal
  contains(node){
    return this.refs.inner.contains(node);
  }

  // fired when someone clicks outside of modal
  onClickOutside(e){
    if( this.props.onClickOutside ){
      this.props.onClickOutside(e);
    }
  }

  getContent(){
    return React.Children.only(this.props.children);
  }

  render(){
    let innerStyle = {};
    innerStyle.animationName = 'modalScaleIn';
    innerStyle.pointerEvents = 'auto';
    let style = {};
    if( !this.props.shade ){
      style.pointerEvents = 'none';
    }
    if( this.props.owner ){ // attached to element (top/left will be set once DOM available)
      style.position = 'absolute';
      style.display = 'block';
      innerStyle.transformOrigin = this.getOrigin();
      if( this.props.direction == 'bottom' ){
        innerStyle.animationName = 'modalSlideDown';
      }
    }else{ // fullscreen
      style.position = 'fixed';
      style.top = 0;
      style.left = 0;
      if( this.props.pos ){
        innerStyle.position = 'absolute';
        for(let k in this.props.pos ){
          innerStyle[k] = this.props.pos[k];
        }
      }
      style.width = '100%';
      style.height = '100%';
      if( this.props.shade ){
        style.backgroundColor = 'rgba(0,0,0,0.2)';
      }
    }
    return (
      <div ref="wrapper" className="modal" style={style}>
        <div ref="inner" className="inner" style={innerStyle}>
          {this.getContent()}
        </div>
      </div>
    );
  }
}
