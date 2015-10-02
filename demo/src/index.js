import React from 'react';
import ReactDOM from 'react-dom';

import {COLORS} from '../../src/utils/colors';
import CSS from '../../src/utils/css';
import {defaultTheme} from '../../src/utils/themeManager';
import viewport from '../../src/utils/viewport';

import View from '../../src/View';
import DrawerView from '../../src/DrawerView';
import ToolbarView from '../../src/ToolbarView';
import ButtonView from '../../src/ButtonView';
import Menu from '../../src/Menu';
import MenuItemView from '../../src/MenuItemView';
import NotificationsActiveIcon from '../../src/icons/NotificationsActiveIcon';
import CloudIcon from '../../src/icons/CloudIcon';
import FormatPaintIcon from '../../src/icons/FormatPaintIcon';
import InvertColorsIcon from '../../src/icons/InvertColorsIcon';
import MenuIcon from '../../src/icons/MenuIcon';
import AddCircleIcon from '../../src/icons/AddCircleIcon';
import ArrowBackIcon from '../../src/icons/ArrowBackIcon';
import FullscreenIcon from '../../src/icons/FullscreenIcon';
import ColorLensIcon from '../../src/icons/ColorLensIcon';
import ViewAgendaIcon from '../../src/icons/ViewAgendaIcon';

import Buttons from './Buttons';
import Palette from './Palette';
import Lists from './Lists';
import Icons from './Icons';

export default class App extends React.Component {

  static styles = {
    ...View.styles,
    ...DrawerView.styles,
    ...ToolbarView.styles,
    ...Menu.styles,
    ...MenuItemView.styles,
    ...ButtonView.styles,
    ...Palette.styles,
    ...Lists.styles,
    ...Buttons.styles,
    ...Icons.styles,
  }

  constructor(...args){
    super(...args);
    this.state = {
      page: localStorage.getItem('page') || 'lists',
    };
  }

  toggleMenu(){
    if( viewport.width.huge ){
      this.toggleSidebar();
    }else{
      if( this.state.sidebarHidden ){
        this.toggleSidebar();
      }
      this.toggleDrawer();
    }
  }

  toggleFullscreen(){
    viewport.toggleFullscreen();
  }

  clickBody(){
    this.closeDrawer();
  }

  toggleDiscoMode(){
    if ( this.state.discoInterval ) {
      console.log( 'Party over! Oops, out of time :(' ); // Prince lyric FYI
      clearInterval( this.state.discoInterval );
      this.setState({discoInterval:false});
    }
    else {
      this.setState({discoInterval: setInterval(() => {
        let notAccent = ['brown', 'grey', 'blue-grey'];
        let primaryColors = Object.keys(COLORS);
        let accentColors = Object.keys(COLORS).filter(c => notAccent.indexOf(c) === -1 );
        defaultTheme.primaryPalette = primaryColors[Math.floor(Math.random()*primaryColors.length)];
        defaultTheme.accentPalette = accentColors[Math.floor(Math.random()*accentColors.length)];
        this.forceUpdate();
      },1000)});
    }
  }

  openPage(page){
    console.log('Opening page:', page);
    this.setState({page:page});
    this.toggleMenu();
    localStorage.setItem('page', page);
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

  getPage(){
    switch ( this.state.page ){
      case 'buttons'  :   return <Buttons />;
      case 'palette'  :   return <Palette />;
      case 'lists'    :   return <Lists />;
      case 'icons'    :   return <Icons />;
    }
  }

  render(){

    let cloudMenu = <Menu>
      <ButtonView align="left" icon={<AddCircleIcon/>} label="Open" />
      <ButtonView align="left" icon={<AddCircleIcon/>} label="Save file as..." />
      <ButtonView align="left" icon={<AddCircleIcon/>} label="Quit now" />
    </Menu>;

    let page = this.getPage();

    return (
      <View row>
        <DrawerView docked="huge" raised={3} hide={this.state.sidebarHidden} active={this.state.sidebarActive}>
          <ToolbarView accent scale={2}>
            <View>Demo-crazy</View>
            <ButtonView icon={<ArrowBackIcon/>} align="left" onClick={this.toggleMenu.bind(this)}/>
          </ToolbarView>
          <View scroll>
            <ButtonView icon={<ViewAgendaIcon/>} align="left" label="Buttons" id="menu-buttons" onClick={this.openPage.bind(this,'buttons')} />
            <ButtonView icon={<ColorLensIcon/>} align="left" label="Palette" onClick={this.openPage.bind(this, 'palette')} />
            <ButtonView icon={<FullscreenIcon/>} align="left" label="Lists" onClick={this.openPage.bind(this, 'lists')} />
            <ButtonView icon={<AddCircleIcon/>} align="left" label="Icons" onClick={this.openPage.bind(this, 'icons')} />
            <ButtonView icon={<NotificationsActiveIcon/>} align="left" label="Bells & Whistles" />
            <View/>
            <ButtonView icon={<FormatPaintIcon/>} align="right" label="Paint Rollers A-C" />
            <ButtonView icon={<FormatPaintIcon/>} align="right" label="Paint Rollers D-G" />
            <ButtonView icon={<FormatPaintIcon/>} align="right" label="Paint Rollers H-M" />
            <ButtonView icon={<FormatPaintIcon/>} align="right" label="Paint Rollers N-Z" />
          </View>
        </DrawerView>
        <View onClickCapture={this.clickBody.bind(this)}>
          <ToolbarView primary={'600'} scale={2}>
            <ButtonView onClick={this.toggleMenu.bind(this)} icon={<MenuIcon/>} />
            <View>Title</View>
            <ButtonView onClick={this.toggleDiscoMode.bind(this)} icon={<FormatPaintIcon/>} label="Disco" />
            <ButtonView onClick={this.toggleThemeMode.bind(this)} icon={<InvertColorsIcon/>} label="Theme" />
            <ButtonView menu={cloudMenu} icon={<CloudIcon/>} label="Cloud" />
            <ButtonView menu={cloudMenu} icon={<NotificationsActiveIcon/>} label="alerts" />
            <ButtonView onClick={this.toggleFullscreen.bind(this)} icon={<FullscreenIcon/>} />
          </ToolbarView>

          {page}

        </View>
      </View>
    );
  }
}

CSS.render(App);
ReactDOM.render(<App/>, document.getElementById('app'));
