import React from 'react';
import View from '../../package/View';
import List from '../../package/List';
import ListItem from '../../package/ListItem';
import Divider from '../../package/Divider';
import Avatar from '../../package/Avatar';
import Button from '../../package/Button';
import Text from '../../package/Text';
import ChatBubbleIcon from '../../package/icons/ChatBubbleIcon';
import StarIcon from '../../package/icons/StarIcon';


export default class ListDemo extends React.Component {

  primaryClick(e) {
    e.stopPropagation();
    console.log('primary click');
  }
  secondaryClick(e) {
    e.stopPropagation();
    console.log('secondary click');
  }

  render(){

   // let list = { raised: true, style:{padding:10, justifyContent:'space-between'} };
    let div = { marginLeft: '72px' };
    let listStyle = { margin: '0 20px'};
    let Avatar1 = <Avatar src="https://s.gravatar.com/avatar/8d0bc8ef1d4bfc4ee8ae62fe13210254?s=120" />;
    let Avatar2 = <Avatar src="https://s.gravatar.com/avatar/20b1836f8acccd107b4992a1a45a14bd?s=120" />;

    return (
      <View>
        <View row size={5}>
          <h2>Lists Demo</h2>
        </View>
        <View row style={{ justifyContent: 'space-around' }}>

          <List raised style={listStyle}>
            <ListItem left={<StarIcon accent size={1.6} />} right={Avatar1}><Text subheading lines={1}>Janet Perkins</Text></ListItem>
            <ListItem left={1.6} right={Avatar2}><Text title lines={1}>Mary Johnson</Text></ListItem>
            <ListItem left={1.6} right={Avatar1}><Text title lines={1}>Peter Carlsson</Text></ListItem>
            <ListItem left={1.6} right={Avatar2}><Text title lines={1}>Trevor Hansen</Text></ListItem>
          </List>

          <List raised style={listStyle}>
            <ListItem left={Avatar2}>
              <Text title lines={1} tip="Look at me, I'm Chris Ward">Chris Ward</Text>
              <Text lines={1}>He's alright, I suppose. This is a single line but the text is much longer, see? Yeah!!!!!!!!</Text>
            </ListItem>
            <ListItem left={Avatar1}>
              <Text title lines={1}>Chris Ward</Text>
              <Text lines={2}>He's alright, I suppose. This is a DOUBLE line but the text is much longer, see? Yeah!!!!!!!! What else shall I write here? What else shall I write here? What else shall I write here? What else shall I write here?</Text>
            </ListItem>
            <ListItem left={Avatar2}>
              <Text title lines={1}>Chris Ward</Text>
              <Text lines={3}>He's alright, I suppose. This is a TRIPLE line but the text is much longer, see? Yeah!!!!!!!! What else shall I write here? What else shall I write here? What else shall I write here? What else shall I write here?</Text>
            </ListItem>
            <ListItem left={Avatar1} right={<Button subtle icon={ChatBubbleIcon}/>}>
              <Text title>Chris Farmiloe</Text>
              <Text>Who? This should wrap over to as many lines as it needs. How about this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this?</Text>
            </ListItem>
            <ListItem left={Avatar2} right={<Button subtle icon={ChatBubbleIcon}/>}>
              <Text title lines={1}>Chris Ward</Text>
              <Text lines={1}>He's alright, I suppose. This is a TRIPLE line but the text is much longer, see? Yeah!!!!!!!! What else shall I write here? What else shall I write here? What else shall I write here? What else shall I write here?</Text>
            </ListItem>
            <ListItem left={Avatar1} right={<Button subtle icon={ChatBubbleIcon}/>}>
              <Text title>Chris Farmiloe</Text>
              <Text>Who? This should wrap over to as many lines as it needs. How about this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this?</Text>
            </ListItem>
            <Divider style={div} />
            <ListItem left={Avatar2}>
              <Text title>Chris Ward</Text>
            </ListItem>
            <ListItem left={Avatar1}>
              <Text title>Chris Farmiloe</Text>
            </ListItem>
            <Divider style={div} />
            <ListItem left={Avatar2}>
              <Text title>Chris Ward</Text>
            </ListItem>
            <ListItem left={Avatar1}>
              <Text title>Chris Farmiloe</Text>
            </ListItem>
          </List>

          <List raised style={listStyle}>
            <ListItem><Text style={{ fontWeight: 'bold' }}>Recent chat</Text></ListItem>
            <ListItem left={Avatar1} right={<Button accent subtle icon={<ChatBubbleIcon/>} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><Text title lines={1}>Janet Perkins</Text></ListItem>
            <ListItem left={Avatar2} right={<Button accent subtle disabled icon={<ChatBubbleIcon/>} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><Text title lines={1}>Mary Johnson</Text></ListItem>
            <ListItem left={Avatar1} right={<Button accent subtle icon={ChatBubbleIcon} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><Text title lines={1}>Jeff Jefferson</Text></ListItem>
            <ListItem left={3.5} right={<Button accent subtle icon={ChatBubbleIcon} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><Text title lines={1}>Jeff Jefferson</Text></ListItem>
            <ListItem left={3.5} right={<Button accent subtle disabled icon={ChatBubbleIcon} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><Text title lines={1}>Jeff Jefferson</Text></ListItem>
            <ListItem left={3.5} right={<Button accent subtle disabled icon={ChatBubbleIcon} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><Text title lines={1}>Jeff Jefferson</Text></ListItem>
            <Divider/>
            <ListItem><Text style={{ fontWeight: 'bold' }}>Previous chats</Text></ListItem>
            <ListItem left={Avatar1}><Text title lines={1}>Janet Perkins</Text></ListItem>
            <ListItem left={3.5} left={Avatar2}><Text title lines={1}>Mary Johnson</Text></ListItem>
            <ListItem left={1.6} left={Avatar1}><Text title lines={1}>Peter Carlsson</Text></ListItem>
            <ListItem left={1.6} left={Avatar2}><Text title lines={1}>Trevor Hansen</Text></ListItem>
          </List>

        </View>
        <View row size={5}>
        </View>
      </View>
    );
  }
}

