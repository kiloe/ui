import React from 'react';
import Text from './Text';

// Summary is just a helper for the common case of needing a short status/summary
// line of text. It's very common to have this below Title elements to expand on the title
export default class Summary extends Text {

  static defaultProps = {
    ...Text.defaultProps,
    lines: 1,
    subtle: true,
  }

}
