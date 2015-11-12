import React from 'react';
import View from './View';
import CSS from './utils/css';
import Step from './Step';


CSS.register({
  '.stepper': {
    position: 'relative',
  },
  '.stepper.horizontal': {
    justifyContent: 'space-around',
  },

});


export default class Stepper extends View {

  static propTypes = {
    ...View.propTypes,

    // 'horizontal' displays all the steps from left to right in the header as tabs.
    // 'vertical' displays all the lefts in the left margin from top to bottom. This is good for mobile.
    // 'separate' shows the current step and the progress with next/prev buttons but it doesn't show the other steps. Also good for mobile. XXX: Can you think of a better name for this?
    type: React.PropTypes.oneOf(['horizontal','vertical','separate']),
    // Steps must be completed in order
    linear: React.PropTypes.bool,
    // The children have to be Step elements. Also has to be an array, meaning that having 1 step isn't allow. XXX: Can you think of any reason you'd ever want just one step?
    //children: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Step)),
  }

  static defaultProps = {
    ...View.defaultProps,
    type: 'horizontal',
    linear: true,
    row: true,
  }

  constructor(...args){
    super(...args);
  }

  componentDidMount(){
  }
  


  getClassNames(){
    let cs = super.getClassNames();
    cs.stepper = true;
    cs.linear = this.props.linear;
    cs[ this.props.type ] = true;
    return cs;
  }


  getContent(){
    return this.props.children;
  }

  render(){
    let children = []

    children.push( this.getContent() );
    return super.render( children );
  }
}
