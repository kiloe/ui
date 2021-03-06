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
import MoreVertIcon from '../../package/icons/MoreVertIcon';
import AddCircleIcon from '../../package/icons/AddCircleIcon';
import ArrowBackIcon from '../../package/icons/ArrowBackIcon';
import AccessTimeIcon from '../../package/icons/AccessTimeIcon';
import FullscreenIcon from '../../package/icons/FullscreenIcon';
import ColorLensIcon from '../../package/icons/ColorLensIcon';
import ViewAgendaIcon from '../../package/icons/ViewAgendaIcon';
import LayersIcon from '../../package/icons/LayersIcon';
import Dialog from '../../package/Dialog';

import Buttons from './Buttons';
import Palette from './Palette';
import Lists from './Lists';
import Icons from './Icons';
import ProgressBars from './ProgressBars';
import Cards from './Cards';
import Layers from './Layers';
import ColorWheel from './ColorWheel';
import Typography from './Typography';
import TextFields from './TextFields';
import Menus from './Menus';
import SelectFields from './SelectFields';
import Toggles from './Toggles';
import Dialogs from './Dialogs';
import Pickers from './Pickers';
import Tabs from './Tabs';
import Steppers from './Steppers';
import DataTables from './DataTables';
import GridLists from './GridLists';

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
      case 'buttons'      :   return <Buttons />;
      case 'palette'      :   return <Palette />;
      case 'lists'        :   return <Lists />;
      case 'icons'        :   return <Icons />;
      case 'progress'     :   return <ProgressBars />;
      case 'cards'        :   return <Cards />;
      case 'layers'       :   return <Layers />;
      case 'typography'   :   return <Typography />;
      case 'textfields'   :   return <TextFields />;
      case 'selecfields'  :   return <SelectFields />;
      case 'toggles'      :   return <Toggles />;
      case 'menus'        :   return <Menus />;
      case 'dialogs'      :   return <Dialogs />;
      case 'pickers'      :   return <Pickers />;
      case 'tabs'         :   return <Tabs />;
      case 'steppers'     :   return <Steppers />;
      case 'tables'       :   return <DataTables />;
      case 'gridlists'    :   return <GridLists />;
    }
  }

  onPickPrimary = (name) => {
    UI.theme.primaryPalette = name;
    this.forceUpdate();
  }

  onPickAccent = (name, hue) => {
    UI.theme.accentPalette = name;
    UI.theme.accentHue = hue;
    this.forceUpdate();
  }

  openThemePicker = () => {
    this.setState({showWheel: true});
  }

  closeThemePicker = () => {
    console.log('closing');
    this.setState({showWheel: false});
  }



  render(){
    let modal;
    if( this.state.showWheel ){
      modal = <Dialog id="color-wheel" onClickOutside={this.closeThemePicker}>
        <Text headline>Color Picker</Text>
        <ColorWheel
          onPickPrimary={this.onPickPrimary}
          onPickAccent={this.onPickAccent}
        />
        <View row align="right">
          <Button outline accent label="continue" onClick={this.closeThemePicker} />
        </View>
      </Dialog>;
    }
    return (
      <View ref="main" modal={modal} row scale={this.state.scale}>
        {modal}
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
            <Button icon={<TextFormatIcon/>} align="left" label="Text Fields" onClick={this.open('textfields')}/>
            <Button icon={<AccessTimeIcon/>} align="left" label="Pickers" onClick={this.open('pickers')}/>
            <Button icon={<MoreVertIcon/>} align="left" label="Select Fields" onClick={this.open('selecfields')}/>
            <Button icon={<MoreVertIcon/>} align="left" label="Toggle Fields" onClick={this.open('toggles')}/>
            <Button icon={<MoreVertIcon/>} align="left" label="Menus" onClick={this.open('menus')}/>
            <Button icon={<MoreVertIcon/>} align="left" label="Dialogs" onClick={this.open('dialogs')}/>
            <Button icon={<MoreVertIcon/>} align="left" label="Tabs" onClick={this.open('tabs')}/>
            <Button icon={<MoreVertIcon/>} align="left" label="Steppers" onClick={this.open('steppers')}/>
            <Button icon={<MoreVertIcon/>} align="left" label="Data Tables" onClick={this.open('tables')}/>
            <Button icon={<MoreVertIcon/>} align="left" label="Grid Lists" onClick={this.open('gridlists')}/>
          </View>
        </Drawer>
        <View onClickCapture={this.clickBody.bind(this)}>
          <Toolbar primary={'600'}>
            <Button onClick={this.toggleMenu.bind(this)} icon={<MenuIcon/>} />
            <View>KUI</View>
            <Button onClick={this.scaleUp.bind(this)} icon={<ZoomInIcon/>} tip="Scale up"/>
            <Button onClick={this.scaleDown.bind(this)} icon={<ZoomOutIcon/>} tip="Scale down"/>
            <Button onClick={this.openThemePicker} icon={<FormatPaintIcon/>} tip="Pick theme"/>
            <Button onClick={this.toggleThemeMode.bind(this)} icon={<InvertColorsIcon/>}  tip="Switch mode"/>
            <Button onClick={this.toggleFullscreen.bind(this)} icon={<FullscreenIcon/>} tip="Fullscreen" />
          </Toolbar>
          {this.getPage()}
        </View>
      </View>
    );
  }
}

UI.render(<App/>, document.getElementById('app'));
