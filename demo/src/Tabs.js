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

