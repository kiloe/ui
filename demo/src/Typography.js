import React from 'react';
import Doc from './Doc';
import View from '../../package/View';

export default class Typography extends React.Component {

  render(){
    let data = [
      {
        title: 'Text',
        src: Doc.jsx`
          <Text>Lorem</Text>
        `,
        info: `The Text element is for text. Too complex? Deal with it.`
      },
      {
        title: 'Titles',
        src: Doc.jsx`
          <View>
            <Text display>This is Display Text</Text>
            <Text headline>This is a Headline Text</Text>
            <Text title>This is Title Text</Text>
            <Text subheading>This is Subheading Text</Text>
            <Text>This is normal Text</Text>
            <Text hint>This is tiny text</Text>
          </View>
        `,
        info: `Add flags to Text to set common sizes`
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
        title: 'Text within colored sections',
        src: Doc.jsx`
          <View primary>
            <Text>I am still readable</Text>
          </View>
        `,
        info: `Text knows it shouldn't be colored if it's in a colored section`
      },
      {
        title: 'Subtle Text',
        src: Doc.jsx`
          <Text subtle>This text is so unimportant you can barely see it</Text>
        `,
        info: `The subtle prop tells the component you want a more muted version`
      },
      {
        title: 'Summaries',
        src: Doc.jsx`
          <View>
            <Text lines={1}>
              Bacon ipsum dolor amet t-bone bacon ground round,
              bresaola doner short loin shank beef porchetta pancetta
              fatback. Tongue chicken brisket strip steak, prosciuttoa
              jowl pork loin andouille salami turducken sausage.
              Ground round chuck bacon, porchetta ham hock jerky short
              loin bresaola biltong jowl sirloin shoulder pork belly turkey.
              Turducken sausage pancetta salami, tail rump pork chop
              tri-tip frankfurter ribeye kevin.
            </Text>
          </View>
        `,
        info: `Pass lines={n} to clamp output based on the parent's size`
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
