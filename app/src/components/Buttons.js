/* global document */
// @flow
import React, { useCallback } from 'react';
import './buttons.scss';

type Props = {
  regex: String,
  flags: Array,
  char: String,
}

function Buttons({ regex, flags, char }: Props) {
  const getRegex = useCallback(() => {
    const el = document.getElementById('regexVal');
    el.style.display = 'block';
    const regVal = regex || char;
    el.value = `/${regVal}/${flags.join('')}`;
    el.select();
    document.execCommand('copy');
    el.style.display = 'none';
  }, [flags, regex, char]);

  const getRegexJs = useCallback(() => {
    const el = document.getElementById('regexVal');
    el.style.display = 'block';
    const regVal = regex || char.replace('\\', '\\\\');
    el.value = `new RegExp('${regVal}', '${flags.join('')}')`;
    el.select();
    document.execCommand('copy');
    el.style.display = 'none';
  }, [flags, regex, char]);

  return (
    <div className="button-container">
      <button type="button" onClick={getRegex}>Get Regex</button>
      <button type="button" onClick={getRegexJs}>Get Regex JS Expression</button>
    </div>
  );
}

export default Buttons;
