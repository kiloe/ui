import React from 'react';
import Doc from './Doc';
import View from '../../package/View';


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

    let div = { marginLeft: '72px' };
    let listStyle = { margin: '0 20px'};

    let data = [
      {
        title: 'Basic List',
        src: Doc.jsx`
          <List raised style={${listStyle}}>
            <ListItem left={<StarIcon accent size={1.6} />} right={<Avatar src="https://s.gravatar.com/avatar/8d0bc8ef1d4bfc4ee8ae62fe13210254?s=120" />}><Title lines={1}>Janet Perkins</Title></ListItem>
            <ListItem left={1.6} right={<Avatar src="https://s.gravatar.com/avatar/20b1836f8acccd107b4992a1a45a14bd?s=120" />}><Title lines={1}>Mary Johnson</Title></ListItem>
            <ListItem left={1.6} right={<Avatar src="https://s.gravatar.com/avatar/8d0bc8ef1d4bfc4ee8ae62fe13210254?s=120" />}><Title lines={1}>Peter Carlsson</Title></ListItem>
            <ListItem left={1.6} right={<Avatar src="https://s.gravatar.com/avatar/20b1836f8acccd107b4992a1a45a14bd?s=120" />}><Title lines={1}>Trevor Hansen</Title></ListItem>
          </List>
        `,
        info:`
        `
      },
      {
        title: 'Scroll List',
        src: Doc.jsx`

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

          <List raised style={${listStyle}}>
            <ListItem left={<Avatar src="https://s.gravatar.com/avatar/20b1836f8acccd107b4992a1a45a14bd?s=120" />}>
              <Title lines={1} tip="Look at me, I'm Chris Ward">Chris Ward</Title>
              <Summary lines={1}>He's alright, I suppose. This is a single line but the text is much longer, see? Yeah!!!!!!!!</Summary>
            </ListItem>
            <ListItem left={<Avatar src="https://s.gravatar.com/avatar/8d0bc8ef1d4bfc4ee8ae62fe13210254?s=120" />}>
              <Title lines={1}>Chris Ward</Title>
              <Summary lines={2}>He's alright, I suppose. This is a DOUBLE line but the text is much longer, see? Yeah!!!!!!!! What else shall I write here? What else shall I write here? What else shall I write here? What else shall I write here?</Summary>
            </ListItem>
            <ListItem left={<Avatar src="https://s.gravatar.com/avatar/20b1836f8acccd107b4992a1a45a14bd?s=120" />}>
              <Title lines={1}>Chris Ward</Title>
              <Summary lines={3}>He's alright, I suppose. This is a TRIPLE line but the text is much longer, see? Yeah!!!!!!!! What else shall I write here? What else shall I write here? What else shall I write here? What else shall I write here?</Summary>
            </ListItem>
            <ListItem left={<Avatar src="https://s.gravatar.com/avatar/8d0bc8ef1d4bfc4ee8ae62fe13210254?s=120" />} right={<Button subtle icon={ChatBubbleIcon}/>}>
              <Title>Chris Farmiloe</Title>
              <Text>Who? This should wrap over to as many lines as it needs. How about this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this?</Text>
            </ListItem>
            <ListItem left={<Avatar src="https://s.gravatar.com/avatar/20b1836f8acccd107b4992a1a45a14bd?s=120" />} right={<Button subtle icon={ChatBubbleIcon}/>}>
              <Title lines={1}>Chris Ward</Title>
              <Summary lines={1}>He's alright, I suppose. This is a TRIPLE line but the text is much longer, see? Yeah!!!!!!!! What else shall I write here? What else shall I write here? What else shall I write here? What else shall I write here?</Summary>
            </ListItem>
            <ListItem left={<Avatar src="https://s.gravatar.com/avatar/8d0bc8ef1d4bfc4ee8ae62fe13210254?s=120" />} right={<Button subtle icon={ChatBubbleIcon}/>}>
              <Title>Chris Farmiloe</Title>
              <Summary>Who? This should wrap over to as many lines as it needs. How about this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this? And this?</Summary>
            </ListItem>
            <Divider style={${div}} />
            <ListItem left={<Avatar src="https://s.gravatar.com/avatar/20b1836f8acccd107b4992a1a45a14bd?s=120" />}>
              <Title>Chris Ward</Title>
            </ListItem>
            <ListItem left={<Avatar src="https://s.gravatar.com/avatar/8d0bc8ef1d4bfc4ee8ae62fe13210254?s=120" />}>
              <Title>Chris Farmiloe</Title>
            </ListItem>
            <Divider style={${div}} />
            <ListItem left={<Avatar src="https://s.gravatar.com/avatar/20b1836f8acccd107b4992a1a45a14bd?s=120" />}>
              <Title>Chris Ward</Title>
            </ListItem>
            <ListItem left={<Avatar src="https://s.gravatar.com/avatar/8d0bc8ef1d4bfc4ee8ae62fe13210254?s=120" />}>
              <Title>Chris Farmiloe</Title>
            </ListItem>
          </List>

        `,
        info:`
        `
      },
      {
        title: 'Icon List',
        src: Doc.jsx`

          <List raised style={${listStyle}}>
            <ListItem><Summary style={{ fontWeight: 'bold' }}>Recent chat</Summary></ListItem>
            <ListItem left={<Avatar src="https://s.gravatar.com/avatar/8d0bc8ef1d4bfc4ee8ae62fe13210254?s=120" />} right={<Button accent subtle icon={<ChatBubbleIcon/>} />}><Title lines={1}>Janet Perkins</Title></ListItem>
            <ListItem left={<Avatar src="https://s.gravatar.com/avatar/20b1836f8acccd107b4992a1a45a14bd?s=120" />} right={<Button accent subtle disabled icon={<ChatBubbleIcon/>} />}><Title lines={1}>Mary Johnson</Title></ListItem>
            <ListItem left={<Avatar src="https://s.gravatar.com/avatar/8d0bc8ef1d4bfc4ee8ae62fe13210254?s=120" />} right={<Button accent subtle icon={ChatBubbleIcon} />}><Title lines={1}>Jeff Jefferson</Title></ListItem>
            <ListItem left={3.5} right={<Button accent subtle icon={ChatBubbleIcon}/>}><Title lines={1}>Jeff Jefferson</Title></ListItem>
            <ListItem left={3.5} right={<Button accent subtle disabled icon={ChatBubbleIcon}/>}><Title lines={1}>Jeff Jefferson</Title></ListItem>
            <ListItem left={3.5} right={<Button accent subtle disabled icon={ChatBubbleIcon}/>}><Title lines={1}>Jeff Jefferson</Title></ListItem>
            <Divider/>
            <ListItem><Summary style={{ fontWeight: 'bold' }}>Previous chats</Summary></ListItem>
            <ListItem left={<Avatar src="https://s.gravatar.com/avatar/8d0bc8ef1d4bfc4ee8ae62fe13210254?s=120" />}><Title lines={1}>Janet Perkins</Title></ListItem>
            <ListItem left={3.5} left={<Avatar src="https://s.gravatar.com/avatar/20b1836f8acccd107b4992a1a45a14bd?s=120" />}><Title lines={1}>Mary Johnson</Title></ListItem>
            <ListItem left={1.6} left={<Avatar src="https://s.gravatar.com/avatar/8d0bc8ef1d4bfc4ee8ae62fe13210254?s=120" />}><Title lines={1}>Peter Carlsson</Title></ListItem>
            <ListItem left={1.6} left={<Avatar src="https://s.gravatar.com/avatar/20b1836f8acccd107b4992a1a45a14bd?s=120" />}><Title lines={1}>Trevor Hansen</Title></ListItem>
          </List>
        `,
        info:`
        `
      },

    ];
    return (
      <View scroll>
        <View row style={{ justifyContent: 'space-around' }}>

          {data.map((x,i) => <Doc key={i} title={x.title} src={x.src}>{x.info}</Doc>)}


        </View>
      </View>
    );
  }
}

