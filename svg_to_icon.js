
var fs = require('fs');
var camelize = require('camelize');

var TEMPLATE = "\
import React from 'react';\n\
import IconView from '../IconView';\n\n\
export default class CLASS_NAME extends IconView {\n  getSVG(){return SVG_DATA;}\n};";

var FILEPAT = /ic_(.*)_\d+px.svg/;

function render(filename){
  var match = filename.match(FILEPAT);
  if( !match ){
    console.error('skipping',filename, 'as didnt understand filename');
    return;
  }
  var name = camelize(match[1]);
  // prepend with underscore if starts with a number
  if( /^\d/.test(name) ){
    name = '_'+name;
  }
  name = name[0].toUpperCase() + name.slice(1) + 'Icon';
  var js = TEMPLATE
    .replace('CLASS_NAME', name)
    .replace('SVG_DATA', fs.readFileSync(filename))
    .replace(/\b\w+:(\w+=)/g, '$1'); // strip namespaces
  var outname = 'src/icons.build/'+name+'.js';
  fs.writeFileSync(outname, js);
  console.log('created '+outname);
}

render(process.argv[2]);
