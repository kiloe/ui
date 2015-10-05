import React from 'react';
import cx from 'classnames';
import {defaultTheme,ThemeManager} from './utils/themeManager';
import CSS from './utils/css';

const SIZES = ['fill', 'intrinsic'];
const THEME_MODES = ['light', 'dark'];
const PALETTE_MODES = ['primary','accent','grey'];

CSS.register({
  '.view': {
    boxSizing: 'content-box',
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    alignContent: 'stretch',
    borderRadius: 1,
    overflow: 'hidden',
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
    position: 'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    overflow:'auto',
    WebkitOverflowScrolling: 'touch',
  },
  '.view .view:nth-child(1)': {
    // zIndex:10
  },
  '.view.vsplit': {
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
    opacity:'0.2 !important',
    filter: 'grayscale(100%)',
    WebkitFilter: 'grayscale(100%)',
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
      // switch foreground/background colors
      invert: React.PropTypes.bool,

    }),
    // Shortcut props for setting palette theme + hue
    // Note: do not use this for controlling logic, instead fetch the palette via getTheme()
    light: React.PropTypes.bool,
    dark: React.PropTypes.bool,
    primary: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.bool]),
    accent: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.bool]),
    grey: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.bool]),
    // Shortcut for setting pallete invert
    invert: React.PropTypes.bool,
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
    scroll: false,
    disabled: false,
    size: 'fill',
    align: 'center',
    divider: false,
  }

  constructor(...args){
    super(...args);
    this.state = {};
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
    return !parent ? this : parent;
  }

  // isRow returns true if the parent view that this view resides in
  // has been set to show it's children as columns.
  isColumn(){
    return this.getParent().props.row;
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
    cs.vsplit = this.props.row;
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
  getRaise() {
    // Material items can't be raised if they're disabled. It's science.
    if( this.props.disabled ){
      return 0;
    }
    // false is same as 0
    if( !this.props.raised ){
      return 0;
    }
    // true is same as 1
    if( this.props.raised === true ){
      return 1;
    }
    // number
    return this.props.raised;
  }

  isInverted() {
    return this.props.invert;
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
    if( this.props.disabled && this.invert ){
      return 'transparent';
    }
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
      style[this.isColumn() ? 'width' : 'height'] = `${size}rem`;
      style[this.isColumn() ? 'height' : 'width'] = 'auto';
    }
    else if( this.isIntrinsic() ){
      style[this.isColumn() ? 'width' : 'height'] = '-webkit-max-content';
      style.flex = '0 0 auto';
    }

    if( !style.backgroundColor ){
      style.backgroundColor = this.getBackgroundColor();
    }
    style.color = this.getTextColor();
    if( this.isClickable() ){
      style.cursor = 'pointer';
    }
    if( this.props.scroll ){
      style.position = 'relative';
    }else if(!style.justifyContent){
      style.justifyContent =
        this.props.align == 'left' ? 'flex-start' :
        this.props.align == 'right' ? 'flex-end' :
        'center';
    }
    if( !style.fontSize ){
      style.fontSize = this.getScale() + 'rem';
    }
    if ( this.props.divider ) {
      style.borderBottom = '1px solid ' + ( this.getTheme().getMode() == 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)' );
    }
    return style;
  }

  // isClickable returns true/false to decide if the item should
  // appear as clickable. Some styles use this method to decide
  // wether or not to show :hover or other indictators that the
  // component is clickable. Override in subclass to disable.
  isClickable(){
    return !this.props.disabled && this.props.onClick;
  }

  // getThemeConfig fetches the active palette configuration.
  // It merges the palette configs from props/parent/global.
  getThemeConfig(){
    let parent = this.getParent();
    let inheritedTheme = parent ? parent.getThemeConfig() : defaultTheme;
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
    if( this.isInverted() ){
      shortcutTheme.invert = true;
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
  getLayer(){
    let layer = this.props.layer;
    if( typeof layer == 'number' ){
      return layer;
    }
    let parent = this.getParent();
    layer = parent ? parent.getLayer() : 0;
    return this.props.raised ? layer+1 : layer;
  }

  componentDidMount(){
    this.reportLayerNumberToRootLayer();
  }

  componentWillReceiveProps(props){
    if( props.layer != this.props.layer || props.raised != this.props.raised ){
      this.reportLayerNumberToRootLayer(props.layer);
    }
  }

  reportLayerNumberToRootLayer(n){
    if( typeof n == 'undefined' ){
      n = this.getLayer();
    }
    this.getRootLayer().setTopLayer(n);
  }

  setTopLayer(n){
    if( this.getRootLayer() != this ){ //XXX: remove this check once happy
      console.error('setTopLayer should never be called on a non-root layer');
      return;
    }
    if( typeof this.state.topLayer != 'number' || n > this.state.topLayer ){
      this.setState({topLayer: n});
    }
  }

  getRootLayer(){
    if( this.props.layer == 0 ){
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
    if( typeof this.state.topLayer == 'number' ){
      return this.state.topLayer;
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

  // onClickOutside is the event fired when someone clicks outside of
  // an active modal. This method is only accessed on the root.
  onClickOutside(){
    this.setState({modal: null});
  }

  // onClick is called when a click event on the View DOM node
  // is triggered.
  onClick(e){
    if( this.getRoot() == this ){
      this.onClickOutside(e);
    }
    if( this.isClickable() && this.props.onClick ){
      this.props.onClick(e);
    }
  }

  // Calling this method with a react element will
  // cause the element to be rendered as a child of the root.
  // This allows for a single modal element to be rendered for things
  // like popup menus and modal dialogs.
  // Call with null to remove the modal.
  setModal(view){
    this.getRoot().setState({modal: view});
  }

  // render does what it says on the tin.
  // subclasses can call super.render(children) if they
  // need to extend render.
  render(children) {
    children = children || this.props.children;
    // wrap in a scrolly thing if scrolling
    if( this.props.scroll ){
      children = <View
        className="scroll"
        style={{justifyContent:'stretch'}}
        row={this.props.row}>
          {children}
      </View>;
    }
    // if we are the root then we might need to
    // render an additional child for the modal.
    let modal;
    if( this == this.getRoot() && this.state.modal ){
      modal = this.state.modal;
    }
    // render
    return (
      <div ref="view"
      data-layer={this.getLayer()}
      data-layer-prop={this.props.layer}
      onClick={this.isClickable() || this.getRoot() == this ? this.onClick.bind(this) : undefined}
      onClickCapture={this.props.onClickCapture}
      style={this.getStyle()}
      className={cx(this.getClassNames())}
      disabled={this.props.disabled}>
        {children}
        {modal}
      </div>
    );
  }

}
