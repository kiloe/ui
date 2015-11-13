import React from 'react';
import Doc from './Doc';
import View from '../../package/View';


export default class DataTables extends React.Component {

  render(){

    let data = [
      {
        title: 'Simple table',
        src: Doc.jsx`
          <DataTable
            columns={[
              {key: 'dessert', label: 'Dessert Name', tip: 'yummy name', type:'text'},
              {key: 'type', label: 'Type', tip: 'wtf is a dessert type??'},
            ]}
            data={ [ { id: 232, dessert: 'Bakewell tart', type: 'pastry' }, { id: 111, dessert: 'Chocolate Sundae', type: 'ice cream' } ] }
            selected={ [ 232 ] }
         />
        `,
        info:`

        `
      },
      {
        title: 'Simple table with no columns config and no row ids',
        src: Doc.jsx`
          <DataTable
            data={ [ { dessert: 'Bakewell tart', type: 'pastry' }, { dessert: 'Chocolate Sundae', type: 'ice cream' } ] }
         />
        `,
        info:`
          It still displays but it won't be interactive.
        `
      },

    ];
    return (
      <View scroll>
        <View>
          {data.map((x,i) => <Doc key={i} title={x.title} src={x.src}>{x.info}</Doc>)}
        </View>
      </View>
    );
  }

}

