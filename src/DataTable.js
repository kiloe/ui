import React from 'react';
import View from './View';
import CSS from './utils/css';
import TextField from './TextField';
import Select from './Select';
import cx from 'classnames';
//import ArrowDropDownIcon from '../package/icons/ArrowDropDownIcon';
//import ArrowDropUpIcon from '../package/icons/ArrowDropUpIcon';
import ArrowDownwardIcon from '../package/icons/ArrowDownwardIcon';
import ArrowUpwardIcon from '../package/icons/ArrowUpwardIcon';


CSS.register({

  '.table': {
    display: 'table',
    width: '100%',
    borderSpacing: '0',
  },
  '.table thead tr': {
    width: '100%',
    height: '56px',
  },
  '.table thead th': {
  },
  '.table tbody td': {
    color: 'rgba(0,0,0,0.87)',
    fontSize: '13px',
    borderTop: '2px solid rgba(0,0,0,0.1)',
  },
  '.table tbody tr': {
    height: '48px',
  },
  '.table tbody tr:hover': {
    backgroundColor: '#EEEEEE',
  },
  '.table tbody tr.selected': {
    backgroundColor: '#F5F5F5',
  },
  '.table thead th, .table tbody td': {
    paddingLeft: '24px',
  },
  '.table thead th:last-child, .table tbody td:last-child': {
    paddingRight: '24px',
  },
  '.table.hideHeadings thead': {
    display: 'none',
  },
  '.table.hideCheckboxes thead th.checkboxCell, .table.hideCheckboxes tbody td.checkboxCell': {
    display: 'none',
  },
  '.table .checkboxCell .checkbox': {
    backgroundColor: 'transparent !important', //XXX: temporary
  },
  '.table .colHeader': {
    cursor: 'pointer',
    left: '-1.5rem',
    position: 'relative',
    fontSize: '12px !important',
    color: 'rgba(0,0,0,0.54) !important',
  },
  '.table .colHeader.sortedBy': {
    color: 'rgba(0,0,0,0.87) !important',
  },
  '.table .colHeader .asc, .table .colHeader .desc': {
    display: 'none',
  },
  '.table.sortedAsc .colHeader.sortedBy .asc, .table.sortedDesc .colHeader.sortedBy .desc': {
    display: 'flex',
  },
  '.table.sortedAsc .colHeader.sortedBy:hover .asc, .table.sortedDesc .colHeader.sortedBy:hover .desc': {
    display: 'none',
  },
  '.table.sortedAsc .colHeader.sortedBy:hover .desc, .table.sortedDesc .colHeader.sortedBy:hover .asc, .table .colHeader:not(.sortedBy):hover .asc': {
    display: 'flex',
    opacity: 0.26,
  },
  '.table .colHeader:not(.sortedBy) .asc': {
    display: 'flex',
    visibility: 'hidden',
  },
  '.table .colHeader:not(.sortedBy):hover .asc': {
    visibility: 'visible',
  },


});




export default class DataTable extends View {

  static propTypes = {
    ...View.propTypes,

    // Column config, ordered.
    columns: React.PropTypes.arrayOf( React.PropTypes.shape({
      // The key in the row objects in data prop
      key: React.PropTypes.string,
      // Column headings. If headings isn't supplied then colKeys are used as the headings (unless showHeadings is false).
      label: React.PropTypes.string,
      // For any additional info (or if the heading is too long)
      tip: React.PropTypes.string,
      // Any columns that are assigned a TextField or Select editor are therefore editable
      editor: React.PropTypes.oneOfType([ React.PropTypes.instanceOf(TextField), React.PropTypes.instanceOf(Select) ]),
      // Format string for any columns either for numbers (using Numeral.js) or date/time (using Moment.js)
      format: React.PropTypes.string,
      // Prevent automatic data type detection by setting the type for every cell in a column.
      types: React.PropTypes.oneOf(['string','number','date']),
    }) ),

    // An array of rows: [ { id: ID, colKey: value, ... }, { id: ID, colKey: value, ... }, ... ]
    // If there's no id key, that row isn't interactive or editable. XXX: Right?
    // Any keys in data that aren't in headings are ignored.
    // We don't need to worry about id key/value being displayed in the table because it (probably) won't have an entry in headings prop.
    data: React.PropTypes.arrayOf( React.PropTypes.object ),
    // An array of row IDs (number or string) which should be selected. All other rows aren't selected, obviously.
    selected: React.PropTypes.arrayOf( React.PropTypes.oneOfType([ React.PropTypes.number, React.PropTypes.string ]) ),

    // The page number (starting with 1).
    page: React.PropTypes.number,
    // The maximum number of rows per page.
    // If data.length > rowsPerPage then paging is enabled and a footer is displayed.
    rowsPerPage: React.PropTypes.number,
    // The colKey to sort by.
    sort: React.PropTypes.string,
    // The order: asc or desc
    order: React.PropTypes.oneOf(['asc','desc']),
    // The status of the 'select all' checkbox
    selectAll: React.PropTypes.bool,

    // If true, there is a heading row.
    showHeadings: React.PropTypes.bool,
    // If true, the first column is for checkboxes.
    showCheckboxes: React.PropTypes.bool,
    // If true, the user can select multiple rows
    multiSelectable: React.PropTypes.bool,

    // Called when the user selects or deselects a row
    // function( rowID , selectedStatus )
    onToggleRow: React.PropTypes.func,
    // Called when the user clicks the Toggle in the header to select or deselect all.
    onSelectAll: React.PropTypes.func,
    // Called when the user clicks a column header to sort the table.
    // function( colKey )
    // If no function is supplied then sorting is disabled for the table.
    // It's up to the parent to do the sorting and choose/toggle the order (asc/desc).
    onSort: React.PropTypes.func,



  }

  static defaultProps = {
    ...View.defaultProps,
    page: 1,
    rowsPerPage: 50,
    showHeadings: true,
    showCheckboxes: true,
    multiSelectable: true,
    order: "asc",
    selected: [],
    selectAll: false,
    onToggleRow: function() {},
    onSelectAll: function() {},
    onSort: function() {},
  }

  constructor(...args){
    super(...args);
  }
  componentDidMount(){
    console.log( this.props );
  }


  // Data type auto-detection should take place on the value before it's formatted.
  // Type detection: 1. Check for number/currency/percentage (with one regex?). 2. Check for date/time using Moment.js isValid(). 3. Otherwise, assume it's a string.
  // Number formatting should use http://numeraljs.com/ and should apply to numbers and currency/percentage (which are just formatted numbers anyway).
  // Currency and percentage values should be left as they are (e.g. "£4", "45.3%",) unless that column is formatted, in which case we ignore the currency/percent and just take the numeric value.
  // Date/time formatting should use Moment.js
  // Try to replicate the types and behaviour of Google Sheets.
  detectDataType( value ) {


  }


  getClassNames(){
    let cs = super.getClassNames();
    cs.table = true;
    cs.hideHeadings = !this.props.showHeadings;
    cs.hideCheckboxes = !this.props.showCheckboxes;
    cs.sorted = (this.props.sort != undefined);
    cs.sortedAsc = (this.props.order=='asc');
    cs.sortedDesc = (this.props.order=='desc');

    return cs;
  }


  getStyle(){
    let style = super.getStyle();


    return style;
  }

  onToggleRow(rowID,selected,event) {
    //console.log( this.props.onToggleRow );
    //if ( this.props.onToggleRow )
    this.props.onToggleRow( rowID, selected );
  }


  render(){

    let data = this.props.data; //.slice(0);

    // If no column prop, populate it with the keys from the first data row
    let columns = this.props.columns || Object.keys(this.props.data[0]).map( k => ({ key: k, label: k }) );

    let th = columns.map( (col,i) => <th key={i} onClick={this.props.onSort.bind(this,col.key)}><View className={this.props.sort==col.key?"colHeader sortedBy":"colHeader"} tip={col.tip} size="intrinsic" row align="left"><ArrowDownwardIcon size={1.25} className="asc" /><ArrowUpwardIcon size={1.25} className="desc" />{col.label}</View></th> );
    let tr = data.map( (row,i) => <tr key={'row-'+(row.id||i)} className={(this.props.selected.indexOf(row.id)>=0?"selected":"")}><td className="checkboxCell"><Toggle checked={this.props.selected.indexOf(row.id)>=0} onChange={ this.onToggleRow.bind(this,row.id) } /></td>{ columns.map( (col,j) => <td key={j}>{ row[col.key] }</td> ) }</tr>, this );


    return (
      <table
      className={cx(this.getClassNames())}
      >
        <thead>
          <tr>
            <th className="checkboxCell"><Toggle checked={this.props.selectAll} onChange={ this.props.onSelectAll.bind(this,this.props.data.map( k => k.id ) ) } /></th>
            {th}
          </tr>
        </thead>
        <tbody>
          {tr}
        </tbody>
      </table>
    );
  }
}
