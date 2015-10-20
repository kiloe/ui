import React from 'react';
import moment from 'moment';

import View from './View';
import Text from './Text';
import Button from './Button';
import {ThemeManager} from './utils/themeManager';

// Hour is a selectable point on the 'clock'
class Hour extends React.Component {

  static propTypes = {
    active: React.PropTypes.bool,
  }

  getStyle(){
    let style = {};
    style.flex = '0 0 14%';
    style.textAlign = 'center';
    style.padding = '0.75rem 1rem';
    style.boxSizing = 'border-box';
    style.marginLeft = 0;
    return style;
  }

  render(){
    return <Button
      circular
      onClick={this.props.onClick}
      primary={this.props.active}
      subtle={this.props.subtle}
      style={this.getStyle()}
      label={this.props.children}
    />;
  }
}

// DatePicker is a calendar view  of dates
export default class TimePicker extends React.Component {

  static propTypes = {
    // the initial time that will be pre-selected
    initialTime: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.date,
      React.PropTypes.object, // moment
    ]),
    // set ampm to use non-24hr clock
    ampm: React.PropTypes.bool,
    // after a time is selected the onSelected handler will be called with the 'moment'
    onSelected: React.PropTypes.func,
    // if cancel button is clicked the onCancel handler will be called
    onCancel: React.PropTypes.func,
  }

  constructor(...args){
    super(...args);
    let initial = this.getInitialTime();
    this.state = {
      selected: initial,
    };
  }

  getInitialTime(){
    let initial = this.props.initialTime;
    if( !initial ){
      return moment();
    }
    return moment(initial);
  }

  selectHour(hr){
    let selectedHour = this.state.selected.hour();
    if( this.props.ampm && (selectedHour > 12 || selectedHour == 0) ){
      hr += 12;
    }
    this.setState({
      selected: moment(this.state.selected).hour(hr),
      selectingMins: true,
    });
  }

  selectMin(min){
    console.log('selectMin', min);
    this.setState({
      selected: moment(this.state.selected).minute(min)
    });
  }

  selectTick(n){
    if( this.state.selectingMins ){
      this.selectMin(n);
    } else {
      this.selectHour(n);
    }
  }

  onSelected = () => {
    if( !this.props.onSelected ){
      console.log('selected', this.state.selected.toString(), 'set an onSelected handler to recevie the value');
      return;
    }
    this.props.onSelected(this.state.selected);
  }

  onCancel = () => {
    if( !this.props.onCancel ){
      console.log('set an onCancel handler to handle cancel');
      return;
    }
    this.props.onCancel();
  }

  getTheme(override){
    return new ThemeManager({
      ...this.context.theme,
      ...override,
    });
  }

  tick(i, step, total, mode){
    let angle = 360.0 / total * i;
    let n = i*step;
    let selected;
    if( mode == '24hr' || mode == '12hr' ){
      if( n == 0 ){
        n = total;
      }
      if( mode == '24hr' ){
        n += 12;
      }
      if( n == 24 ){
        n = '00';
      }
      console.log(n);
      let selectedHour = this.state.selected.hour();
      if( this.props.ampm ){
        if( selectedHour > 12 ){
          selectedHour -= 12;
        }
        if( selectedHour == 0 ){
          selectedHour = 12;
        }
      }
      selected = n == selectedHour;
    }
    if( mode == 'mins' ){
      let nearestFive = Math.round(this.state.selected.minute()/5.0)*5;
      selected = n == nearestFive;
    }
    let theme = this.getTheme({paletteMode: 'primary'});
    let fillColor = selected ? theme.getBackgroundColor() : 'transparent';
    let textColor = selected ? theme.getTextColor() : 'black';
    let faceRadius = mode == '24hr' ? 175 : 250;
    return (
      <g key={n} transform={`rotate(${angle})`} onClick={this.selectTick.bind(this,n)} style={{cursor:'pointer'}}>
        <line x1="0" y1="0" x2="0" y2={`-${faceRadius}`} style={{stroke:fillColor,strokeWidth:3}}/>
        <circle cx="0" cy={`-${faceRadius}`} r="40" style={{fill:fillColor}} />
        <g transform={`translate(0,-${faceRadius})`}>
          <text className="label" style={{textAnchor:'middle',fontSize:28}} fill={textColor} transform={`rotate(-${angle}) translate(0,10)`}>{n}</text>
        </g>
      </g>
    );
  }

  getTicks(divisions, step, mode){
    let ticks = [];
    for( let i=0; i<divisions; i++ ){
      ticks.push(this.tick(i, step, divisions, mode));
    }
    return ticks;
  }

  getHours(){
    let hours = this.getTicks(12,1, '12hr');
    if( this.props.ampm ){
      return hours;
    }
    return hours.concat(this.getTicks(12,1,'24hr'));
  }

  getMins(){
    return this.getTicks(12,5, 'mins');
  }

  setAM(isAM){
    let selectedHour = this.state.selected.hour();
    if( isAM && selectedHour > 12 ){
      this.setState({selected: moment(this.state.selected).hour(selectedHour-12)});
    } else if( !isAM && selectedHour <= 12 ){
      this.setState({selected: moment(this.state.selected).hour(selectedHour+12)});
    }
  }

  render(){
    let format = 'HH:mm';
    if( this.props.ampm ){
      format = 'h:mm A';
    }
    let faceColor = 'rgb(250,250,250)';
    let selectedHour = this.state.selected.hour();
    let ampmButtons;
    if( this.props.ampm && !this.state.selectingMins ){
      ampmButtons = <View row pad>
        <Button circular primary={selectedHour <= 12 && selectedHour > 0} label="AM" onClick={this.setAM.bind(this,true)}/>
        <View />
        <Button circular primary={selectedHour > 12 || selectedHour == 0} label="PM" onClick={this.setAM.bind(this,false)} />
      </View>;
    }
    let ticks = this.state.selectingMins ?
      this.getMins() :
      this.getHours();
    return (
      <View size={25} raised>
        <View primary style={{padding:'1.5rem'}}>
          <Text headline>{this.state.selected.format(format)}</Text>
        </View>
        <View>
          <svg style={{width:'100%', height:'100%'}} xmlns="http://www.w3.org/2000/svg" xmlnsXink="http://www.w3.org/1999/xlink" viewBox="0 0 650 650" preserveAspectRatio="xMidYMid meet" width="350" height="350">
            <circle cx="320" cy="320" r="300" style={{fill:faceColor}} />
            <g className="clock-face" transform="translate(325,325)">
              {ticks}
            </g>
          </svg>
        </View>
        {ampmButtons}
        <View row pad align="right">
          <Button label="Cancel" onClick={this.onCancel} />
          <Button label="OK" onClick={this.onSelected} />
        </View>
      </View>
    );
  }
}
