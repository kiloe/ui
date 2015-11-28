import React from 'react';
import Doc from './Doc';
import View from '../../package/View';


export default class DataTables extends React.Component {



//[ { id: 232, dessert: 'Bakewell tart', type: 'pastry' }, { id: 111, dessert: 'Chocolate Sundae', type: 'ice cream' }, { id: 9, dessert: 'Soggy biscuit', type: 'pastry' } ]
//
//              {key: 'dessert', label: 'Dessert Name', tip: 'yummy name', type:'text'},
//              {key: 'type', label: 'Type', tip: 'wtf is a dessert type??'},

  render(){

    let data = [
      {
        title: 'Numbers, dates and text',
        state: { selected: [2,4], selectAll: false, page: 1, rowsPerPage: 5, data: Array.apply(0, Array(100)).map( (v,n) => ({ id: n, num: n, square: n*n, cube: n*n*n, date: "2015-12-"+n, date2: "2015-12-"+n, random: Math.floor(Math.random() * 100), text: "Tiramisu chupa chups cupcake cheesecake candy canes cookie. Gingerbread cheesecake topping sweet gingerbread. Muffin tart brownie. Halvah lollipop pastry cake. Muffin marzipan chocolate sweet. Ice cream toffee tootsie roll cookie. Danish chocolate cookie ice cream. Soufflé jelly beans candy gummi bears croissant. Jelly-o bonbon cookie.".substr(n,n).trim() }) ) },
        src: Doc.jsx`
          <DataTable
            columns={[
              {key: 'num', label: 'Number', tip: 'Type: "number"', type:'number'},
              {key: 'cube', label: 'Cube ($)', tip: 'Type: "number", format: "$0,0.00"', type: 'number', format: "$0,0.00" },
              {key: 'date', label: 'Day of Dec (date)', tip: 'Type: "date", format: "Do MMM"', type: 'date', format: "Do MMM" },
              {key: 'date2', label: 'Day of Dec (auto)', tip: 'format: "MMMM D"', format: "MMMM D" },
              {key: 'random', label: 'Random', tip: 'Type: "text". A random number between 0 and 100', type: 'text' },
              {key: 'text', label: 'Text', tip: 'A string the length of the number', width: '25%'},
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
              let order = ( colKey == this.state.sort && this.state.order == 'asc' ? 'desc' : 'asc' );
              this.setState( { page: 1, sort: colKey, order: order, data: this.state.data.slice(0).sort( function( sort, order, a, b ) { return ((a[sort] < b[sort]) ? -1 : (a[sort] > b[sort]) ? 1 : 0) * (order == "desc"?-1:1); }.bind(this,colKey,order) ) } );

            }}
            onPage={(page,rowsPerPage) => {
              this.setState( { page: page, rowsPerPage: parseInt(rowsPerPage) } );
            }}
            sort={this.state.sort}
            order={this.state.order}
            selectAll={this.state.selectAll}
            data={ this.state.data.slice( (this.state.page-1)*this.state.rowsPerPage, this.state.page*this.state.rowsPerPage ) }
            selected={this.state.selected}
            totalRows={this.state.data.length}
            page={this.state.page}
            rowsPerPage={this.state.rowsPerPage}
            rowsPerPageOptions={[5,10,25]}
         />
        `,
        info:`
        Testing paging and column types.
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
              {key: 'dessert', label: 'Dessert Name', tip: 'yummy name', type:'string'},
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

