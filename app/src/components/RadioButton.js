// @flow
import React from 'react';

type Props = {
  name: String,
  label: String,
  val: String,
  setVal: () => void,
}

function RadioButton({ name, label, val, setVal }: Props) {
  return (
    // eslint-disable-next-line
    <label onClick={() => setVal(val)}>
      <input type="radio" name={name || 'radio'} />
      {label}
    </label>
  );
}


export default RadioButton;
