import React from 'react';
import View from './View';
import CSS from './utils/css';


CSS.register({


});




export default class DataTable extends View {

  static propTypes = {
    ...View.propTypes,

    // Column headings: { colKey: "Heading Title", ... }
    // If headings isn't supplied then colKeys are used as the headings (unless showHeadings is false).
    headings: React.PropTypes.objectOf( React.PropTypes.string ),
    // An array of rows: [ { id: ID, colKey: value, ... }, { id: ID, colKey: value, ... }, ... ]
    // If there's no id key, that row isn't interactive or editable. XXX: Right?
    // Any keys in data that aren't in headings are ignored.
    // We don't need to worry about id key/value being displayed in the table because it (probably) won't have an entry in headings prop.
    data: React.PropTypes.arrayOf( React.PropTypes.object ),
    // For any additional info (or if the heading is too long): { colKey: tooltipString, ... }
    headingTooltips: React.PropTypes.objectOf( React.PropTypes.string ),
    // Any columns that are assigned (by the colKey) a TextField or Select editor are therefore editable
    editors: React.PropTypes.objectOf( React.PropTypes.oneOfType([ React.PropTypes.instanceOf(TextField), React.PropTypes.instanceOf(Select) ]) ),
    // An array of row IDs (number or string) which should be selected. All other rows aren't selected, obviously.
    selected: React.PropTypes.arrayOf( React.PropTypes.oneOfType([ React.PropTypes.number, React.PropTypes.string ]) ),
    // Format string for any columns (by the colKey) either for numbers (using Numeral.js) or date/time (using Moment.js)
    formats: React.PropTypes.objectOf( React.PropTypes.string ),
    // Prevent automatic data type detection by setting the type for every cell in a column (by colKey).
    types: React.PropTypes.objectOf( React.PropTypes.oneOf(['string','number','date']) ),

    // The page number (starting with 1).
    page: React.PropTypes.number,
    // The maximum number of rows per page.
    // If data.length > rowsPerPage then paging is enabled and a footer is displayed.
    rowsPerPage: React.PropTypes.number,
    // The colKey to sort by.
    sort: React.PropTypes.string,
    // The order: asc or desc
    order: React.PropTypes.oneOf(['asc','desc']),

    // If true, there is a heading row.
    showHeadings: React.PropTypes.bool,
    // If true, the first column is for checkboxes.
    showCheckboxes: React.PropTypes.bool,
    // If true, the user can select multiple rows
    multiSelectable: React.PropTypes.bool,

    // Called when the user selects or deselects a row
    // function( rowID [, selectedStatus] )
    // If selectedStatus bool isn't supplied then the parent just has to toggle it.
    onToggleRow: React.PropTypes.func,
    // Called when the user edits a value
    // function( rowID, colKey, newValue )
    // XXX: Or we could just have the callback functions given to the TextField or Select elements in the editors prop.
    onValueUpdate: React.PropTypes.func,
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
  }

  constructor(...args){
    super(...args);
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
    return cs;
  }


  getStyle(){
    let style = super.getStyle();


    return style;
  }



  render(){
    return super.render();
  }
}
