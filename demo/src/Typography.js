import React from 'react';
import Doc from './Doc';
import View from '../../package/View';
import Headline from '../../package/Headline';

export default class Typography extends React.Component {

  render(){
    let data = [
      {
        src: Doc.jsx`
          <Display>Display</Display>
        `,
        info: `Display is for really big banners and text overlays and things like that, you'll only ever have one of these visible`
      },
      {
        src: Doc.jsx`
          <Headline>Headline</Headline>
        `,
        info: `Headline's are for 'page' or 'section' level titles you'll usually only have one or two visible at a time`
      },
      {
        src: Doc.jsx`
          <Title>Title</Title>
        `,
        info: `Title's are used for headings in lists/sections/cards all over the place.`
      },
      {
        src: Doc.jsx`
          <Subheading>Subheading</Subheading>
        `,
        info: `Subheadings are usually used when Title isn't enough`
      }
    ];
    return (
      <View>
        <Headline>Typography</Headline>
        <View>{data.map((x,i) => <Doc key={i} src={x.src}>{x.info}</Doc>)}</View>;
      </View>
    );
  }

}
