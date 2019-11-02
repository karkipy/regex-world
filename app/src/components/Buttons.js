/* global window document */
// @flow
import React, { useCallback } from 'react';

function Buttons({ regex, flags }) {
  const getRegex = useCallback(() => {
    const el = document.getElementById('regexVal');
    el.style.display = 'block';
    el.value = `/${el.value}/${flags.join('')}`;
    el.select();
    document.execCommand('copy');
    el.style.display = 'none';
  }, [flags]);

  const getRegexJs = useCallback(() => {
    const el = document.getElementById('regexVal');
    el.style.display = 'block';
    el.value = `new RegExp('${el.value}', '${flags.join('')}')`;
    el.select();
    document.execCommand('copy');
    el.style.display = 'none';
  }, [flags]);

  return (
    <div>
      <button type="button" onClick={getRegex}>Get Regex</button>
      <button type="button" onClick={getRegexJs}>Get Regex js</button>
    </div>
  );
}

export default Buttons;
