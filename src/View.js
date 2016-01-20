import React from 'react';
import shallowEqual from './utils/shallowEqual';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import {defaultTheme,ThemeManager} from './utils/themeManager';
import CSS from './utils/css';
import Overlay from './Overlay';
import Tooltip from './Tooltip';
// import shallowCompare from 'react-addons-shallow-compare';

const SIZES = ['fill', 'intrinsic'];
const THEME_MODES = ['light', 'dark', 'transparent'];
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
    zIndex: 0,
  },
  '.view': {
    boxSizing: 'content-box', // note to self: required so that we can rely on the size prop
    display: 'flex',
    flex: '1', // let items take up what they need when theres room or squash+clip when not
    flexDirection: 'column',
    flexWrap: 'nowrap', // only ever one row or column (see Grid for wrappy things)
    alignItems: 'stretch',
    alignContent: 'stretch',
    borderRadius: 1,
    // overflow: 'hidden', // required to give the 'clipping' behaviour that material should have
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
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    UserSelect: 'none',
    maxWidth: '100%',
    WebkitBackfaceVisibility: 'hidden', // this fixes some severe flickering in Safari but it might have some side-effects...
  },
  '.view.scroll': {
    position: 'relative',
    overflow:'auto !important',
    display: 'block', // XXX: unexpected layout? it might be this... it's here because otherwise fast-path scrolling doesn't want to work
    WebkitOverflowScrolling: 'touch',
  },
  '.view.row': {
    flexDirection: 'row'
  },
  '.view.z1': {
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    overflow: 'hidden',
    // zIndex:1,
  },
  '.view.z2': {
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    overflow: 'hidden',
    // zIndex:2,
  },
  '.view.z3': {
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    overflow: 'hidden',
    // zIndex:3,
  },
  '.view.z4': {
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    overflow: 'hidden',
    // zIndex:4,
  },
  '.view.z5': {
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
    overflow: 'hidden',
    // zIndex:5,
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
  '.view svg': {
  	//position: 'absolute',
    top: '0',
    left: '0',
    maxWidth: '100%',
    maxHeight: '100%',
	},
  '.view.icon svg': {
  	position: 'absolute',
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
    root: React.PropTypes.object,
    row: React.PropTypes.bool,
    theme: React.PropTypes.object,
    layer: React.PropTypes.number,
    topLayer: React.PropTypes.number,
    scale: React.PropTypes.number,
    scrollParent: React.PropTypes.object,
    size: React.PropTypes.number,
    registerLayer: React.PropTypes.func,
  }

  static childContextTypes = {
    root: React.PropTypes.object.isRequired,
    row: React.PropTypes.bool,
    theme: React.PropTypes.object.isRequired,
    layer: React.PropTypes.number.isRequired,
    topLayer: React.PropTypes.number,
    scale: React.PropTypes.number.isRequired,
    scrollParent: React.PropTypes.object.isRequired,
    size: React.PropTypes.number,
    registerLayer: React.PropTypes.func,
  }

  static defaultProps = {
    raised: 0,
    disabled: false,
    size: 'fill',
    align: 'center',
  }

  constructor(props, ...args){
    super(props, ...args);
    this._id = Math.random().toString(); // XXX: come up with something better
  }

  componentDidMount(){
    this.mounted = true;
    this.layerDidUpdate();
  }

  componentWillUnmount(){
    // mark as unmounted
    this.mounted = false;
    // remove layer
    this.layerWillUnmount();
    // tell overlays we are gone
    this.getRoot().clearModals(this);
    this.getScrollParent().clearModals(this);
    delete this._modals;
  }

  componentDidUpdate(){
    this.layerDidUpdate();
  }

  layerDidUpdate(){
    let reg = this.getRegisterLayerHandler();
    if( this.oldLayerHandler && reg != this.oldLayerHandler ){
      this.oldLayerHandler(this.getID(), null);
      this.oldLayerHandler = null;
    }
    if( !reg ){
      return;
    }
    if( this.isBottomLayer() ){
      return;
    }
    reg(this.getID(), this.getLayer());
  }

  layerWillUnmount(){
    let reg = this.getRegisterLayerHandler();
    if( !reg ){
      return;
    }
    reg(this.getID(), null);
  }

  componentWillReceiveProps(){
    this.oldLayerHandler = this.getRegisterLayerHandler();
  }

  // XXX: implement this... but it's going to be tricky
  // keeping a note of things to track:
  // TODO: viewport values (need a way to opt in to listening to viewport sizes)
  // DONE: props
  // DONE: state (for topLayer / modals)
  // DONE: context
  // DONE: theme config (since default theme may have been altered)
  shouldComponentUpdate(nextProps, nextState, nextContext){
    let propsDiffers = Object.keys(this.constructor.propTypes).some((k) => {
      if( k == 'style' ){
        return !shallowEqual(this.props[k], nextProps[k]);
      }
      if( k == 'theme' ){
        return !shallowEqual(this.props[k], nextProps[k]);
      }
      return this.props[k] !== nextProps[k];
    });
    if( propsDiffers ){
      return true;
    }
    for( let k in nextProps ){
      if( typeof this.constructor.propTypes[k] != 'undefined' ){
        continue;
      }
      if( this.props[k] != nextProps[k] ){
        return true;
      }
    }
    for( let k in this.props ){
      if( typeof this.constructor.propTypes[k] != 'undefined' ){
        continue;
      }
      if( this.props[k] != nextProps[k] ){
        return true;
      }
    }

    let cxtDiffers = Object.keys(this.constructor.contextTypes).some((k) => {
      if( k == 'theme' ){
        return !shallowEqual(this.context.theme, nextContext.theme);
      }
      return this.context[k] !== nextContext[k];
    });
    if( cxtDiffers ){
      return true;
    }
    // check if state has changed
    if( !shallowEqual(this.state, nextState) ){
      return true;
    }
    // check if modals have changed
    if( this.lastRenderedModalHash != this.currentModalHash ){
      return true;
    }
    return false;
  }

  // getChildContext returns the context for children
  getChildContext(){
    return {
      root: this.getRoot(),
      row: this.isRow(),
      theme: this.getThemeConfig(),
      layer: this.getLayer(),
      topLayer: this.getTopLayer(),
      scale: this.getScale(),
      scrollParent: this.getScrollParent(),
      size: this.getSize(),
      registerLayer: this.getRegisterLayerHandler(),
    };
  }

  isRow(){
    return this.props.row;
  }

  isBottomLayer(){
    return this.props.layer === 0 || this.isRoot();
  }

  getRegisterLayerHandler(){
    if( this.isBottomLayer() ){
      if( !this._registerLayer ){
        this._registerLayer = this.registerLayer;
      }
      return this._registerLayer;
    }
    if( this.context && this.context.registerLayer ){
      return this.context.registerLayer;
    }
  }

  registerLayer = (id, layerNumber) => {
    if( !this.childLayers ){
      this.childLayers = {};
    }
    if( layerNumber === null ){
      delete this.childLayers[id];
    } else {
      this.childLayers[id] = layerNumber;
    }
    this.updateLayerState();
  }

  updateLayerState(){
    if( !this.childLayers ){
      return;
    }
    let layers = Object.keys(this.childLayers).map(k => this.childLayers[k]);
    let topLayer = Math.max(0, ...layers);
    if( topLayer != this.topLayer ){
      this.topLayer = topLayer;
      this.setState({topLayer: this.topLayer});
    }
  }

  // The first View to be rendered becomes the "root".
  getRoot(){
    if( this.context && this.context.root ){
      return this.context.root;
    }
    return this;
  }

  // Is this component the root?
  isRoot(){
    return this.getRoot() == this;
  }

  // isInRow returns true if the parent view that this view that contains
  // this view has been set to "row"
  isInRow(){
    if( this.context && this.context.row ){
      return this.context.row;
    }
    return false;
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
    if( this.getRaise() > 0 ){
      cs.raised = true;
    }
    if( this.isRow() ){
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
    let style = {};
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
      style.borderBottomColor = ( this.getTheme().getMode() == 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)' ) + ' !important';
    }
    return style;
  }

  // allow style prop to override component defined styles
  getMergedStyle(){
    let style = this.getStyle();
    if( this.props.style ){
      return {...style, ...this.props.style};
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
    if( this.props.onClick ){
      return true;
    }
    return false;
  }

  // getThemeConfig fetches the active palette configuration.
  // It merges the palette configs from props/parent/global.
  getThemeConfig(){
    let inheritedTheme = defaultTheme;
    if( this.context && this.context.theme ){
      inheritedTheme = this.context.theme;
    }
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
  getTheme(overrides){
    let cfg = this.getThemeConfig();
    if( overrides ){
      cfg = {...cfg, ...overrides};
    }
    return new ThemeManager(cfg);
  }

  getTopLayer(){
    if( this.isBottomLayer() ){
      if( this.state && typeof this.state.topLayer == 'number' ){
        return this.state.topLayer;
      }
      return this.getLayer();
    }else{
      let layer = this.getLayer();
      if( this.context && typeof this.context.topLayer == 'number' && this.context.topLayer > layer){
        return this.context.topLayer;
      }
      return layer;
    }
  }

  // getLayer returns the current (or inherited) layer number
  getLayer(nextProps){
    let props = nextProps || this.props;
    let layer = props.layer;
    if( typeof layer == 'number' ){
      return layer;
    }
    layer = 0;
    if( this.context && typeof this.context.layer == 'number' ){
      layer = this.context.layer;
    }
    return this.getRaise(nextProps) ? layer+1 : layer;
  }

  // getScale returns the current (or inherited) scale factor
  getScale(){
    let scale = this.props.scale;
    if( typeof scale != 'number' ){
      scale = this.context && this.context.scale;
    }
    if( typeof scale != 'number' ){
      return 1;
    }
    return scale;
  }

  // Get a reference to the Modal for displaying content relative to root view
  getFixedOverlay(){
    return this.getRoot().refs.fixedOverlay;
  }

  // Get a reference to the overlay for displaying content relative to scroll view
  getRelativeOverlay(){
    return this.getScrollParent().refs.relativeOverlay;
  }

  // fetch the parent responsible for scrolling
  // this may be root view, but may be some other parent with scroll=true
  getScrollParent(){
    if( this.props.scroll ){
      return this;
    }
    if( this.context && this.context.scrollParent ){
      return this.context.scrollParent;
    }
    return this.getRoot();
  }

  hasTip(){
    return !!this.props.tip;
  }

  getTip(){
    return this.props.tip;
  }

  // showTip displays the tooltip (if available)
  showTip(){
    if( !this.hasTip() ){
      return;
    }
    let pos = this.getAbsPosition();
    let tooltip = this.getRoot().refs.tip;
    tooltip.show(this.getTip(), pos, this.getTheme());
  }

  // tell tooltip to go away
  hideTip(){
    if( !this.hasTip() ){
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
      return this.onMouseEnter;
    }
    return;
  }

  onMouseEnter = (e) => {
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
      return this.onMouseLeave;
    }
    return;
  }

  onMouseLeave = (e) => {
    if( this.props.tip ){
      this.hideTip();
    }
    if( this.props.onMouseLeave ){
      return this.props.onMouseLeave(e);
    }
    return;
  }

  getClickHandler(){
    if( this.props.onClick || this.props.scroll ){
      return this.onClick;
    }
    return;
  }

  // onClick is called when a click event on the View DOM node
  // is triggered.
  onClick = (e) => {
    if( this.props.tip ){
      this.hideTip();
    }
    if( this.props.onClick ){
      this.props.onClick(e);
    }
    return;
  }

  // registerModals extracts any Modal components from the children
  // and registers them with the appriate overlay, the overlay part of the
  // tree will get rendered on the next cycle.
  registerModals(children){
    let fixed = this.getRoot();
    let relative= this.getScrollParent();
    fixed.clearModals(this, true);
    relative.clearModals(this, false);
    let newChildren = React.Children.map(children, (child) => {
      if( !child ){
        return false;
      }
      if( !child.type ){
        return child;
      }
      if( child.type !== Modal && !(child.type.prototype instanceof Modal) ){
        return child;
      }
      if( child.props && child.props.relative ){
        relative.setModal(this, child);
      } else {
        fixed.setModal(this, child);
      }
      return false;
    });
    if( newChildren ){
      return newChildren.filter(child => child);
    }
    return newChildren;
  }

  // setModal add a modal to this View's overlay
  setModal(owner, modal){
    if( !this.props.scroll && !this.isRoot() ){
      throw new Error('setModals only available to scrolling or root views');
    }
    if( !this._modals ){
      this._modals = [];
    }
    let id = owner.getID();
    let modals;
    for( let m of this._modals ){
      if( m.owner == id ){
        modals = m.modals;
      }
    }
    if( !modals ){
      let m = {owner: id, modals: []};
      this._modals.push(m);
      modals = m.modals;
    }
    modals.push(modal);
    this.updateModalState();
  }

  updateModalState(){
    if( !this.props.scroll && !this.isRoot() ){
      throw new Error('updateModalState only available to scrolling or root views');
    }
    this.modals = this._modals.reduce((modals,m) => {
      return modals.concat(m.modals);
    }, []);
    this.currentModalHash = this.getModalHash(this.modals);
    setTimeout(() => {
      if( this.currentModalHash != this.lastRenderedModalHash ){
        this.forceUpdate();
      }
    },0);
  }

  getModalHash(modals){
    if( !modals ){
      return;
    }
    return modals.map((m) => {
      if( !m.props.id ){
        console.warn('Modal found without an id prop', m);
      }
      return m.props.id;
    }).join(':');
  }

  getModals(){
    if( !this.props.scroll && !this.isRoot() ){
      throw new Error('getModals only available to scrolling or root views');
    }
    return this.modals || [];
  }

  // clearModal removes modals from this View's overlay
  // if fixed is set true remove only fixed modals
  // if fixed is set false remove only relative modals
  // if fixed is undefined remove all modals
  clearModals(owner, fixed){
    if( !this.props.scroll && !this.isRoot() ){
      throw new Error('clearModals only available to scrolling or root views');
    }
    let id = owner.getID();
    if( !this._modals ){
      return;
    }
    this._modals = this._modals.filter(m => {
      if( m.owner != id ){
        return true;
      }
      if( typeof fixed == 'undefined' ){ // clear all
        m.modals = [];
      } else {
        m.modals = m.modals.filter(modal => fixed && modal.props.relative);
      }
      return m.modals.length !== 0;
    });
    this.updateModalState();
  }

  // getID returns the components unique id
  getID(){
    return this._id;
  }

  // render does what it says on the tin.
  // subclasses can call super.render(children) if they
  // need to extend render.
  render(children) {
    // subclasses may want to pass new children
    children = children || this.props.children;
    // extact Modals from children
    children = this.registerModals(children);
    // if we are a scrolling thing or root then we need an overlay
    let overlay;
    if( this.props.scroll || this.isRoot() ){
      let modals = this.getModals();
      this.lastRenderedModalHash = this.getModalHash(modals);
      overlay = <Overlay key="overlay" >
        {modals}
      </Overlay>;
    }
    // main
    let view = <div
      ref="view"
      onClick={this.getClickHandler()}
      onClickCapture={this.props.onClickCapture}
      onMouseEnter={this.getMouseEnterHandler()}
      onMouseLeave={this.getMouseLeaveHandler()}
      style={this.getMergedStyle()}
      className={cx(this.getClassNames())}
      disabled={this.props.disabled}
      tabIndex={this.getTabIndex()}>{children}{overlay}</div>;
    // if we are the root then we have other things to do
    if( this.isRoot() ){
      return (
        <div className="root">
          <div className="rootView">{view}</div>
          <Tooltip ref="tip" />
        </div>
      );
    }
    return view;
  }

}

import Modal from './Modal';
