import ReactDOM from 'react-dom';
import CSSPropertyOperations from 'react/lib/CSSPropertyOperations';

// required global browser styles/resets
var globalStyles = {
  'html': {
    fontFamily: `'Roboto', sans-serif`,
    WebkitTapHighlightColor: 'transparent',
    fontSize: 12,
  },
  '*, *:before, *:after': {
    WebkitTapHighlightColor: 'inherit',
  },
  'html,body,#app': {
    margin:0,
    padding: 0,
    display: 'flex',
    flex: '0 0 100%',
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    alignContent: 'stretch',
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    background: '#ccc'
  },
};

// CSS.render will ask the component for any styles it uses, then
// render a <style> tag into the document.
// If called multiple times it will replace the previous style.
export function render(component){
  let id = 'app-style';
  let oldStyle = document.getElementById(id);
  if( oldStyle ){
    document.head.removeChild(oldStyle);
  }
  let css = createMarkupForComponent(component);
  let style = document.createElement('style');
  style.id = id;
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  document.head.appendChild(style);
}

// CSS.createMarkupForComponent will ask the component for any styles it uses,
// and return the CSS markup.
export function createMarkupForComponent(component){
  let styles = {
    ...globalStyles,
    ...component.styles,
  };
  return Object.keys(styles).map(selector => {
    let props = styles[selector];
    if( typeof props == 'object' ){
      props = expandTransitionStyle(props);
      props = CSSPropertyOperations.createMarkupForStyles(props);
    }
    return `${selector} { ${props} }`;
  }).join('\n');
}

// Convert transition styles {left: '600ms ease'} => 'left 600ms ease'.
function expandTransitionStyle(props){
  return Object.keys(props).reduce( (o,k) => {
    if( k == 'transition' && typeof props[k] == 'object' ){
      o[k] = Object.keys(props[k]).map( propName => {
        return `${propName} ${props[k][propName]}`;
      }).join(',');
    }
    return o;
  },props);
}

// like calling getComputedStyle(node).getPropertyValue(cssProp)
// but for React components
export function getProperty(component, prop){
  let node = ReactDOM.findDOMNode(component);
  if( !node ){
    throw new Error('no dom node for component');
  }
  let style = getComputedStyle(node);
  if( !style ){
    throw new Error('no computed style for component');
  }
  if( !prop ){
    throw new Error('missing style propety argument');
  }
  return style.getPropertyValue(prop);
}

// convert a color (hex/name/rgb) to whatever format getComputedStyle returns.
// should only be used in tests really.
export function toRGBA(color){
  let div = document.createElement('div');
  div.style.backgroundColor = color;
  div.id = 'toRGBA-tmp';
  document.body.appendChild(div);
  let rgba = getComputedStyle(div).getPropertyValue('background-color');
  document.body.removeChild(div);
  return rgba;
}

const transitions = {
  swift: '300ms cubic-bezier(0.23, 1, 0.32, 1)',
  smooth: '500ms cubic-bezier(1, 0, 0, 1)'
};

const CSS = {
  render,
  createMarkupForComponent,
  getProperty,
  toRGBA,
  transitions
};

export default CSS;
