import React from 'react';
import View from '../../package/View';
import List from '../../package/List';
import ListItem from '../../package/ListItem';
import Divider from '../../package/Divider';
import Avatar from '../../package/Avatar';
import Button from '../../package/Button';
import Title from '../../package/Title';
import Summary from '../../package/Summary';
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
            <ListItem left={<StarIcon accent size={1.6} />} right={Avatar1}><Title lines={1}>Janet Perkins</Title></ListItem>
            <ListItem left={1.6} right={Avatar2}><Title lines={1}>Mary Johnson</Title></ListItem>
            <ListItem left={1.6} right={Avatar1}><Title lines={1}>Peter Carlsson</Title></ListItem>
            <ListItem left={1.6} right={Avatar2}><Title lines={1}>Trevor Hansen</Title></ListItem>
          </List>

          <List raised style={listStyle}>
            <ListItem left={Avatar2}>
              <Title lines={1}>Chris Ward</Title>
              <Summary lines={1}>He's alright, I suppose. This is a single line but the text is much longer, see? Yeah!!!!!!!!</Summary>
            </ListItem>
            <ListItem left={Avatar1}>
              <Title lines={1}>Chris Ward</Title>
              <Summary lines={2}>He's alright, I suppose. This is a DOUBLE line but the text is much longer, see? Yeah!!!!!!!! What else shall I write here? What else shall I write here? What else shall I write here? What else shall I write here?</Summary>
            </ListItem>
            <ListItem left={Avatar2}>
              <Title lines={1}>Chris Ward</Title>
              <Summary lines={3}>He's alright, I suppose. This is a TRIPLE line but the text is much longer, see? Yeah!!!!!!!! What else shall I write here? What else shall I write here? What else shall I write here? What else shall I write here?</Summary>
            </ListItem>
            <ListItem left={Avatar1} right={<Button subtle icon={ChatBubbleIcon}/>}>
              <Title>Chris Farmiloe</Title>
              <Summary>Who? This should wrap over to as many lines as it needs. How about this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this?</Summary>
            </ListItem>
            <ListItem left={Avatar2} right={<Button subtle icon={ChatBubbleIcon}/>}>
              <Title lines={1}>Chris Ward</Title>
              <Summary lines={1}>He's alright, I suppose. This is a TRIPLE line but the text is much longer, see? Yeah!!!!!!!! What else shall I write here? What else shall I write here? What else shall I write here? What else shall I write here?</Summary>
            </ListItem>
            <ListItem left={Avatar1} right={<Button subtle icon={ChatBubbleIcon}/>}>
              <Title>Chris Farmiloe</Title>
              <Summary>Who? This should wrap over to as many lines as it needs. How about this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this?</Summary>
            </ListItem>
            <Divider style={div} />
            <ListItem left={Avatar2}>
              <Title>Chris Ward</Title>
            </ListItem>
            <ListItem left={Avatar1}>
              <Title>Chris Farmiloe</Title>
            </ListItem>
            <Divider style={div} />
            <ListItem left={Avatar2}>
              <Title>Chris Ward</Title>
            </ListItem>
            <ListItem left={Avatar1}>
              <Title>Chris Farmiloe</Title>
            </ListItem>
          </List>

          <List raised style={listStyle}>
            <ListItem><Summary style={{ fontWeight: 'bold' }}>Recent chat</Summary></ListItem>
            <ListItem left={Avatar1} right={<Button accent subtle icon={<ChatBubbleIcon/>} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><Title lines={1}>Janet Perkins</Title></ListItem>
            <ListItem left={Avatar2} right={<Button accent subtle disabled icon={<ChatBubbleIcon/>} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><Title lines={1}>Mary Johnson</Title></ListItem>
            <ListItem left={Avatar1} right={<Button accent subtle icon={ChatBubbleIcon} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><Title lines={1}>Jeff Jefferson</Title></ListItem>
            <ListItem left={3.5} right={<Button accent subtle icon={ChatBubbleIcon} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><Title lines={1}>Jeff Jefferson</Title></ListItem>
            <ListItem left={3.5} right={<Button accent subtle disabled icon={ChatBubbleIcon} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><Title lines={1}>Jeff Jefferson</Title></ListItem>
            <ListItem left={3.5} right={<Button accent subtle disabled icon={ChatBubbleIcon} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><Title lines={1}>Jeff Jefferson</Title></ListItem>
            <Divider/>
            <ListItem><Summary style={{ fontWeight: 'bold' }}>Previous chats</Summary></ListItem>
            <ListItem left={Avatar1}><Title lines={1}>Janet Perkins</Title></ListItem>
            <ListItem left={3.5} left={Avatar2}><Title lines={1}>Mary Johnson</Title></ListItem>
            <ListItem left={1.6} left={Avatar1}><Title lines={1}>Peter Carlsson</Title></ListItem>
            <ListItem left={1.6} left={Avatar2}><Title lines={1}>Trevor Hansen</Title></ListItem>
          </List>

        </View>
        <View row size={5}>
        </View>
      </View>
    );
  }
}

