// @flow
import React from 'react';
import RadioButton from './RadioButton';
import CheckBox from './CheckBox';


type Props = {
  flags: Array,
  setFlags: () => void,
  setRegex: () => void,
}

function HelperBar({ flags, setFlags, setRegex }: Props) {
  return (
    <div className="helper-bar">
      <div className="fixed-helpers">
        <RadioButton label="Digits Only" val="\d" setVal={setRegex} />
        <RadioButton label="None Digits Only" val="\D" setVal={setRegex} />
        <RadioButton label="Words Only" val="\w" setVal={setRegex} />
        <RadioButton label="None Words Only" val="\W" setVal={setRegex} />
        <RadioButton label="Space Character Only" val="\s" setVal={setRegex} />
        <RadioButton label="None Space Character Only" val="\S" setVal={setRegex} />
      </div>
      <div className="global-helpers">
        <CheckBox values={flags} setVal={setFlags} label="Global" val="g" />
        <CheckBox values={flags} setVal={setFlags} label="Case Insensitive" val="i" />
      </div>
    </div>
  );
}


export default HelperBar;
