import React from 'react';
import Doc from './Doc';
import View from '../../package/View';
import Headline from '../../package/Headline';

export default class Typography extends React.Component {

  render(){
    let data = [
      {
        title: 'Headings',
        src: Doc.jsx`
          <View>
            <Display>Display</Display>
            <Headline>Headline</Headline>
            <Title>Title</Title>
            <Subheading>Subheading</Subheading>
          </View>
        `,
        info:`
          The heading elements are basically just scaled up Text elements.
          Title is probably what you want most of the time for things like
          Card titles, List items etc, Use Display sparingly, and Headline for
          main "page" headings.
        `
      },
      {
        title: 'Body Text',
        src: Doc.jsx`
          <Text>This is just normal body text</Text>
        `,
        info: `The Text element is for text. Too complex? Deal with it.`
      },
      {
        title: 'Colored Text',
        src: Doc.jsx`
          <View>
            <Text primary>I am a leaf on the wind. Watch how I soar</Text>
            <Text accent>I am a leaf on the wind. Watch how I soar</Text>
          </View>
        `,
        info: `Adding the primary or accent flags makes things colorful. They work on heading things too if you are so inclined`
      },
      {
        title: 'Subtle Text',
        src: Doc.jsx`
          <View>
            <Text subtle>This text is so unimportant you can barely see it</Text>
          </View>
        `,
        info: `The subtle prop tells the component you want a more muted version`
      },
      {
        title: 'Summaries',
        src: Doc.jsx`
          <View>
            <Text lines={1}>Bacon ipsum dolor amet t-bone bacon ground round, bresaola doner short loin shank beef porchetta pancetta fatback. Tongue chicken brisket strip steak, prosciutto jowl pork loin andouille salami turducken sausage. Ground round chuck bacon, porchetta ham hock jerky short loin bresaola biltong jowl sirloin shoulder pork belly turkey. Turducken sausage pancetta salami, tail rump pork chop tri-tip frankfurter ribeye kevin.</Text>
            <Summary lines={2}>Bacon ipsum dolor amet t-bone bacon ground round, bresaola doner short loin shank beef porchetta pancetta fatback. Tongue chicken brisket strip steak, prosciutto jowl pork loin andouille salami turducken sausage. Ground round chuck bacon, porchetta ham hock jerky short loin bresaola biltong jowl sirloin shoulder pork belly turkey. Turducken sausage pancetta salami, tail rump pork chop tri-tip frankfurter ribeye kevin.</Summary>
          </View>
        `,
        info: `Pass lines={n} to limit output`
      },
    ];
    return (
      <View scroll>
        <Headline>Typography</Headline>
        <View>
          {data.map((x,i) => <Doc key={i} title={x.title} src={x.src}>{x.info}</Doc>)}
        </View>
      </View>
    );
  }

}
