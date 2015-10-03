import React from 'react';

import UI from '../../package/index';
import {COLORS} from '../../package/utils/colors';

import View from '../../package/View';
import DrawerView from '../../package/DrawerView';
import ToolbarView from '../../package/ToolbarView';
import ButtonView from '../../package/ButtonView';
import Menu from '../../package/Menu';
import NotificationsActiveIcon from '../../package/icons/NotificationsActiveIcon';
import CloudIcon from '../../package/icons/CloudIcon';
import FormatPaintIcon from '../../package/icons/FormatPaintIcon';
import InvertColorsIcon from '../../package/icons/InvertColorsIcon';
import MenuIcon from '../../package/icons/MenuIcon';
import AddCircleIcon from '../../package/icons/AddCircleIcon';
import ArrowBackIcon from '../../package/icons/ArrowBackIcon';
import FullscreenIcon from '../../package/icons/FullscreenIcon';
import ColorLensIcon from '../../package/icons/ColorLensIcon';
import ViewAgendaIcon from '../../package/icons/ViewAgendaIcon';

import Buttons from './Buttons';
import Palette from './Palette';
import Lists from './Lists';
import Icons from './Icons';

export default class App extends React.Component {

  constructor(...args){
    super(...args);
    // Initial state
    this.state = {
      page: localStorage.getItem('page') || 'lists',
    };
    // Trigger update on browser resize
    UI.viewport.on('change', () => {
      this.forceUpdate();
    });
  }

  toggleMenu(){
    if( UI.viewport.width.huge ){
      this.toggleSidebar();
    }else{
      if( this.state.sidebarHidden ){
        this.toggleSidebar();
      }
      this.toggleDrawer();
    }
  }

  toggleFullscreen(){
    UI.viewport.toggleFullscreen();
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
        UI.theme.primaryPalette = primaryColors[Math.floor(Math.random()*primaryColors.length)];
        UI.theme.accentPalette = accentColors[Math.floor(Math.random()*accentColors.length)];
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
    UI.theme.mode = UI.theme.mode=='light' ? 'dark' : 'light';
    this.forceUpdate();
    console.log('Changed theme to:', UI.theme.mode);
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

UI.render(<App/>, document.getElementById('app'));
