import React from 'react';
import View from '../../package/View';
import List from '../../package/List';
import ListItem from '../../package/ListItem';
import Divider from '../../package/Divider';
import Avatar from '../../package/Avatar';
import Button from '../../package/Button';
import PrimaryText from '../../package/PrimaryText';
import SecondaryText from '../../package/SecondaryText';
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
    let listStyle = { margin: '0 20px' };
    let Avatar1 = <Avatar src="https://s.gravatar.com/avatar/8d0bc8ef1d4bfc4ee8ae62fe13210254?s=120" />;
    let Avatar2 = <Avatar src="https://s.gravatar.com/avatar/20b1836f8acccd107b4992a1a45a14bd?s=120" />;

    return (
      <View>
        <View row size={5}>
          <h2>Lists Demo</h2>
        </View>
        <View row style={{ justifyContent: 'space-around' }}>

          <List raised style={listStyle}>
            <ListItem left={<StarIcon accent invert size={1.6} />} right={Avatar1}><PrimaryText lines={1}>Janet Perkins</PrimaryText></ListItem>
            <ListItem left={<View size={1.6}/>} right={Avatar2}><PrimaryText lines={1}>Mary Johnson</PrimaryText></ListItem>
            <ListItem left={<View size={1.6}/>} right={Avatar1}><PrimaryText lines={1}>Peter Carlsson</PrimaryText></ListItem>
            <ListItem left={<View size={1.6}/>} right={Avatar2}><PrimaryText lines={1}>Trevor Hansen</PrimaryText></ListItem>
          </List>

          <List raised style={listStyle}>
            <ListItem left={Avatar2}><PrimaryText lines={1}>Chris Ward</PrimaryText><SecondaryText lines={1}>He's alright, I suppose. This is a single line but the text is much longer, see? Yeah!!!!!!!!</SecondaryText></ListItem>
            <ListItem left={Avatar1}><PrimaryText lines={1}>Chris Ward</PrimaryText><SecondaryText lines={2}>He's alright, I suppose. This is a DOUBLE line but the text is much longer, see? Yeah!!!!!!!! What else shall I write here? What else shall I write here? What else shall I write here? What else shall I write here?</SecondaryText></ListItem>
            <ListItem left={Avatar2}><PrimaryText lines={1}>Chris Ward</PrimaryText><SecondaryText lines={3}>He's alright, I suppose. This is a TRIPLE line but the text is much longer, see? Yeah!!!!!!!! What else shall I write here? What else shall I write here? What else shall I write here? What else shall I write here?</SecondaryText></ListItem>
            <ListItem left={Avatar1} right={<Button transparent icon={ChatBubbleIcon}/>}><PrimaryText>Chris Farmiloe</PrimaryText><SecondaryText>Who? This should wrap over to as many lines as it needs. How about this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this?</SecondaryText></ListItem>
            <Divider style={div} />
            <ListItem left={Avatar2}><PrimaryText>Chris Ward</PrimaryText></ListItem>
            <ListItem left={Avatar1}><PrimaryText>Chris Farmiloe</PrimaryText></ListItem>
            <Divider style={div} />
            <ListItem left={Avatar2}><PrimaryText>Chris Ward</PrimaryText></ListItem>
            <ListItem left={Avatar1}><PrimaryText>Chris Farmiloe</PrimaryText></ListItem>
          </List>

          <List raised style={listStyle}>
            <ListItem><SecondaryText style={{ fontWeight: 'bold' }}>Recent chat</SecondaryText></ListItem>
            <ListItem left={Avatar1} right={<Button accent transparent icon={<ChatBubbleIcon/>} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><PrimaryText lines={1}>Janet Perkins</PrimaryText></ListItem>
            <ListItem left={Avatar2} right={<Button accent transparent disabled icon={<ChatBubbleIcon/>} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><PrimaryText lines={1}>Mary Johnson</PrimaryText></ListItem>
            <ListItem left={<View size={2.5}/>} right={<Button accent transparent icon={ChatBubbleIcon} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><PrimaryText lines={1}>Jeff Jefferson</PrimaryText></ListItem>
            <ListItem left={<View size={2.5}/>} right={<Button accent transparent icon={ChatBubbleIcon} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><PrimaryText lines={1}>Jeff Jefferson</PrimaryText></ListItem>
            <ListItem left={<View size={2.5}/>} right={<Button accent transparent disabled icon={ChatBubbleIcon} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><PrimaryText lines={1}>Jeff Jefferson</PrimaryText></ListItem>
            <ListItem left={<View size={2.5}/>} right={<Button accent transparent disabled icon={ChatBubbleIcon} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><PrimaryText lines={1}>Jeff Jefferson</PrimaryText></ListItem>
            <Divider/>
            <ListItem><SecondaryText style={{ fontWeight: 'bold' }}>Previous chats</SecondaryText></ListItem>
            <ListItem left={Avatar1}><PrimaryText lines={1}>Janet Perkins</PrimaryText></ListItem>
            <ListItem left={<View size={1.6}/>} left={Avatar2}><PrimaryText lines={1}>Mary Johnson</PrimaryText></ListItem>
            <ListItem left={<View size={1.6}/>} left={Avatar1}><PrimaryText lines={1}>Peter Carlsson</PrimaryText></ListItem>
            <ListItem left={<View size={1.6}/>} left={Avatar2}><PrimaryText lines={1}>Trevor Hansen</PrimaryText></ListItem>
          </List>

        </View>
        <View row size={5}>
        </View>
      </View>
    );
  }
}

