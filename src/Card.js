import React from 'react';
import View from './View';
import CSS from './utils/css';

CSS.register({
  '.view.card': {
    borderRadius: '0.35rem',
    margin: '0.75rem 1.5rem',
  },
  '.view .view.card:first-child': {
    marginTop: '2rem',
  },
  '.view .view.card:last-child': {
    marginBottom: '2rem',
  }
});

export default class Card extends View {

  static defaultProps = {
    ...View.defaultProps,
    raised: true,
  }

  getClassNames(){
    let cs = super.getClassNames();
    cs.card = true;
    return cs;
  }

}
