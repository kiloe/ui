import React from 'react';
import View from '../../src/View';

import PaletteTableView from '../../src/PaletteTableView';

export default class PaletteDemoView extends View {

  static styles = {
    ...View.styles,
    ...PaletteTableView.styles,
  }


  render(){

    return (
      <View scroll>
        <View row>
          <h2>Colour Palette Tables</h2>
        </View>
        <PaletteTableView row raised />
      </View>
    );
  }
}

