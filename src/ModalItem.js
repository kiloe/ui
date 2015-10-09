import React from 'react';
import ReactDOM from 'react-dom';
import View from './View';
import CSS from './utils/css';

CSS.register({
  '.modal': {
    position: 'absolute',
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
  '.modal .inner.off': {
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

export default class ModelItem extends React.Component {
  static propTypes = {
    // should the modal overlay (rather next offset from) the emitting element (think menus/select)
    obscure: React.PropTypes.bool,
    // direction the modal would prefur to appear relative to the owner
    direction: React.PropTypes.string,
    // if owner is set them modal will be attach to it
    // use direction to set which side
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

  // move the modal wrapper to the correct place
  updatePosition(){
    let style = this.refs.wrapper.style;
    let pos = this.getPosition();
    for(let k in pos){
      style[k] = pos[k] + 'px';
    }
    if( this.props.obscure ){
      let ownerNode = this.getOwnerNode();
      if( ownerNode ){
        console.log('setting iwnmin', ownerNode.offsetWidth);
        this.refs.inner.refs.view.style.minWidth = ownerNode.offsetWidth + 'px';
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
    let dir = this.props.direction;
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
      console.log('using owner wrapper', ownerWrapper);
      ownerWrapperTop = ownerWrapper.offsetTop;
      ownerWrapperLeft = ownerWrapper.offsetLeft;
    }
    if( !dir ){
      dir = 'left';
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

  // remove this modal (and all above it)
  pop(){
    this.props.pop();
  }

  // fired when someone clicks outside of modal
  onClickOutside(e){
    if( this.props.onClickOutside ){
      this.props.onClickOutside(e);
    }
    if( !e.defaultPrevented ){
      this.pop();
    }
    else{console.log('default was prevented ... not popping');}
  }

  render(){
    if( this.props._reg ){
      this.props._reg(this); // XXX: hack to get onClickOutsite to work, there must be a better way
    }
    let innerStyle = {};
    let style = {};
    if( this.props.owner ){ // attached to element
      style.display = 'block';
      innerStyle.transformOrigin = this.getOrigin();
    }else{ // fullscreen
      style.width = '100%';
      style.height = '100%';
      if( this.props.shade ){
        style.backgroundColor = 'rgba(0,0,0,0.2)';
      }
    }
    let view = React.cloneElement(
      React.Children.only(this.props.children),
      {ref:'inner'}
    );
    return (
      <div ref="wrapper" className="modal" style={style}>
        <View layer={0} raised={3} size="intrinsic" className="inner" style={innerStyle}>{view}</View>;
      </div>
    );
  }
}
