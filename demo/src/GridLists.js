import React from 'react';
import Doc from './Doc';
import View from '../../package/View';


export default class GridLists extends React.Component {



  render(){

    let data = [
      {
        title: 'Just images',
        src: Doc.jsx`
          <GridList
            columns={4}
            tileHeight="300px"
            defaultImage="http://d1q6eq3loekzbe.cloudfront.net/static/img/default_album.png"
            tileSpacing="thin"
          >
            <GridTile image="https://images.rapgenius.com/7a9bf37d2eb6a00249c3991467c1d8ad.1000x1000x1.jpg" />
            <GridTile image="http://cdn3.pitchfork.com/news/46955/0b786473.jpg" />
            <GridTile image="https://images.rapgenius.com/7a9bf37d2eb6a00249c3991467c1d8ad.1000x1000x1.jpg" />
            <GridTile image="http://cdn3.pitchfork.com/news/46955/0b786473.jpg" />
            <GridTile />
            <GridTile image="http://cdn3.pitchfork.com/news/46955/0b786473.jpg" />
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
      </View>
    );
  }

}

