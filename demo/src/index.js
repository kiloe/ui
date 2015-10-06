import React from 'react';

import UI from '../../package/index';

import View from '../../package/View';
import Drawer from '../../package/Drawer';
import Toolbar from '../../package/Toolbar';
import Button from '../../package/Button';
import TextFormatIcon from '../../package/icons/TextFormatIcon';
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
import LayersIcon from '../../package/icons/LayersIcon';

import Buttons from './Buttons';
import Palette from './Palette';
import Lists from './Lists';
import Icons from './Icons';
import ProgressBars from './ProgressBars';
import Cards from './Cards';
import Layers from './Layers';
import ColorWheel from './ColorWheel';
import Typography from './Typography';

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
      case 'buttons'   :   return <Buttons />;
      case 'palette'   :   return <Palette />;
      case 'lists'     :   return <Lists />;
      case 'icons'     :   return <Icons />;
      case 'progress'  :   return <ProgressBars />;
      case 'cards'     :   return <Cards />;
      case 'layers'    :   return <Layers />;
      case 'typography':   return <Typography />;
    }
  }

  onPickPrimary(name){
    UI.theme.primaryPalette = name;
    this.forceUpdate();
  }

  onPickAccent(name, hue){
    UI.theme.accentPalette = name;
    UI.theme.accentHue = hue;
    this.forceUpdate();
  }

  getColorWheel(){
    return <View style={{padding:'2rem'}}>
      <View><h1>Color Picker</h1></View>
      <ColorWheel
        onPickPrimary={this.onPickPrimary.bind(this)}
        onPickAccent={this.onPickAccent.bind(this)}
      />
      <View row size={4} style={{padding:'1rem', justifyContent:'flex-end'}}>
        <Button outline accent label="continue"/>
      </View>
    </View>;
  }

  themePicker(){
    this.refs.main.setModalContent(this.getColorWheel());
  }

  render(){
    return (
      <View ref="main" row scale={this.state.scale}>
        <Drawer docked="huge" raised={3} hide={this.state.sidebarHidden} active={this.state.sidebarActive}>
          <Toolbar layer={0} accent>
            <View>Demo-crazy</View>
            <Button icon={<ArrowBackIcon/>} align="left" onClick={this.toggleMenu.bind(this)}/>
          </Toolbar>
          <View scroll>
            <Button icon={<LayersIcon/>} align="left" label="Layers" onClick={this.open('layers')} />
            <Button icon={<ViewAgendaIcon/>} align="left" label="Buttons" onClick={this.open('buttons')} />
            <Button icon={<ColorLensIcon/>} align="left" label="Palette" onClick={this.open('palette')} />
            <Button icon={<FullscreenIcon/>} align="left" label="Lists" onClick={this.open('lists')} />
            <Button icon={<AddCircleIcon/>} align="left" label="Icons" onClick={this.open('icons')} />
            <Button icon={<AddCircleIcon/>} align="left" label="Progress" onClick={this.open('progress')} />
            <Button icon={<AddCircleIcon/>} align="left" label="Cards" onClick={this.open('cards')} />
            <Button icon={<TextFormatIcon/>} align="left" label="Typography" onClick={this.open('typography')}/>
            <View/>
            <Button icon={<FormatPaintIcon/>} align="right" label="Paint Rollers A-C" />
            <Button icon={<FormatPaintIcon/>} align="right" label="Paint Rollers D-G" />
            <Button icon={<FormatPaintIcon/>} align="right" label="Paint Rollers H-M" />
            <Button icon={<FormatPaintIcon/>} align="right" label="Paint Rollers N-Z" />
          </View>
        </Drawer>
        <View onClickCapture={this.clickBody.bind(this)}>
          <Toolbar primary={'600'}>
            <Button onClick={this.toggleMenu.bind(this)} icon={<MenuIcon/>} />
            <View>Title</View>
            <Button onClick={this.scaleUp.bind(this)} icon={<ZoomInIcon/>} />
            <Button onClick={this.scaleDown.bind(this)} icon={<ZoomOutIcon/>} />
            <Button onClick={this.themePicker.bind(this)} icon={<FormatPaintIcon/>} />
            <Button onClick={this.toggleThemeMode.bind(this)} icon={<InvertColorsIcon/>}  />
            <Button onClick={this.toggleFullscreen.bind(this)} icon={<FullscreenIcon/>} />
          </Toolbar>
          {this.getPage()}
        </View>
      </View>
    );
  }
}

UI.render(<App/>, document.getElementById('app'));
