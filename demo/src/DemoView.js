import React from 'react';
import View from '../../src/View';
import DrawerView from '../../src/DrawerView';
import ToolbarView from '../../src/ToolbarView';
import ButtonView from '../../src/ButtonView';
import IconView from '../../src/IconView';
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
import viewport from '../../src/utils/viewport';

import ButtonsDemoView from './ButtonsDemoView';
import PaletteDemoView from './PaletteDemoView';
import ListDemoView from './ListDemoView';
import IconDemo from './IconDemo';

export default class DemoView extends React.Component {

  static styles = {
    ...View.styles,
    ...DrawerView.styles,
    ...ToolbarView.styles,
    ...Menu.styles,
    ...MenuItemView.styles,
    ...ButtonView.styles,
    ...IconView.styles,
    ...PaletteDemoView.styles,
    ...ListDemoView.styles,
    ...ButtonsDemoView.styles,
  }

  constructor(...args){
    super(...args);
    this.state = {};
  }

  static propTypes = {
    app: React.PropTypes.object.isRequired,
    sidebar: React.PropTypes.bool
  }

  onToggleMenu(){
    if( viewport.width.huge ){
      this.props.app.toggleSidebar();
    }else{
      if( this.props.sidebarHidden ){
        this.props.app.toggleSidebar();
      }
      this.props.app.toggleDrawer();
    }
  }

  onToggleFullscreen(){
    viewport.toggleFullscreen();
  }

  onClickBody(){
    this.props.app.closeDrawer();
  }

  onDiscoMode(){
    this.props.app.enableDiscoMode();
  }

  onThemeMode(){
    this.props.app.toggleThemeMode();
  }


  openPage(page){
    console.log('Opening page:', page);
    this.setState({page:page});
    this.onToggleMenu();
  }


  render(){

    let cloudMenu = <Menu>
      <ButtonView align="left" icon={<AddCircleIcon/>} label="Open" />
      <ButtonView align="left" icon={<AddCircleIcon/>} label="Save file as..." />
      <ButtonView align="left" icon={<AddCircleIcon/>} label="Quit now" />
    </Menu>;

    let page = '';
    switch ( this.state.page ){
      case 'buttons':
        page = <ButtonsDemoView />;
        break;
      case 'palette':
        page = <PaletteDemoView />;
        break;
      case 'lists':
        page = <ListDemoView />;
        break;
      case 'icons':
        page = <IconDemo />;
        break;
      case undefined:
        page = <ListDemoView />;
        break;

    }



    return (
      <View row>
        <DrawerView docked="huge" raised={3} hide={this.props.sidebarHidden} active={this.props.sidebarActive}>
          <ToolbarView primary={'300'} scale={1.5}>
            <View>Demo-crazy</View>
            <ButtonView icon={<ArrowBackIcon/>} align="left" onClick={this.onToggleMenu.bind(this)}/>
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
        <View onClickCapture={this.onClickBody.bind(this)}>
          <ToolbarView primary={'100'} scale={1.5}>
            <ButtonView onClick={this.onToggleMenu.bind(this)} icon={<MenuIcon/>} />
            <View>Title</View>
            <ButtonView onClick={this.onDiscoMode.bind(this)} icon={<FormatPaintIcon/>} label="Disco" />
            <ButtonView onClick={this.onThemeMode.bind(this)} icon={<InvertColorsIcon/>} label="Theme" />
            <ButtonView menu={cloudMenu} icon={<CloudIcon/>} label="Cloud" />
            <ButtonView menu={cloudMenu} icon={<NotificationsActiveIcon/>} label="alerts" />
            <ButtonView onClick={this.onToggleFullscreen.bind(this)} icon={<FullscreenIcon/>} />
          </ToolbarView>

          {page}

        </View>
      </View>
    );
  }
}

