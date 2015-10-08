import React from 'react';
import cx from 'classnames';
import {ThemeManager} from './utils/themeManager';
import CSS from './utils/css';
import Modal from './Modal';
import Tooltip from './Tooltip';

const SIZES = ['fill', 'intrinsic'];
const THEME_MODES = ['light', 'dark'];
const PALETTE_MODES = ['primary','accent','grey'];

CSS.register({
  '.root, .root > .rootView': {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
  },
  '.root > .rootView': {
    display:'flex',
  },
  '.view': {
    position: 'relative',
    boxSizing: 'content-box', // note to self: required so that we can rely on the size prop
    display: 'flex',
    flex: '1', // let items take up what they need when theres room or squash+clip when not
    flexDirection: 'column',
    flexWrap: 'nowrap', // only ever one row or column (see Grid for wrappy things)
    alignItems: 'stretch',
    alignContent: 'stretch',
    borderRadius: 1,
    overflow: 'hidden', // required to give the 'clipping' behaviour that material should have
    transition: {
      left: CSS.transitions.swift,
      right: CSS.transitions.swift,
      top: CSS.transitions.swift,
      bottom: CSS.transitions.swift,
      width: CSS.transitions.swift,
      height: CSS.transitions.swift,
      flexGrow: CSS.transitions.swift,
      flexShrink: CSS.transitions.swift,
      flexBasis: CSS.transitions.swift,
      flex: CSS.transitions.swift,
    },
    // zIndex: 1,
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    UserSelect: 'none',
  },
  '.view.scroll': {
    overflow:'auto',
    display: 'block', // XXX: unexpected layout? it might be this... it's here because otherwise fast-path scrolling doesn't want to work
    WebkitOverflowScrolling: 'touch',
  },
  '.view .view:nth-child(1)': {
    // zIndex:10
  },
  '.view.row': {
    flexDirection: 'row'
  },
  '.view.z1': {
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    zIndex:1,
  },
  '.view.z2': {
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    zIndex:2,
  },
  '.view.z3': {
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    zIndex:3,
  },
  '.view.z4': {
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    zIndex:4,
  },
  '.view.z5': {
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
    zIndex:5,
  },
  '.view.disabled': {
    pointerEvents: 'none',
    opacity:'0.2 !important',
    filter: 'grayscale(100%)',
    WebkitFilter: 'grayscale(100%)',
  },
  '.view.divider': {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
  },
});

// View is a flex-box building block.
export default class View extends React.Component {

  static propTypes = {
    // when row=false child Views will stack in rows (like a side nav)
    // when row=true child Views will flow horizonatally (like a toolbar)
    row: React.PropTypes.bool,
    // Set to a non-zero value to raise the view off the page in the z-axis
    // by adding a shadow effect.
    // raised=true is the same as raised=1
    raised: React.PropTypes.oneOf([0,1,2,3,4,5,true]),
    // Attach an onClick handler to the view
    onClick: React.PropTypes.func,
    // Assign a theme config for this View (and all decents). If not specifed and
    // no theme config is set from a accentdant the global default theme is used.
    theme: React.PropTypes.shape({
      // set the named primary palette ('red', 'blue', etc). Should be constant.
      primaryPalette: React.PropTypes.string,
      // Pick 3 hues (e.g. ['100','500','700']) for the app to use. This should be a constant.
      // It doesn't have to be 3 values but the number should be odd so that the middle value is seen as the default hue.
      primaryHues: React.PropTypes.arrayOf(React.PropTypes.string),
      // set the named accent palette ('red', 'blue', etc). Should be constant.
      accentPalette: React.PropTypes.string,
      // Pick 1 main hue for the app (e.g. '500').
      accentHue: React.PropTypes.string,
      // The theme mode. 'light' or 'dark'
      mode: React.PropTypes.oneOf(THEME_MODES),
      // Whether it should be using primaryPalette, accentPalette or the 'grey' palette
      paletteMode: React.PropTypes.oneOf(PALETTE_MODES),
      // This decides the opacity of the text. Note: 'disabled' and 'hint' result in the same opacity but I split them because they're for different uses.
      textMode: React.PropTypes.oneOf(['primary','secondary','disabled','hint']),
      // The current hue (weight). e.g. '100', '500'. Or 'A300' if paletteMode is 'accent'
      hue: React.PropTypes.string,

    }),
    // Shortcut props for setting palette theme + hue
    // Note: do not use this for controlling logic, instead fetch the palette via getTheme()
    light: React.PropTypes.bool,
    dark: React.PropTypes.bool,
    primary: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.bool]),
    accent: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.bool]),
    grey: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.bool]),
    // The current layer of material/paper
    layer: React.PropTypes.number,
    // Size gives the View a either a fixed width in rem (if row) or fixed height rem (if column).
    // OR size=fill which means take up all the space (default).
    // OR special value 'intrinsic' can be used to say only take up what you need.
    size: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.oneOf(SIZES)
    ]),
    // Set to true to hide the component. If a size is set, then this
    // will toggle between size -> zero
    hide: React.PropTypes.bool,
    // Set to enable scrolling within the view
    // Note: any child Views MUST have their size prop set for this to work.
    scroll: React.PropTypes.bool,
    // Disable the component
    disabled: React.PropTypes.bool,
    // Align the item left/right/center
    align: React.PropTypes.oneOf(['left','right','center']),
    // Scale is a mulitpler that affects certain key elements/properties.
    // In most scenarios it can be thought of as a font-sizing method
    scale: React.PropTypes.number,
    // The View is a divider (with bottom border)
    divider: React.PropTypes.bool,
    // pad adds the default (theme defined) padding default is no padding
    pad: React.PropTypes.bool,
    // tip sets the tooltip text. tooltips are text only labels that appear on hover and focus when
    // the user hovers over an element with the cursor, focuses on an
    // element using a keyboard (usually through the tab key), or upon
    // touch (without releasing) in a touch UI.
    tip: React.PropTypes.string,
  }

  static contextTypes = {
    parent: React.PropTypes.object,
  }

  static childContextTypes = {
    parent: React.PropTypes.object,
  }

  static defaultProps = {
    row: false,
    raised: 0,
    disabled: false,
    size: 'fill',
    align: 'center',
    divider: false,
  }

  constructor(props, ...args){
    super(props, ...args);
    this.state = {};
    this.idleState = {};
    if( props.raised ){
      this.hasEverBeenRaised = true;
    }
  }

  // setStateWhenIdle works like setState, only it batches for a much longer time
  // 500-1000ms. It's primaily used to ease mass updates of the root layer when
  // components are added/removed all at once.
  setStateWhenIdle(o){
    for(let k in o){
      this.idleState[k] = o[k];
    }
    this.clearIdleTimer();
    this.idleTimer = setTimeout(this._setStateWhenIdle.bind(this),700);
  }

  _setStateWhenIdle(){
    if( !this.idleTimer ){
      return;
    }
    this.clearIdleTimer();
    if( !this.mounted ){
      return;
    }
    // shallow equal - can be removed once shouldComponentUpdate is implemented
    let changed = (() => {
      for(let k in this.idleState){
        if(this.state[k] != this.idleState[k]){
          return true;
        }
        console.log('not chnaged');
        return false;
      }
    })();
    if( changed ){
      this.setState(this.idleState);
    }
    this.idleState = {};
  }

  clearIdleTimer(){
    if( this.idleTimer ){
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
  }

  componentDidMount(){
    this.mounted = true;
    this.reportLayerNumberToRootLayer();
  }

  componentWillUnmount(){
    // mark as unmounted
    this.mounted = false;
    // ignore any pending state
    this.clearIdleTimer();
    // XXX: need to tell root layer we are nolonger here
    // this is important if we were previously the top layer,
    // but how will root layer know who is next in line?
    // for now the quick solution is to just forceupdate the tree
    // from the rootLayer down... but this is gonna be prohibitatively
    // expensive for complex layouts so need a better solution!
    this.forceLayerCalc(true);
  }

  componentWillReceiveProps(props){
    if( props.raised ){
      this.hasEverBeenRaised = true;
    }
    this.reportLayerNumberToRootLayer(props);
  }

  forceLayerCalc(unmounting){
    let root = this.getRootLayer();
    if( unmounting && root == this ){
      return;
    }
    if( this.hasEverBeenRaised ){
      root.setStateWhenIdle({topLayer: 0});
    }
  }

  // XXX: implement this... but it's going to be tricky
  shouldComponentUpdate(){
    // keeping a note of things to track:
    // * viewport values (need a way to opt in to listening to viewport sizes)
    // * props/state etc
    // * value of 'parent' ref from context
    // * theme config (since default theme may have been altered)
    // * topLayer
    return true;
  }

  // getChildContext returns the context for children
  getChildContext(){
    return {
      parent: this,
    };
  }

  // getParent fetches parent View
  getParent(){
    if( !this.context ){
      return undefined;
    }
    return this.context.parent;
  }

  // The first View to be rendered becomes the "root".
  // All descentant Views can tell the root to alter it's state.
  // This is how modals work... a child View can setState({modal: component})
  // and that gets rended as a child of the root view.
  getRoot(){
    let parent = this.getParent();
    return parent ? parent.getRoot() : this;
  }

  // Is this component the root?
  isRoot(){
    return this.getRoot() == this;
  }

  // isInRow returns true if the parent view that this view that contains
  // this view has been set to "row"
  isInRow(){
    let parent = this.getParent();
    return parent ? parent.props.row : View.defaultProps.row;
  }

  // getClassNames builds and returns all CSS classes
  // that will be given to the View.
  // Classes that extend from View can override/extend this to
  // add their own classes.
  getClassNames(){
    let cs = {
      view: true
    };
    if( this.props.className ){
      cs[this.props.className] = true;
    }
    if( this.props.disabled ){
      cs.disabled = true;
    }
    if( this.props.scroll ){
      cs.scroll = true;
    }
    if ( this.props.divider ) {
      cs.divider = true;
    }
    if( this.props.row ){
      cs.row = true;
    }else{
      cs.col = true;
    }
    // only non-transparent views can be raised
    let mode = this.getThemeMode();
    if( mode != 'transparent' ){
      let z = this.getRaise();
      if( z ){
        cs[`z${z}`] = true;
      }
    }
    return cs;
  }

  // getThemeMode returns the current theme mode.
  getThemeMode(){
    return this.getTheme().getMode();
  }

  isIntrinsic(){
    return this.props.size == 'intrinsic';
  }

  // getSize returns the element fixed-size if available or undefined if not.
  getSize(){
    let size = this.props.size;
    if( typeof size != 'number' ){
      return undefined;
    }
    return size;
  }

  // Return an interger between 0 and 5 that represents how far
  // off the page the element is raised. 0=flat 5=most-raised
  getRaise(nextProps) {
    let props = nextProps || this.props;
    // Material items can't be raised if they're disabled. It's science.
    if( props.disabled ){
      return 0;
    }
    // false is same as 0
    if( !props.raised ){
      return 0;
    }
    // true is same as 1
    if( props.raised === true ){
      return 1;
    }
    // number
    return props.raised;
  }

  getTextColor(){
    let theme = this.getTheme();
    return theme.getTextColor(false,this.getLayer(),this.getTopLayer());
  }

  // getBackgroundColor returns the current foreground color
  // for the active palette. ie. if theme=light, this returns the
  // light background color.
  getBackgroundColor(hueOffset=0){
    let theme = this.getTheme();
    return theme.getBackgroundColor(false,this.getLayer(),this.getTopLayer(),hueOffset);
  }

  // getStyle builds all the inline CSS styles that will be applied
  // to the View element.
  // Classes extending from View can override/extend this method
  // to add their own CSS properties.
  getStyle(){
    let style = this.props.style || {};
    style = {...style}; // React doesn't want us update old style
    let size = this.getSize();

    if( typeof size == 'number' ){
      if( this.props.hide ){
        size = 0;
      }
      style.flex = `0 0 ${size}rem`;
      style[this.isInRow() ? 'width' : 'height'] = `${size}rem`;
      style[this.isInRow() ? 'height' : 'width'] = 'auto';
    }
    else if( this.isIntrinsic() ){
      style[this.isInRow() ? 'width' : 'height'] = '-webkit-max-content';
      style.flex = '0 0 auto';
    }

    if( !style.backgroundColor ){
      style.backgroundColor = this.getBackgroundColor();
    }
    style.color = this.getTextColor();
    if( this.isClickable() ){
      style.cursor = 'pointer';
    }
    if(!this.props.scroll && !style.justifyContent){
      style.justifyContent =
        this.props.align == 'left' ? 'flex-start' :
        this.props.align == 'right' ? 'flex-end' :
        'center';
    }
    style.fontSize = this.getFontSize() + 'rem';
    style.lineHeight = this.getLineHeight() + 'rem';
    if( this.props.pad ){
      style.padding = this.getPadding() + 'rem';
    }
    if( this.props.divider ){
      style.borderColor = ( this.getTheme().getMode() == 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)' );
    }
    return style;
  }

  // Number of rems of padding to apply
  getPadding(){
    return this.getTheme().getSpacing();
  }

  // Number of rems for font size (number not css value)
  getFontSize(){
    return this.getScale();
  }

  // Number of rems for line height (number not css value)
  getLineHeight(){
    return this.getFontSize() * 1.5;
  }

  // isClickable returns true/false to decide if the item should
  // appear as clickable. Some styles use this method to decide
  // wether or not to show :hover or other indictators that the
  // component is clickable. Override in subclass to disable.
  isClickable(){
    if( this.props.disabled ){
      return false;
    }
    if( this.getClickHandler() ){
      return true;
    }
    return false;
  }

  // getThemeConfig fetches the active palette configuration.
  // It merges the palette configs from props/parent/global.
  getThemeConfig(){
    let parent = this.getParent();
    let inheritedTheme = parent ? parent.getThemeConfig() : {};
    let shortcutPaletteMode = PALETTE_MODES.filter(name => {
      return !!this.props[name];
    })[0];
    let shortcutTheme = {};
    if( shortcutPaletteMode ){
      shortcutTheme.paletteMode = shortcutPaletteMode;
      if( typeof this.props[shortcutPaletteMode] == 'string' ){
        shortcutTheme.hue = this.props[shortcutPaletteMode];
      }
    }
    let shortcutMode = THEME_MODES.filter(name => {
      return !!this.props[name];
    })[0];
    if ( shortcutMode ){
      shortcutTheme.mode = shortcutMode;
    }
    let propsTheme = {};
    if( this.props.theme ){
      propsTheme = this.props.theme;
    }
    let theme = {
      ...inheritedTheme,
      ...shortcutTheme,
      ...propsTheme,
    };
    return theme;
  }

  // getTheme returns the merged palette.
  getTheme(){
    return new ThemeManager(this.getThemeConfig());
  }

  // getLayer returns the current (or inherited) layer number
  getLayer(nextProps){
    let props = nextProps || this.props;
    let layer = props.layer;
    if( typeof layer == 'number' ){
      return layer;
    }
    let parent = this.getParent();
    layer = parent ? parent.getLayer() : 0;
    return this.getRaise(nextProps) ? layer+1 : layer;
  }

  reportLayerNumberToRootLayer(nextProps){
    let n = this.getLayer(nextProps);
    this.getRootLayer(nextProps).setTopLayer(n);
  }

  setTopLayer(n){
    if( typeof this.state.topLayer != 'number' || n > this.state.topLayer ){
      this.setState({topLayer: n});
    }
  }

  // The root layer is the first View in the parent chain that has layer=0
  // else it's the root-view.
  getRootLayer(nextProps){
    let props = nextProps || this.props;
    if( props.layer === 0 ){
      return this;
    }
    let parent = this.getParent();
    if( !parent ){
      return this;
    }
    return parent.getRootLayer();
  }

  // getTopLayer returns the topmost layer number by asking
  // the rootLayer (the layer with layer==0) for it's highest numbered child layer
  getTopLayer(){
    if( this == this.getRootLayer() ){
      if( typeof this.state.topLayer == 'number' ){
        return this.state.topLayer;
      }
    }
    let parent = this.getParent();
    if( !parent ){
      return 0;
    }
    return parent.getTopLayer();
  }

  // getScale returns the current (or inherited) scale factor
  getScale(){
    let scale = this.props.scale;
    if( typeof scale != 'number' ){
      let parent = this.getParent();
      scale = parent ? parent.getScale() : 1;
    }
    if( typeof scale != 'number' ){
      return 1;
    }
    return scale;
  }

  // Calling this method with a react element will
  // cause the element to be rendered as a child of the root.
  // This allows for a single modal element to be rendered for things
  // like popup menus and modal dialogs.
  // Call with null to remove the modal.
  setModalContent(view){
    return this.getRoot().refs.modal.setContent(view);
  }

  // showTip displays the tooltip (if available)
  showTip(){
    if( !this.props.tip ){
      return;
    }
    let pos = this.getAbsPosition();
    let tooltip = this.getRoot().refs.tip;
    tooltip.show(this.props.tip, pos, this.getTheme());
  }

  // tell tooltip to go away
  hideTip(){
    if( !this.props.tip ){
      return;
    }
    let tooltip = this.getRoot().refs.tip;
    tooltip.hideSoon();
  }

  // Returns absolute position of this view (uses DOM obviously so
  // only call from events).
  getAbsPosition(){
    return this.refs.view.getBoundingClientRect();
  }

  getTabIndex(){
    return this.props.tabIndex;
  }

  getMouseEnterHandler(){
    if( this.props.tip || this.props.onMouseEnter ){
      return this.onMouseEnter.bind(this);
    }
    return;
  }

  onMouseEnter(e){
    if( this.props.tip ){
      this.showTip();
    }
    if( this.props.onMouseEnter ){
      return this.props.onMouseEnter(e);
    }
    return;
  }

  getMouseLeaveHandler(){
    if( this.props.tip || this.props.onMouseLeave ){
      return this.onMouseLeave.bind(this);
    }
    return;
  }

  onMouseLeave(e){
    if( this.props.tip ){
      this.hideTip();
    }
    if( this.props.onMouseLeave ){
      return this.props.onMouseLeave(e);
    }
    return;
  }

  getClickHandler(){
    if( this.props.onClick){
      return this.onClick.bind(this);
    }
    return;
  }

  // onClickOutside is the event fired when someone clicks outside of
  // an active modal. This method is only accessed on the root.
  onClickOutside(){
    this.getRoot().refs.modal.clearContent();
  }

  // onClick is called when a click event on the View DOM node
  // is triggered.
  onClick(e){
    if( this.props.tip ){
      this.hideTip();
    }
    if( this.props.onClick ){
      return this.props.onClick(e);
    }
    return;
  }

  // render does what it says on the tin.
  // subclasses can call super.render(children) if they
  // need to extend render.
  render(children) {
    // subclasses may want to pass new children
    children = children || this.props.children;
    // main
    let view = <div
      ref="view"
      onClick={this.getClickHandler()}
      onClickCapture={this.props.onClickCapture}
      onMouseEnter={this.getMouseEnterHandler()}
      onMouseLeave={this.getMouseLeaveHandler()}
      style={this.getStyle()}
      className={cx(this.getClassNames())}
      disabled={this.props.disabled}
      tabIndex={this.getTabIndex()}>{children}</div>;
    if( this.isRoot() ){
      // if we are the root then we might need to
      // maintain some additional elements for global things like modals/tooltips
      let modal = <Modal ref="modal" />;
      let tooltip = <Tooltip ref="tip" />;
      return (
        <div className="root" onClick={this.onClickOutside.bind(this)}>
          <div className="rootView">{view}</div>
          {modal}
          {tooltip}
        </div>
      );
    }
    return view;
  }

}
