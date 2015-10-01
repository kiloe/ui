import React from 'react';
import View from '../../src/View';
import {ICONS} from './IconList';

export default class IconDemo extends View {

  render(){
    let s = {
      padding: '1rem',
      alignItems: 'center',
    };
    let icons = ICONS.map(icon => {
      let name = icon.type.name;
      return (
        <View key={name} size={15} style={s}>
          {icon}
          <View>{name}</View>
        </View>
      );
    });
    return (
      <View scroll>
        <View row>
          <h2>Icons</h2>
        </View>
        <View row style={{flexWrap:'wrap'}}>
          {icons}
        </View>
      </View>
    );
  }
}

