// @flow
import React from 'react';

type Props = {
  setSentence: () => void,
}

function SentenceInput({ setSentence }: Props) {
  return <div className="sentence-input" onInput={e => setSentence(e.currentTarget.textContent)} contentEditable placeholder="Write Something here..." />;
}

export default SentenceInput;
