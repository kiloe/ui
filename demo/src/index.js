import React from 'react';
import ReactDOM from 'react-dom';

import DemoView from './DemoView';
import {COLORS} from '../../src/utils/colors';
import CSS from '../../src/utils/css';
import {defaultTheme} from '../../src/utils/themeManager';

export default class App extends React.Component {

  static styles = {
    'html': {
      fontFamily: `'Roboto', sans-serif`,
      WebkitTapHighlightColor: 'transparent',
      fontSize: 12,
    },
    '*, *:before, *:after': {
      WebkitTapHighlightColor: 'inherit',
    },
    'html,body,#app': {
      margin:0,
      padding: 0,
      display: 'flex',
      flex: '0 0 100%',
      justifyContent: 'center',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      alignItems: 'stretch',
      alignContent: 'stretch',
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      width: '100%',
      background: '#ccc'
    },
    ...DemoView.styles,
  }

  static propTypes = {
    token: React.PropTypes.string,
    onAuthenticated: React.PropTypes.func
  }

  constructor(...args){
    super(...args);
    this.state = {};
  }

  enableDiscoMode(){
    if ( this.discoInterval ) {
      console.log( 'Party over! Oops, out of time :(' ); // Prince lyric FYI
      clearInterval( this.discoInterval );
      this.discoInterval = false;
    }
    else {
      this.discoInterval = setInterval(() => {
        let notAccent = ['brown', 'grey', 'blue-grey'];
        let primaryColors = Object.keys(COLORS);
        let accentColors = Object.keys(COLORS).filter(c => notAccent.indexOf(c) === -1 );
        defaultTheme.primaryPalette = primaryColors[Math.floor(Math.random()*primaryColors.length)];
        defaultTheme.accentPalette = accentColors[Math.floor(Math.random()*accentColors.length)];
        this.forceUpdate();
      },1000);
    }
  }

  toggleThemeMode(){
    defaultTheme.mode = defaultTheme.mode=='light' ? 'dark' : 'light';
    this.forceUpdate();
    console.log('Changed theme to:', defaultTheme.mode);
  }

  closeDrawer(){
    if( this.state.sidebarActive ){
      this.setState({sidebarActive: false});
    }
  }

  toggleDrawer(){
    this.setState({sidebarActive: !this.state.sidebarActive});
  }

  toggleSidebar(){
    this.setState({sidebarHidden: !this.state.sidebarHidden});
  }

  render(){
    return (
      <DemoView app={this} {...this.state} />
    );
  }
}

CSS.render(App);
ReactDOM.render(<App/>, document.getElementById('app'));
