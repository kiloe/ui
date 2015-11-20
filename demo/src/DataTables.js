import React from 'react';
import Doc from './Doc';
import View from '../../package/View';


export default class DataTables extends React.Component {




  render(){

    let data = [
      {
        title: 'Simple table',
        state: { selected: [232], selectAll: false, data: [ { id: 232, dessert: 'Bakewell tart', type: 'pastry' }, { id: 111, dessert: 'Chocolate Sundae', type: 'ice cream' }, { id: 9, dessert: 'Soggy biscuit', type: 'pastry' } ] },
        src: Doc.jsx`
          <DataTable
            columns={[
              {key: 'dessert', label: 'Dessert Name', tip: 'yummy name', type:'text'},
              {key: 'type', label: 'Type', tip: 'wtf is a dessert type??'},
            ]}
            onToggleRow={(rowID) => {
              let selected = this.state.selected.slice(0);
              if ( selected.indexOf(rowID) < 0 ) selected.push(rowID); //add it please
              else selected.splice( selected.indexOf(rowID), 1 ); //remove it, yo!
              this.setState({selected: selected})
            }}
            onSelectAll={(rowIDs) => {
              if ( this.state.selectAll ) { //Off
                this.setState({ selectAll: false, selected: (rowIDs.length == this.state.previouslySelected.length ? [] : this.state.previouslySelected ) });
              }
              else { //On
                this.setState({ selectAll: true, selected: rowIDs, previouslySelected: this.state.selected });
              }
            }}
            onSort={(colKey) => {
              let order = 'asc';
              if ( colKey == this.state.sort ) order = ( this.state.order == 'asc' ? 'desc' : 'asc' );
              this.setState( { sort: colKey, order: order, data: this.state.data.slice(0).sort( function( sort, order, a, b ) { return ((a[sort] < b[sort]) ? -1 : (a[sort] > b[sort]) ? 1 : 0) * (order == "desc"?-1:1); }.bind(this,colKey,order) ) } );

            }}
            sort={this.state.sort}
            order={this.state.order}
            selectAll={this.state.selectAll}
            data={ this.state.data }
            selected={this.state.selected}
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
      {
        title: 'No heading row and no checkboxes',
        src: Doc.jsx`
          <DataTable
            columns={[
              {key: 'dessert', label: 'Dessert Name', tip: 'yummy name', type:'text'},
              {key: 'type', label: 'Type', tip: 'wtf is a dessert type??'},
            ]}
            showHeadings={false}
            showCheckboxes={false}
            data={ [ { id: 232, dessert: 'Bakewell tart', type: 'pastry' }, { id: 111, dessert: 'Chocolate Sundae', type: 'ice cream' } ] }
            selected={ [ 232 ] }
         />
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

