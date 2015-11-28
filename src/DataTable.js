import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import View from './View';
import CSS from './utils/css';
import TextField from './TextField';
import Select from './Select';
import cx from 'classnames';
//import ArrowDropDownIcon from '../package/icons/ArrowDropDownIcon';
//import ArrowDropUpIcon from '../package/icons/ArrowDropUpIcon';
import ArrowDownwardIcon from '../package/icons/ArrowDownwardIcon';
import ArrowUpwardIcon from '../package/icons/ArrowUpwardIcon';
import KeyboardArrowLeftIcon from '../package/icons/KeyboardArrowLeftIcon';
import KeyboardArrowRightIcon from '../package/icons/KeyboardArrowRightIcon';


CSS.register({

  '.table': {
    display: 'table',
    width: '100%',
    borderSpacing: '0',
  },
  '.table thead tr, .table tfoot tr': {
    width: '100%',
    height: '56px',
  },
  '.table tfoot td': {
    fontSize: '12px',
    color: 'rgba(0,0,0,0.54)',
    borderTop: '2px solid rgba(0,0,0,0.1)',
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
    position: 'relative',
    fontSize: '12px !important',
    color: 'rgba(0,0,0,0.54) !important',
  },
  '.table .colHeader:not(.type-date):not(.type-number)': {
    left: '-1.5rem',
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
  '.table tbody td.type-number, .table tbody td.type-date': {
    textAlign: 'right',
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
    // How many rows are there in total. If totalRows > data.length, then paging is enabled.
    totalRows: React.PropTypes.number,

    // The page number (starting with 1).
    page: React.PropTypes.number,
    // The maximum number of rows per page.
    // If data.length > rowsPerPage then paging is enabled and a footer is displayed.
    rowsPerPage: React.PropTypes.number,
    // For the drop-down options of how many rows per page.
    rowsPerPageOptions: React.PropTypes.arrayOf( React.PropTypes.number ),
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
    // Called when the user changes the page or rowsPerPage
    // function( page, rowsPerPage )
    onPage: React.PropTypes.func,



  }

  static defaultProps = {
    ...View.defaultProps,
    page: 1,
    rowsPerPage: 50,
    rowsPerPageOptions: [10,25,50,100],
    showHeadings: true,
    showCheckboxes: true,
    multiSelectable: true,
    order: "asc",
    selected: [],
    selectAll: false,
    onToggleRow: function() {},
    onSelectAll: function() {},
    onSort: function() {},
    onPage: function() {},
  }

  constructor(...args){
    super(...args);
    this.state = this.state || {};
    this._columnWidths = {};
  }
  componentDidMount(){

    let totalWidth = this.refs.checkboxCol.offsetWidth + Object.keys( this._columnWidths ).reduce( ((sum,key) => sum + this._columnWidths[key]).bind(this), 0);
    let percentages = {};
    Object.keys( this._columnWidths ).forEach( ( (key) => percentages[key] = (this._columnWidths[key]/totalWidth*100) ).bind(this) );

    this.setState( { colWidths: percentages } );
  }


  // Data type auto-detection should take place on the value before it's formatted.
  // Type detection:
  //   1. Check for number/currency/percentage (with one regex?).
  //   2. Check for date/time using Moment.js isValid().
  //   3. Otherwise, assume it's a string.
  // Number formatting should use http://numeraljs.com/ and should apply to numbers and currency/percentage (which are just formatted numbers anyway).
  // Currency and percentage values should be left as they are (e.g. "£4", "45.3%",) unless that column is formatted, in which case we ignore the currency/percent and just take the numeric value.
  // Date/time formatting should use Moment.js
  // Try to replicate the types and behaviour of Google Sheets.
  // For numbers: Need to sort by value (so "£4" would be 4)?
  _detectDataType( value ) {
    if ( !!value.toString().trim().match(/(?=.)^\-?[\$\£\€]?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]+)?$/) ) {
      return "number";
    }
    else if ( moment(new Date(value.toString().trim())).isValid() ) {
      return "date";
    }
    else {
      return "string";
    }
  }

  _formatField( value, type, format ) {
    if ( type == "number" && format ) return numeral(value).format(format);
    else if ( type == "date" && format ) {
      //console.log(  moment(new Date(value),format) );
      return moment(new Date(value)).format(format);
    }
    else return value;
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

    let th = columns.map( (col,i) => <th key={'th-'+i} ref={ function(key,c) { if (c) this._columnWidths[key] = c.offsetWidth }.bind(this,col.key||i)} onClick={this.props.onSort.bind(this,col.key)}><View className={this.props.sort==col.key?"colHeader sortedBy type-" + col.type:"colHeader type-" + col.type} tip={col.tip} size="intrinsic" row align={col.type=='number'||col.type=='date'?"right":"left"}><ArrowDownwardIcon size={1.25} className="asc" /><ArrowUpwardIcon size={1.25} className="desc" />{col.label}</View></th> );
    let tr = data.map( (row,i) => <tr key={'row-'+(row.id||i)} className={(this.props.selected.indexOf(row.id)>=0?"selected":"")}><td className="checkboxCell"><Toggle checked={this.props.selected.indexOf(row.id)>=0} onChange={ this.onToggleRow.bind(this,row.id) } /></td>{ columns.map( (col,j) => <td key={j} className={"type-" + (col.type||this._detectDataType( row[col.key] ))}>{ col.format ? this._formatField( row[col.key], (col.type||this._detectDataType( row[col.key] )), col.format ) : row[col.key] }</td>, this ) }</tr>, this );

    let cols = columns.map( ( (col,i) => <col key={'col-'+i} width={(this.state.colWidths?this.state.colWidths[col.key]+'%':col.width)} /> ).bind(this) );

    return (
      <table
      className={cx(this.getClassNames())}
      ref={(c) => this._table = c}
      >
        <colgroup>
          <col />
          {cols}
        </colgroup>
        <thead>
          <tr>
            <th className="checkboxCell" ref="checkboxCol"><Toggle checked={this.props.selectAll} onChange={ this.props.onSelectAll.bind(this,this.props.data.map( k => k.id ) ) } /></th>
            {th}
          </tr>
        </thead>
        <tbody>
          {tr}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={columns.length+1}><View row style={{ justifyContent: 'flex-end', alignItems: 'center' }}><Text>Rows per page:</Text><Select required value={this.props.rowsPerPage.toString()} options={this.props.rowsPerPageOptions.map( n => n.toString() ) } onChange={ this.props.onPage.bind(this,1) } /><Text>{(this.props.page-1)*this.props.rowsPerPage+1}-{(this.props.page-1)*this.props.rowsPerPage+this.props.data.length} of {this.props.totalRows}</Text><Button icon={KeyboardArrowLeftIcon} onClick={ this.props.onPage.bind(this,this.props.page-1,this.props.rowsPerPage ) } disabled={(this.props.page==1)} /><Button icon={KeyboardArrowRightIcon} onClick={ this.props.onPage.bind(this,this.props.page+1,this.props.rowsPerPage ) } disabled={(this.props.page*this.props.rowsPerPage >= this.props.totalRows)} /></View></td>
          </tr>
        </tfoot>
      </table>
    );
  }
}
