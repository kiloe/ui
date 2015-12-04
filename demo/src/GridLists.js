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

    let flags = {

      columns: parseInt(this.state.columns),
      tileHeight: this.state.tileHeight + "px",
      padding: this.state.padding,
      footer: this.state.footer,
      header: this.state.header,
      actionPosition: this.state.actionPosition,
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
    filters.push( <View row style={filterStyle} key="columns">Columns: <Select required options={['1','2','3','4','5','6','7','8']} value={this.state.columns.toString()} onChange={this.set.bind(this, 'columns')} /></View> );
    filters.push( <View row style={filterStyle} key="tileHeight">Tile Height: <TextField type="number" value={this.state.tileHeight.toString()} onChange={this.set.bind(this, 'tileHeight')} /></View> );
    filters.push( <View row style={filterStyle} key="padding">Padding: <Select required options={['thin','thick']} value={this.state.padding} onChange={this.set.bind(this, 'padding')} /></View> );
    filters.push( <View row style={filterStyle} key="position">Position: <Select required options={['header','footer']} value={this.state.header?'header':'footer'} onChange={this.set.bind(this, 'position')} /><Select required options={['inner','outer']} value={this.state.actionPosition} onChange={this.set.bind(this, 'actionPosition')} /></View> );


    let data = [
      {
        title: 'Albums',
        src: Doc.jsx`
          <GridList
            ${flags}
            defaultImage="http://d1q6eq3loekzbe.cloudfront.net/static/img/default_album.png"
          >
            <GridTile image="https://images.rapgenius.com/7a9bf37d2eb6a00249c3991467c1d8ad.1000x1000x1.jpg"><ListItem transparent left={<StarIcon accent size={1.6} />}><Text title lines={1}>Nostalgia, Ultra</Text><Text lines={1}>Frank Ocean</Text></ListItem></GridTile>
            <GridTile image="http://cdn3.pitchfork.com/news/46955/0b786473.jpg"><ListItem transparent left={<StarIcon accent size={1.6} />}><Text title lines={1}>Channel Orange</Text><Text lines={1}>Frank Ocean</Text></ListItem></GridTile>

            <GridTile image="http://www.kinomania.ru/images/soundtracks/1366.jpg"><ListItem transparent left><Text title lines={1}>Home Alone OST</Text></ListItem></GridTile>
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

