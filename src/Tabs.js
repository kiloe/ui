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
    if( this.isRow() ){
      indicatorEl.style.left = selectedEl.offsetLeft + 'px';
      indicatorEl.style.width = selectedEl.offsetWidth + 'px';
    } else {
      indicatorEl.style.top = selectedEl.offsetTop + 'px';
      indicatorEl.style.height = selectedEl.offsetHeight + 'px';
    }
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
    style.marginBottom = this.getIndicatorSize() + 'rem';
    return style;
  }

  getIndicatorSize(){
    return 0.2;
  }

  render(){
    let theme = this.getTheme({paletteMode: 'primary'});
    let indicatorStyle = {
      position: 'absolute',
      background: theme.getBackgroundColor(),
      visibility: 'hidden', // unset in componentDidUpdate
    };
    if( this.isRow() ){
      indicatorStyle.bottom = 0;
      indicatorStyle.width = '100%';
      indicatorStyle.height = this.getIndicatorSize() + 'rem';
    } else {
      indicatorStyle.left = 0;
      indicatorStyle.width = this.getIndicatorSize() + 'rem';
      indicatorStyle.height = '100%';
    }
    let children = React.Children.map(this.props.children, (tab,i) => {
      let props = {
        onClick: this.handleSelected.bind(this,i),
      };
      if( i == this.props.selected ){
        props.ref = 'selected';
        props.color = theme.getBackgroundColor();
        // props.outline = true;
        // props.primary = true;
      }
      return React.cloneElement(tab, props);
    });
    return super.render([
      <View row={this.isRow()}>
        {children}
      </View>,
      <div ref="indicator" className="indicator" style={indicatorStyle}></div>
    ]);
  }

}
