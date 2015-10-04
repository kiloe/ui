import React from 'react';
import View from '../../package/View';

import Button from '../../package/Button';
// import IconButton from '../../package/IconButton';
// import AddIcon from '../../package/icons/AddIcon';
// import FormatPaintIcon from '../../package/icons/FormatPaintIcon';
import CloudIcon from '../../package/icons/CloudIcon';


export default class ButtonsDemo extends React.Component {

  renderRow(flags, bgFlags){
    let style = {margin: '0 10px'};
    let desc = Object.keys(flags).map(k => {
      if( k == 'size' ){
        return flags.size;
      }
      return k;
    }).sort().join(', ');
    return (
        <View row>
          <View size={20} style={{fontSize:'1rem'}}>{desc}</View>
          <View>
            <View style={{margin:'2rem 0',padding:'2rem'}} row raised {...bgFlags}>
              <Button style={style} {...flags} disabled />
              <Button style={style} {...flags} />
              <Button style={style} {...flags} raised />
            </View>
          </View>
        </View>
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

