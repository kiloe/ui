import React from 'react';
import View from '../../package/View';
import everything from './all';

export default class IconsDemo extends React.Component {

  render(){
    let s = {
      padding: '1rem',
      alignItems: 'center',
    };
    return (
      <View scroll>
        <View row>
          <h2>Icons</h2>
        </View>
        <View row style={{flexWrap:'wrap'}}>
          {Object.keys(everything).filter(name => {
            return /.Icon/.test(name);
          }).map(name => {
            return everything[name];
          }).map(Icon => {
            return (
              <View key={Icon.name} size={15} style={s}>
                <Icon size={3} />
                <View>{Icon.name}</View>
              </View>
            );
          })};
        </View>
      </View>
    );
  }
}

