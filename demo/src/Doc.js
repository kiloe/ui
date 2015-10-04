import React from 'react';
import View from '../../package/View';
import Button from '../../package/Button';
import CloudIcon from '../../package/icons/CloudIcon';
import * as babel from 'babel';

window.React = React;
window.View = View;
window.Button = Button;
window.CloudIcon = CloudIcon;

function compile(src){
  let input = `(function(){ return (${src}); })()`;
  return eval(babel.transform(input).code);
}

function val(v){
  if( typeof v == 'string' ){
    return `"${v}"`;
  }
  if( typeof v == 'function' ){
    return `{${v.name}}`;
  }
  return `{${JSON.stringify(v)}}`;
}

function spread(o){
  return Object.keys(o).map(k => {
    if( o[k] === true ){
      return k;
    }
    return k + `=${val(o[k], true)}`;
  }).join(' ');
}

function jsx(strings, ...values){
  return strings.map( (s, i) => {
    let v = values[i];
    if( typeof v == 'undefined' ){
      return s;
    }
    if( typeof v == 'object' ){
      return s + spread(v);
    }
    return s + val(v);
  }).join('');
}

function clean(src){
  src = src.replace(/\s+>/g,'>');
  return src;
}

// Doc renders it's children and the raw source of the children in
// a little tabbed pane/card so you can see how it is made
export default class Doc extends React.Component {

  static jsx = jsx

  render(){
    let src = clean(this.props.src);
    let el = compile(src);
    let view = React.cloneElement(el, {style: {padding:'2rem'}});
    return (
      <View>
        <View>
          <code style={{whiteSpace:'pre'}}>{src}</code>
        </View>
        <View raised style={{margin:'2rem 0'}}>
          {view}
        </View>
      </View>
    );
  }

}
