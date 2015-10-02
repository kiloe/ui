import React from 'react';
import View from '../../src/View';
import PaletteTable from './PaletteTable';

export default class PaletteDemoView extends View {

  static styles = {
    ...View.styles,
    ...PaletteTable.styles,
  }

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

