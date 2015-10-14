import React from 'react';
import View from '../../package/View';
import Card from '../../package/Card';
import Text from '../../package/Text';
import Button from '../../package/Button';
import PlayArrowIcon from '../../package/icons/PlayArrowIcon';
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

// Globall function to stop all Doc demos
// To be used in jsx doc examples to stop/start the example
let demos = {};
window.stopDemo = function(){
  for(let id in demos){
    demos[id].onStopDemo();
  }
};

// Doc renders it's children and the raw source of the children in
// a little tabbed pane/card so you can see how it is made
export default class Doc extends React.Component {

  static jsx = jsx

  constructor(...args){
    super(...args);
    this.state = {};
    this.id = Math.random().toString();
  }

  componentDidMount(){
    demos[this.id] = this;
  }

  componentWillUnmount(){
    delete demos[this.id];
  }

  onStopDemo = () => {
    this.setState({running: false});
  }

  run = () => {
    this.setState({running: true});
  }

  render(){
    let src = clean(this.props.src);
    let view;
    if( this.props.clickToRun && !this.state.running ){
      view = <Button icon={PlayArrowIcon} onClick={this.run} />;
    } else {
      view = compile(src);
    }
    let containerProps = this.props.container || {};
    containerProps.style = containerProps.style || {};
    containerProps.style.padding = containerProps.style.padding || 20;
    return (
      <Card onClick={this.props.onClick}>
        <Text title>{this.props.title || 'set title prop!'}</Text>
        <View {...containerProps} row layer={0}>
          {view}
        </View>
        <Text>
          <code style={{whiteSpace:'pre'}}>{src}</code>
        </Text>
        <Text raised>
          {this.props.info || this.props.children}
        </Text>
      </Card>
    );
  }

}
