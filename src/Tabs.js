import React from 'react';
import CSS from './utils/css';
import View from './View';

CSS.register({
  '.tabs > .indicator': {
    transition: {
      all: CSS.transitions.swift,
    }
  }
});

export default class Tabs extends View {

  static propTypes = {
    ...View.propsTypes,
    // selected sets the index of the selected item
    selected: React.PropTypes.number,
    // onSelected will be called with the selected index on click
    onSelected: React.PropTypes.func,
  }

  static defaultProps = {
    ...View.defaultProps,
    row: true,
  }

  handleSelected(idx){
    if( this.props.onSelected ){
      this.props.onSelected(idx);
    }
  }

  componentDidUpdate(){
    let indicatorEl = this.refs.indicator;
    let selectedEl = this.refs.selected.refs.view;
    indicatorEl.style.left = selectedEl.offsetLeft + 'px';
    indicatorEl.style.width = selectedEl.offsetWidth + 'px';
    indicatorEl.style.visibility = 'visible';
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.tabs = true;
    return cs;
  }

  getStyle(){
    let style = super.getStyle();
    style.position = 'relative';
    style.marginBottom = '0.5rem';
    return style;
  }

  render(){
    let theme = this.getTheme({paletteMode: 'primary'});
    let indicatorStyle = {
      position: 'absolute',
      bottom: 0,
      left:0,
      background: theme.getBackgroundColor(),
      width: '100px',
      height: '0.5rem',
      visibility: 'hidden', // unset in componentDidUpdate
    };
    let children = React.Children.map(this.props.children, (tab,i) => {
      let props = {
        onClick: this.handleSelected.bind(this,i),
      };
      if( i == this.props.selected ){
        props.ref = 'selected';
        // props.outline = true;
        // props.primary = true;
      }
      return React.cloneElement(tab, props);
    });
    return super.render([
      <View row>
        {children}
      </View>,
      <div ref="indicator" className="indicator" style={indicatorStyle}></div>
    ]);
  }

}
