/* global window document */
// @flow
import React, { useRef, useCallback, useEffect } from 'react';

type Props = {
  setRegex: () => void,
  regex: String,
}

function RegexBar({ setRegex, regex }: Props) {
  const ref = useRef();
  const changeHandler = useCallback((e) => {
    const { textContent } = e.currentTarget;
    const regexVal = textContent.replace('\\', '\\');
    setRegex(regexVal);
  }, [setRegex]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerText = regex;
    }
  }, [regex]);

  const focusHandler = useCallback(() => {
    const selection = window.getSelection();
    const range = document.createRange();
    selection.removeAllRanges();
    range.selectNodeContents(ref.current);
    range.collapse(false);
    selection.addRange(range);
    ref.current.focus();
  }, [ref]);

  return (
    // eslint-disable-next-line
    <div className="search-bar" onClick={focusHandler}>
      <span>/</span>
      <div contentEditable ref={ref} className="search-input" onInput={changeHandler} type="text" />
      <span>/</span>
    </div>
  );
}

export default RegexBar;
