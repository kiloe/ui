import React from 'react';
import View from '../../src/View';
import {ICONS} from './IconList';

export default class IconsDemo extends React.Component {

  render(){
    let s = {
      padding: '1rem',
      alignItems: 'center',
    };
    let icons = ICONS.map(Icon => {
      return (
        <View key={Icon.name} size={15} style={s}>
          <Icon size={3} />
          <View>{Icon.name}</View>
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

