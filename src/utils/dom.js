import React from 'react';
import ReactDOM from 'react-dom';
import CSS from './css';

// DOM.render renders the given component class with the given props
// into the document along with any styles defined on the class.
// It always renders into the same target (#app) and replaces previous content
// when called multiple times.
export function render(jsx){
  let id = 'app';
  let target = document.getElementById(id);
  if( !target ){
    target = document.createElement('div');
    target.id = id;
    document.body.appendChild(target);
  }
  CSS.render(jsx.type);
  return ReactDOM.render(jsx, target);
}

export default {
  render
}
