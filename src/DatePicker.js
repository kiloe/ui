import React from 'react';
import moment from 'moment';

import View from './View';
import Text from './Text';
import Button from './Button';
import Picker from './Picker';
import KeyboardArrowLeftIcon from './icons/KeyboardArrowLeftIcon';
import KeyboardArrowRightIcon from './icons/KeyboardArrowRightIcon';

// Day is a selectable square on the calender grid
class Day extends React.Component {

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
export default class DatePicker extends Picker {

  static propTypes = {
    initialDate: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.date,
      React.PropTypes.object, // moment
    ]),
    // after a date is selected the onSelected handler will be called with the 'moment'
    onSelected: React.PropTypes.func,
    // if cancel button is clicked the onCancel handler will be called
    onCancel: React.PropTypes.func,
    // formatValue sets how the value is returned via onSelected
    formatValue: React.PropTypes.string,
  }

  static defaultProps = {
    ...Picker.defaultProps,
    formatValue: 'LL',
  }

  constructor(...args){
    super(...args);
    let initial = this.getInitialDate();
    this.state = {
      viewing: initial,
      selected: initial,
    };
  }

  getInitialDate(){
    let initial = this.props.initialDate;
    if( !initial ){
      return moment();
    }
    return moment(initial);
  }

  select(i){
    this.setState({
      selected: moment(this.state.viewing).date(i)
    });
  }

  // returns a Day for each grid position
  getDays(){
    let days = this.state.viewing.daysInMonth();
    let blanks = moment(this.state.viewing).date(1).day();
    let dates = [];
    for( let i=0; i<blanks; i++ ){
      dates.push(<Day key={'blank'+i}></Day>);
    }
    let selected = this.state.selected;
    let viewing = this.state.viewing;
    for( let i=1; i<days; i++ ){
      let active = viewing.year() == selected.year() && viewing.month() == selected.month() && selected.date() == i;
      dates.push(<Day
        key={i}
        active={active}
        onClick={this.select.bind(this,i)}
      >{i}</Day>);
    }
    return dates;
  }

  setMonth(inc){
    this.setState({
      viewing: moment(this.state.viewing).add(inc,'month'),
    });
  }

  onSelected = () => {
    if( !this.props.onSelected ){
      console.log('selected', this.state.selected.toString(), 'set an onSelected handler to recevie the value');
      return;
    }
    this.props.onSelected(this.state.selected.format(this.props.formatValue));
  }

  onCancel = () => {
    if( !this.props.onCancel ){
      console.log('set an onCancel handler to handle cancel');
      return;
    }
    this.props.onCancel();
  }

  getChildren(){
    let gridStyle = {
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    };
    return (
      <View row>
        <View size={25} raised>
          <View primary style={{padding:'1.5rem'}}>
            <Text>{this.state.selected.year()}</Text>
            <Text headline>{this.state.selected.format('ddd, MMM D')}</Text>
          </View>
          <View row>
            <Button icon={KeyboardArrowLeftIcon} onClick={this.setMonth.bind(this,-1)} />
            <Text size="fill" style={{alignSelf:'center',textAlign:'center'}}>{this.state.viewing.format('MMMM YYYY')}</Text>
            <Button icon={KeyboardArrowRightIcon} onClick={this.setMonth.bind(this,+1)}/>
          </View>
          <View row style={gridStyle}>
            {moment.weekdaysMin().map((d,i) => <Day key={'dow'+i} subtle>{d[0]}</Day>)}
            {this.getDays()}
          </View>
          <View row pad align="right">
            <Button label="Cancel" onClick={this.onCancel} />
            <Button label="OK" onClick={this.onSelected} />
          </View>
        </View>
      </View>
    );
  }
}
