import React from 'react';
import View from '../../package/View';
import PaletteTable from './PaletteTable';

export default class PaletteDemo extends React.Component {

  render(){
    return (
      <View scroll>
        <View row>
          <h2>Colour Palette Tables</h2>
        </View>
        <PaletteTable row raised />
      </View>
    );
  }
}

