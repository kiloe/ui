import React from 'react';
import View from './View';
import CSS from './utils/css';


CSS.register({
  '.step > .content': {
    display: 'none',
  },
  '.step.active > .content': {
    display: 'block',
  },
  '.stepper.horizontal .step.active > .content': {
    width: '100%',
    margin: '12px',
    position: 'absolute',
    left: '0px',
  },
  '.step .text.label': {
    margin: '0px 8px',
  },
  '.step.active .text.label': {
    fontWeight: 'bold',
  },
  '.step .circle': {
    borderRadius: '50%',
    textAlign: 'center',
    marginLeft: '8px', 
  },

});


export default class Step extends View {

  static propTypes = {
    ...View.propTypes,

    // Step number
    number: React.PropTypes.number,
    // Optional icon which will override the number as the content of the circle
    icon: React.PropTypes.oneOfType([
      React.PropTypes.element,
      React.PropTypes.func,
    ]),
    // Label of the step.
    label: React.PropTypes.string,
    // The alternative position has the label underneath the circle
    alternativeLabel: React.PropTypes.bool,
    // Short optional summary to go under the label
    summary: React.PropTypes.string,
    // This step is active
    active: React.PropTypes.bool,
    // This step has been completed
    complete: React.PropTypes.bool,
    // Can the user skip this step?
    optional: React.PropTypes.bool,
    // Can the user go back to this step after it's been completed?
    editable: React.PropTypes.bool,
    // Error message. If set, it will make the step red and change the icon.
    error: React.PropTypes.string,
    // The children have to be Step elements. Also has to be an array, meaning that having 1 step isn't allow. XXX: Can you think of any reason you'd ever want just one step?
    //children: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Step)),
  }

  static defaultProps = {
    ...View.defaultProps,
    alternativeLabel: false,
    active: false,
    complete: false,
    optional: false,
    editable: false,
    error: "",
  }

  constructor(...args){
    super(...args);
  }

  componentDidMount(){
  }
    hasIcon(){
    return !!this.props.icon;
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.step = true;
    cs.alternativeLabel = this.props.alternativeLabel;
    cs.active = this.props.active;
    cs.complete = this.props.complete;
    cs.error = this.props.error.length > 0;
    return cs;
  }
  

  getStyle(){
    let style = super.getStyle();


    return style;
  }

  getIcon(){
    // TODO: alert icon if there's an error and a tick icon if completed. Set colour too.
    return this.props.icon;
  }

  // getIcon returns the icon as an element or undefined if no icon prop
  getIconContent(){
    let props = {
      key:'icon',
      size:'intrinsic',
      outline: this.props.outline,
      color: this.getTextColor(),
    };
    let Icon = this.getIcon();
    if( Icon instanceof Function ){
      return <Icon {...props} />;
    }
    return React.cloneElement(Icon, props);
  }
  
  getHeader() {
  
    let inactive = (!this.props.active && !this.props.complete && !this.props.error);
    let active = this.props.active;
    let complete = this.props.complete;
    let circleStyle = { width: '2rem', height: '2rem' };
    return ( <View row><View className="circle" size="intrinsic" style={ circleStyle } primary={active||complete} grey={inactive}>{this.props.number}</View><Text className="label" subtle={inactive}>{this.props.label}</Text></View> );
  
  }



  getContent(){
    let children = [];
    children.push( this.getHeader() );
    children.push( <div className="content">{this.props.children}</div> );
    return children;
  }

  render(){
    return super.render(this.getContent());
  }
}
