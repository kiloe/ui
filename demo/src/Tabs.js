import React from 'react';
import Doc from './Doc';
import View from '../../package/View';


export default class Tabs extends React.Component {


  render(){
    let data = [
      {
        title: 'Tabs',
        state: {selected: 0},
        src: Doc.jsx`
          <Tabs selected={this.state.selected} onSelected={(idx) => this.setState({selected: idx})}>
            <Tab label="item1" />
            <Tab label="a longer item 2 thing" />
            <Tab label="item3" />
          </Tabs>
        `,
        info:`
          Tabs are stateless, use the onSelected callback to control the selected tab
        `
      },
      {
        title: 'Icon Tabs',
        state: {selected: 0},
        src: Doc.jsx`
          <Tabs selected={this.state.selected} onSelected={(idx) => this.setState({selected: idx})}>
            <Tab icon={WhatshotIcon} />
            <Tab icon={ThumbUpIcon} />
            <Tab icon={MessageIcon} />
            <Tab icon={StarsIcon} />
            <Tab icon={SmsIcon} />
          </Tabs>
        `,
        info:`
          Tabs can be icons
        `
      },
      {
        title: 'Dropdowns in Tabs',
        state: {selected: 0},
        src: Doc.jsx`
          <Tabs selected={this.state.selected} onSelected={(idx) => this.setState({selected: idx})}>
            <Tab label="Hot" />
            <Tab label="Messages" />
            <Tab label="Favorites" />
            <Tab label="More">
              <MenuItem label="Another Thing" />
              <MenuItem label="Another Thing" />
              <MenuItem label="Another Thing" />
            </Tab>
          </Tabs>
        `,
        info:`
          Tabs can be dropdowns by using MenuItems
        `
      },
      {
        title: 'Columular Tabs',
        state: {selected: 0},
        src: Doc.jsx`
          <Tabs row={false} selected={this.state.selected} onSelected={(idx) => this.setState({selected: idx})}>
            <Tab label="item1" />
            <Tab label="a longer item 2 thing" />
            <Tab label="item3" />
          </Tabs>
        `,
        info:`
          Columnular Tabs don't exist in the Google Spec, but they are possible/useful so might as well make them work
        `
      },
    ];
    return (
      <View scroll>
        <View>
          {data.map((props,i) => <Doc key={i} {...props} />)}
        </View>
      </View>
    );
  }


}

