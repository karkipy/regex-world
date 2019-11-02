// @flow
import React from 'react';

type Props = {
  regex: String,
  sentence: String,
  flags: Array,
}

function Result({ regex, sentence, flags }: Props) {
  let value = null;
  try {
    const regexp = new RegExp(regex, flags.join(''));
    value = sentence.match(regexp);
    if (value.index >= 0 && value.input !== '') {
      return (
        <div className="result">
          {value} index: {value.index}
        </div>
      );
    }

    return (
      <div className="result">
        {value.join(', ')}
      </div>
    );
  } catch (e) {
    return (
      <div className="result">
        Regex Experssion Error
      </div>
    );
  }
}

export default Result;
