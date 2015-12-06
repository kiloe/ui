import React from 'react';
import Doc from './Doc';
import View from '../../package/View';
import Select from '../../package/Select';
import TextField from '../../package/TextField';


export default class GridLists extends React.Component {

  constructor(...args){
    super(...args);
    this.state = {
      columns: 4,
      tileHeight: 300,
      padding: "thick",
      header: false,
      footer: true,
      actionPosition: 'inner',
      actionBackground: 'grey',
    };
  }

  set(flag, v){
    let s = {[flag]: v};
    if ( flag == 'position' ) {
      s = { header: (v=='header'), footer: (v=='footer') };
    }

    this.setState(s);
  }

  render(){

    let actionBackground = 'none';
    if ( this.state.actionBackground == 'grey' ) actionBackground = 'rgba(0,0,0,0.4)';
    else if ( this.state.actionBackground == 'gradient' ) actionBackground = 'linear-gradient(to '+(this.state.header?'bottom':'top')+', rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)';
    else if ( this.state.actionBackground == 'white' ) actionBackground = 'rgba(255,255,255,0.4)';


    let flags = {

      columns: parseInt(this.state.columns),
      tileHeight: this.state.tileHeight + "px",
      padding: this.state.padding,
      footer: this.state.footer,
      header: this.state.header,
      actionPosition: this.state.actionPosition,
      actionBackground: actionBackground,
    };

    flags = Object.keys(flags).reduce((o,k) => {
      if( !flags[k] ){
        return o;
      }
      o[k] = flags[k];
      return o;
    },{});



    /*let filters = Object.keys(this.state).map(k => {
      let v = this.state[k];
      return <span key={k}><input type="checkbox" onChange={this.set.bind(this, k, !v)} checked={v} />{k}</span>;
    });*/
    let filterStyle = { alignItems: 'center' };
    let filters = [];
    filters.push( <View row style={filterStyle} key="columns">Cols: <Select required options={['1','2','3','4','5','6','7','8']} value={this.state.columns.toString()} onChange={this.set.bind(this, 'columns')} /></View> );
    filters.push( <View row style={filterStyle} key="tileHeight">Height: <TextField type="number" value={this.state.tileHeight.toString()} onChange={this.set.bind(this, 'tileHeight')} /></View> );
    filters.push( <View row style={filterStyle} key="padding">Padding: <Select required options={['thin','thick']} value={this.state.padding} onChange={this.set.bind(this, 'padding')} /></View> );
    filters.push( <View row style={filterStyle} key="position">Pos: <Select required options={['header','footer']} value={this.state.header?'header':'footer'} onChange={this.set.bind(this, 'position')} /><Select required options={['inner','outer']} value={this.state.actionPosition} onChange={this.set.bind(this, 'actionPosition')} /></View> );
    filters.push( <View row style={filterStyle} key="actionBackground">BG: <Select required options={[ 'none', 'gradient', 'grey', 'white' ]} value={this.state.actionBackground} onChange={this.set.bind(this, 'actionBackground')} /></View> );



    let data = [
      {
        title: 'Albums',
        src: Doc.jsx`
          <GridList
            ${flags}
            defaultImage="http://d1q6eq3loekzbe.cloudfront.net/static/img/default_album.png"
          >
            <GridTile colspan={2} image="https://images.rapgenius.com/7a9bf37d2eb6a00249c3991467c1d8ad.1000x1000x1.jpg"><ListItem left={<StarIcon accent size={1.6} />}><Text title lines={1}>Nostalgia, Ultra</Text><Text lines={1}>Frank Ocean</Text></ListItem></GridTile>
            <GridTile image="http://cdn3.pitchfork.com/news/46955/0b786473.jpg"><ListItem left={<StarIcon accent size={1.6} />}><Text title lines={1}>Channel Orange</Text><Text lines={1}>Frank Ocean</Text></ListItem></GridTile>

            <GridTile image="http://www.kinomania.ru/images/soundtracks/1366.jpg"><ListItem left><Text title lines={1}>Home Alone OST</Text></ListItem></GridTile>
            <GridTile />
            <GridTile />
            <GridTile />
          </GridList>
        `,
        info:`

        `
      },

    ];
    return (
      <View scroll>
        <View>
          {data.map((props,i) => <Doc key={i} {...props} />)}
        </View>
        <View row>
          {filters}
        </View>
        <View>...</View>
      </View>
    );
  }

}

