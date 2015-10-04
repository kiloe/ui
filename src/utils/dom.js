import ReactDOM from 'react-dom';
import CSS from './css';

// DOM.render is just a wrapper around ReactDOM.render that also renders the CSS.
export function render(jsx, target){
  CSS.render();
  return ReactDOM.render(jsx, target);
}

export default {
  render
};
