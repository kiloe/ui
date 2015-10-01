import React from 'react';
import View from './View';

export default class Menu extends React.Component {

  static propTypes = {
    ...View.propTypes,
    style: React.PropTypes.object,
  }

  static styles = {
    ...View.styles,
  }

  render(){
    let viewProps = {
      raised: 1,
      theme: {mode: 'light'},
      row: false,
      style: {
        position: 'absolute',
        display: 'flex',

        ...this.props.style,
      }
    };
    return (
      <View {...viewProps}>
        {this.props.children}
      </View>
    );
  }

}
