import React from 'react';
import View from '../../package/View';
import Card from '../../package/Card';
import Text from '../../package/Text';
import * as babel from 'babel';
import {exec} from './all';

function compile(src){
  return exec(babel.transform(src,{blacklist: ['strict']}).code);
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
    let view = compile(src);
    let padding = {padding:'2rem'};
    return (
      <Card onClick={this.props.onClick}>
        <Title>{this.props.title || 'set title prop!'}</Title>
        <View raised style={padding} row>
          {view}
        </View>
        <Text>
          <code style={{whiteSpace:'pre'}}>{src}</code>
        </Text>
        <Text>
          {this.props.children}
        </Text>
      </Card>
    );
  }

}
