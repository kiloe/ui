import React from 'react';
import View from '../../package/View';
import ListView from '../../package/ListView';
import ListItemView from '../../package/ListItemView';
import DividerView from '../../package/DividerView';
import AvatarView from '../../package/AvatarView';
import TextView from '../../package/TextView';
import ButtonView from '../../package/ButtonView';
import PrimaryTextView from '../../package/PrimaryTextView';
import SecondaryTextView from '../../package/SecondaryTextView';
import ChatBubbleIcon from '../../package/icons/ChatBubbleIcon';
import StarIcon from '../../package/icons/StarIcon';
import IconButtonView from '../../package/IconButtonView';


export default class ListDemo extends React.Component {

  static styles = {
    ...View.styles,
    ...ListView.styles,
    ...ListItemView.styles,
    ...AvatarView.styles,
    ...TextView.styles,
  }

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
    let Avatar1 = <AvatarView src="https://s.gravatar.com/avatar/8d0bc8ef1d4bfc4ee8ae62fe13210254?s=120" />;
    let Avatar2 = <AvatarView src="https://s.gravatar.com/avatar/20b1836f8acccd107b4992a1a45a14bd?s=120" />;

    return (
      <View>
        <View row size={5}>
          <h2>Lists Demo</h2>
        </View>
        <View row style={{ justifyContent: 'space-around' }}>

          <ListView raised style={listStyle}>
            <ListItemView left={<StarIcon accent invert/>} right={Avatar1}><PrimaryTextView lines={1}>Janet Perkins</PrimaryTextView></ListItemView>
            <ListItemView left={<View size={1.6}/>} right={Avatar2}><PrimaryTextView lines={1}>Mary Johnson</PrimaryTextView></ListItemView>
            <ListItemView left={<View size={1.6}/>} right={Avatar1}><PrimaryTextView lines={1}>Peter Carlsson</PrimaryTextView></ListItemView>
            <ListItemView left={<View size={1.6}/>} right={Avatar2}><PrimaryTextView lines={1}>Trevor Hansen</PrimaryTextView></ListItemView>
          </ListView>

          <ListView raised style={listStyle}>
            <ListItemView left={Avatar2}><PrimaryTextView lines={1}>Chris Ward</PrimaryTextView><SecondaryTextView lines={1}>He's alright, I suppose. This is a single line but the text is much longer, see? Yeah!!!!!!!!</SecondaryTextView></ListItemView>
            <ListItemView left={Avatar1}><PrimaryTextView lines={1}>Chris Ward</PrimaryTextView><SecondaryTextView lines={2}>He's alright, I suppose. This is a DOUBLE line but the text is much longer, see? Yeah!!!!!!!! What else shall I write here? What else shall I write here? What else shall I write here? What else shall I write here?</SecondaryTextView></ListItemView>
            <ListItemView left={Avatar2}><PrimaryTextView lines={1}>Chris Ward</PrimaryTextView><SecondaryTextView lines={3}>He's alright, I suppose. This is a TRIPLE line but the text is much longer, see? Yeah!!!!!!!! What else shall I write here? What else shall I write here? What else shall I write here? What else shall I write here?</SecondaryTextView></ListItemView>
            <ListItemView left={Avatar1} right={<ChatBubbleIcon/>}><PrimaryTextView>Chris Farmiloe</PrimaryTextView><SecondaryTextView>Who? This should wrap over to as many lines as it needs. How about this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this?</SecondaryTextView></ListItemView>
            <DividerView style={div} />
            <ListItemView left={Avatar2}><PrimaryTextView>Chris Ward</PrimaryTextView></ListItemView>
            <ListItemView left={Avatar1}><PrimaryTextView>Chris Farmiloe</PrimaryTextView></ListItemView>
            <DividerView style={div} />
            <ListItemView left={Avatar2}><PrimaryTextView>Chris Ward</PrimaryTextView></ListItemView>
            <ListItemView left={Avatar1}><PrimaryTextView>Chris Farmiloe</PrimaryTextView></ListItemView>
          </ListView>

          <ListView raised style={listStyle}>
            <ListItemView><SecondaryTextView style={{ fontWeight: 'bold' }}>Recent chat</SecondaryTextView></ListItemView>
            <ListItemView left={Avatar1} right={<IconButtonView accent icon={<ChatBubbleIcon/>} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><PrimaryTextView lines={1}>Janet Perkins</PrimaryTextView></ListItemView>
            <ListItemView left={Avatar2} right={<ButtonView icon={<ChatBubbleIcon/>} onClick={this.secondaryClick.bind(this)}/>} onClick={this.primaryClick.bind(this)}><PrimaryTextView lines={1}>Janet Perkins</PrimaryTextView></ListItemView>
            <ListItemView left={<View size={1.6}/>} right={<ChatBubbleIcon accent invert/>}><PrimaryTextView lines={1}>Mary Johnson</PrimaryTextView></ListItemView>
            <ListItemView left={<View size={1.6}/>} right={<ChatBubbleIcon disabled/>}><PrimaryTextView lines={1}>Peter Carlsson</PrimaryTextView></ListItemView>
            <ListItemView left={<View size={1.6}/>} right={<ChatBubbleIcon disabled/>}><PrimaryTextView lines={1}>Trevor Hansen</PrimaryTextView></ListItemView>
            <DividerView/>
            <ListItemView><SecondaryTextView style={{ fontWeight: 'bold' }}>Previous chats</SecondaryTextView></ListItemView>
            <ListItemView left={Avatar1}><PrimaryTextView lines={1}>Janet Perkins</PrimaryTextView></ListItemView>
            <ListItemView left={<View size={1.6}/>} left={Avatar2}><PrimaryTextView lines={1}>Mary Johnson</PrimaryTextView></ListItemView>
            <ListItemView left={<View size={1.6}/>} left={Avatar1}><PrimaryTextView lines={1}>Peter Carlsson</PrimaryTextView></ListItemView>
            <ListItemView left={<View size={1.6}/>} left={Avatar2}><PrimaryTextView lines={1}>Trevor Hansen</PrimaryTextView></ListItemView>
          </ListView>

        </View>
        <View row size={5}>
        </View>
      </View>
    );
  }
}

