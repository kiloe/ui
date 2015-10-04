import React from 'react';

import View from '../../package/View';
import Button from '../../package/Button';
import CloudIcon from '../../package/icons/CloudIcon';

import Doc from './Doc';

export default class ButtonsDemo extends React.Component {

  renderRow(flags, bgFlags){
    flags.style = {margin: '0 1rem'};
    let desc = Object.keys(flags).map(k => {
      if( k == 'size' ){
        return flags.size;
      }
      return k;
    }).sort().join(', ');
    if( flags.size == Button.defaultProps.size ){
      delete flags.size;
    }
    let src = Doc.jsx`
      <View row ${bgFlags}>
        <Button ${flags} disabled />
        <Button ${flags} />
        <Button ${flags} raised />
      </View>
    `;
    return (
        <Doc src={src}>{desc}</Doc>
    );
  }

  render(){

    let labelFlags = [{label:'button'}, {label:'button', icon:CloudIcon}, {icon:CloudIcon}];
    let invertFlags = [{},{invert:true}];
    let sizeFlags = [{size:'intrinsic'},{size:'fill'}];
    let paletteFlags = [{},{primary:true},{accent:true}];
    let transFlags = [{},{transparent:true}];
    let bgFlags = [{},{primary:true}];

    let examples = bgFlags.map(bg => {
      return sizeFlags.map(s => {
        return labelFlags.map(l => {
          return invertFlags.map(i => {
            return paletteFlags.map(p => {
              return transFlags.map(t => {
                return this.renderRow({...s,...l,...i,...p,...t}, bg);
              });
            });
          });
        });
      });
    });

    return (
      <View scroll>
        {examples}
      </View>
    );
  }
}

