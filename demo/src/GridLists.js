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
            spacing="thin"
          >
            <GridTile image="https://images.rapgenius.com/7a9bf37d2eb6a00249c3991467c1d8ad.1000x1000x1.jpg" footer={<ListItem transparent left={<StarIcon accent size={1.6} />}><Text title lines={1}>Nostalgia, Ultra</Text><Text lines={1}>Frank Ocean</Text></ListItem>} />
            <GridTile image="http://cdn3.pitchfork.com/news/46955/0b786473.jpg" footer={<ListItem transparent left={<StarIcon accent size={1.6} />}><Text title lines={1}>Channel Orange</Text><Text lines={1}>Frank Ocean</Text></ListItem>} />

            <GridTile image="https://images.rapgenius.com/7a9bf37d2eb6a00249c3991467c1d8ad.1000x1000x1.jpg" footer={<ListItem transparent left><Text title lines={1}>Nostalgia, Ultra</Text><Text lines={1}>Frank Ocean</Text></ListItem>} />
            <GridTile image="http://cdn3.pitchfork.com/news/46955/0b786473.jpg" footer={<ListItem transparent left><Text title lines={1}>Channel Orange</Text><Text lines={1}>Frank Ocean</Text></ListItem>} />
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
      </View>
    );
  }

}

