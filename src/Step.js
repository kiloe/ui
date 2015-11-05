import React from 'react';
import View from './View';
import CSS from './utils/css';


CSS.register({


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
    children: eact.PropTypes.arrayOf(React.PropTypes.instanceOf(Step)),
  }

  static defaultProps = {
    ...View.defaultProps,
    alternativeLabel: false,
    active: false,
    complete: false,
    optional: false,
    editable: false,
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
    cs.alternativeLabel = this.props.alternativeLabel;
    cs.active = this.props.active;
    cs.complete = this.props.complete;
    cs.error = this.props.error.length > 0;
    return cs;
  }

  getIcon(){
    // TODO: alert icon if there's an error
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



  getContent(){
    return this.props.children;
  }

  render(){
    return super.render(this.getContent());
  }
}
