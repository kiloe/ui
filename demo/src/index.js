import React from 'react';

import UI from '../../package/index';
import {COLORS} from '../../package/utils/colors';

import View from '../../package/View';
import Drawer from '../../package/Drawer';
import Toolbar from '../../package/Toolbar';
import Button from '../../package/Button';
import Progress from '../../package/Progress';
import NotificationsActiveIcon from '../../package/icons/NotificationsActiveIcon';
import FormatPaintIcon from '../../package/icons/FormatPaintIcon';
import InvertColorsIcon from '../../package/icons/InvertColorsIcon';
import MenuIcon from '../../package/icons/MenuIcon';
import ZoomInIcon from '../../package/icons/ZoomInIcon';
import ZoomOutIcon from '../../package/icons/ZoomOutIcon';
import AddCircleIcon from '../../package/icons/AddCircleIcon';
import ArrowBackIcon from '../../package/icons/ArrowBackIcon';
import FullscreenIcon from '../../package/icons/FullscreenIcon';
import ColorLensIcon from '../../package/icons/ColorLensIcon';
import ViewAgendaIcon from '../../package/icons/ViewAgendaIcon';

import Buttons from './Buttons';
import Palette from './Palette';
import Lists from './Lists';
import Icons from './Icons';
import ProgressBars from './ProgressBars';
import Cards from './Cards';

export default class App extends React.Component {

  constructor(...args){
    super(...args);
    // Initial state
    this.state = {
      page: localStorage.getItem('page') || 'lists',
      scale: 1.2,
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

  open(page){
    return this.openPage.bind(this,page);
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

  scaleUp(){
    this.setState({scale: this.state.scale + 0.1});
  }

  scaleDown(){
    this.setState({scale: this.state.scale - 0.1});
  }

  getPage(){
    switch ( this.state.page ){
      case 'buttons'  :   return <Buttons />;
      case 'palette'  :   return <Palette />;
      case 'lists'    :   return <Lists />;
      case 'icons'    :   return <Icons />;
      case 'progress' :   return <ProgressBars />;
      case 'cards'    :   return <Cards />;
    }
  }

  render(){
    return (
      <View row scale={this.state.scale}>
        <Drawer docked="huge" raised={3} hide={this.state.sidebarHidden} active={this.state.sidebarActive}>
          <Toolbar accent>
            <View>Demo-crazy</View>
            <Button transparent icon={<ArrowBackIcon/>} align="left" onClick={this.toggleMenu.bind(this)}/>
          </Toolbar>
          <View scroll>
            <Button icon={<ViewAgendaIcon/>} align="left" label="Buttons" id="menu-buttons" onClick={this.open('buttons')} />
            <Button icon={<ColorLensIcon/>} align="left" label="Palette" onClick={this.open('palette')} />
            <Button icon={<FullscreenIcon/>} align="left" label="Lists" onClick={this.open('lists')} />
            <Button icon={<AddCircleIcon/>} align="left" label="Icons" onClick={this.open('icons')} />
            <Button icon={<AddCircleIcon/>} align="left" label="Progress" onClick={this.open('progress')} />
            <Button icon={<AddCircleIcon/>} align="left" label="Cards" onClick={this.open('cards')} />
            <Button icon={<NotificationsActiveIcon/>} align="left" label="Bells & Whistles" />
            <View/>
            <Button icon={<FormatPaintIcon/>} align="right" label="Paint Rollers A-C" />
            <Button icon={<FormatPaintIcon/>} align="right" label="Paint Rollers D-G" />
            <Button icon={<FormatPaintIcon/>} align="right" label="Paint Rollers H-M" />
            <Button icon={<FormatPaintIcon/>} align="right" label="Paint Rollers N-Z" />
          </View>
        </Drawer>
        <View onClickCapture={this.clickBody.bind(this)}>
          <Toolbar primary={'600'}>
            <Button transparent onClick={this.toggleMenu.bind(this)} icon={<MenuIcon/>} />
            <View>Title</View>
            <Button transparent onClick={this.scaleUp.bind(this)} icon={<ZoomInIcon/>} />
            <Button transparent onClick={this.scaleDown.bind(this)} icon={<ZoomOutIcon/>} />
            <Button transparent onClick={this.toggleDiscoMode.bind(this)} icon={<FormatPaintIcon/>} />
            <Button transparent onClick={this.toggleThemeMode.bind(this)} icon={<InvertColorsIcon/>}  />
            <Button transparent onClick={this.toggleFullscreen.bind(this)} icon={<FullscreenIcon/>} />
          </Toolbar>
          {this.getPage()}
        </View>
      </View>
    );
  }
}

UI.render(<App/>, document.getElementById('app'));
