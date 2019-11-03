// @flow
import React from 'react';

type Props = {
  label: String,
  val: String,
  setVal: () => void,
  values: Array,
}

function CheckBox({ label, val, setVal, values }: Props) {
  const exists = values.includes(val);

  return (
    // eslint-disable-next-line
    <label onChange={() => setVal(val)}>
      <input type="checkbox" checked={exists} />
      {label}
    </label>
  );
};

export default CheckBox;
