import React from 'react';
import Doc from './Doc';
import View from '../../package/View';


export default class MenusDemo extends React.Component {

  render(){
    let data = [
      {
        title: 'Menu',
        src: Doc.jsx`
          <Menu>
            <MenuItem label="Refresh" />
            <MenuItem label="Help & feedback" />
            <MenuItem label="Settings" disabled />
            <MenuItem label="Sign out" />
          </Menu>
        `,
        info:`
          A menu is a temporary piece of material emitted from a button, an action, a pointer, or another control that contains at least two menu items.

          Each menu item is a discrete option or action that can affect the app, the view, or selected elements within a view.

          Menus should not be used as a primary method for navigation within an app.
        `
      },
      {
        title: 'Popup Menus',
        src: Doc.jsx`
          <Button icon={MenuIcon} menu={
            <Menu>
              <MenuItem label="Add Attachment" />
              <MenuItem label="Forward" />
              <MenuItem label="Delete" />
              <Divider />
              <MenuItem label="Delete" />
            </Menu>
          } />
        `,
        info:`
          Menus are positioned over their emitting elements such that the currently selected menu item appears on top of the emitting element.
        `
      },
      {
        title: 'Menu with enabled/disabled states',
        src: Doc.jsx`
          <Menu>
            <MenuItem label="Print layout" checked={true} />
            <Divider />
            <MenuItem label="Show ruler" checked={false} />
            <MenuItem label="Show equation toolbar" checked={false} />
            <MenuItem label="Show spelling suggestions" checked={true} />
            <Divider />
            <MenuItem label="Compact controls" />
            <MenuItem label="Full screen" />
          </Menu>
        `,
        info:`
          Menus display a consistent set of menu items, each of which may be enabled or disabled based on the current state of the application.
        `
      },
      {
        title: 'Menu with icons',
        src: Doc.jsx`
          <Menu>
            <MenuItem label="Preview" icon={RemoveRedEyeIcon} />
            <MenuItem label="Share" icon={ShareIcon} />
            <MenuItem label="Get link" icon={LinkIcon} />
            <Divider />
            <MenuItem label="Make a copy" icon={ContentCopyIcon} />
            <MenuItem label="Download" icon={FileDownloadIcon} />
            <Divider />
            <MenuItem label="Remove" icon={DeleteIcon} />
          </Menu>
        `,
        info:`
          Menus can have icons.
        `
      },
      {
        title: 'Scrolling Menus',
        src: Doc.jsx`
          <View size={10}>
          <Menu>
            <MenuItem label="Thing" />
            <MenuItem label="Thing" />
            <MenuItem label="Thing" />
            <MenuItem label="Thing" />
            <MenuItem label="Thing" />
            <MenuItem label="Thing" />
            <MenuItem label="Thing" />
            <MenuItem label="Thing" />
            <MenuItem label="Thing" />
            <MenuItem label="Thing" />
            <MenuItem label="Thing" />
            <MenuItem label="Thing" />
            <MenuItem label="Thing" />
            <MenuItem label="Thing" />
            <MenuItem label="Thing" />
            <MenuItem label="Thing" />
            <MenuItem label="Thing" />
            <MenuItem label="Thing" />
            <MenuItem label="Thing" />
          </Menu>
          </View>
        `,
        info:`
          Menus can get so big they need to scroll.
        `
      },
      {
        title: 'Cascading menus',
        src: Doc.jsx`
          <Menu>
            <MenuItem label="Bold" tip="Ctrl+B" />
            <MenuItem label="Italic" tip="Ctrl+B" />
            <MenuItem label="Underline" tip="Ctrl+B" />
            <Divider />
            <MenuItem label="Paragraph styles">
              <MenuItem label="Align left" />
              <MenuItem label="Align center" />
              <MenuItem label="Align right" />
            </MenuItem>
            <MenuItem label="Line spacing">
              <MenuItem label="Single" checked={false} />
              <MenuItem label="Double" checked={false} />
              <MenuItem label="Custom 1.2" checked={true}>
                <MenuItem label="Linespacing" tip="1.2" />
                <MenuItem label="Paragraph spacing before" tip="1.2" />
                <MenuItem label="Paragraph spacing after" tip="1.5" />
              </MenuItem>
              <Divider />
              <MenuItem label="Add space before paragraph" />
              <MenuItem label="Add space after paragraph" />
            </MenuItem>
          </Menu>
        `,
        info:`
          MenuItems can be nested to create cascading menus
        `
      },
    ];
    return (
      <View scroll>
        <View>
          {data.map((x,i) => <Doc key={i} title={x.title} src={x.src}>{x.info}</Doc>)}
        </View>
      </View>
    );
  }

}

