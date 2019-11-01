/* global window document */
// @flow
import React, { useState, useEffect, useCallback, useRef } from 'react';
import './app.scss';

function RegexBar({ setRegex, regex }) {
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

function SentenceInput({ setSentence }) {
  return <div className="sentence-input" onInput={e => setSentence(e.currentTarget.textContent)} contentEditable placeholder="Write Something here..." />;
}

function Result({ regex, sentence, flags }) {
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

function RadioButton({ name, label, val, setVal }) {
  return (
    <label onClick={() => setVal(val)}>
      <input type="radio" name={name || 'radio'} />
      {label}
    </label>
  );
}


type Props = {
  label: String,
  val: String,
  setVal: () => void,
  values: Array,
}

function CheckBox({ label, val, setVal, values }: Props) {
  const exists = values.includes(val);

  return (
    <label onChange={() => setVal(val)}>
      <input type="checkbox" checked={exists} onChange={() => setVal(val)} />
      {label}
    </label>
  );
}

function HelperBar({ flags, setFlags, setRegex }) {
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


function Buttons({ regex, flags }) {
  const getRegex = useCallback(() => {
    const el = document.getElementById('regexVal');
    el.style.display = 'block';
    el.value = `/${el.value}/${flags.join('')}`;
    el.select();
    document.execCommand('copy');
    el.style.display = 'none';
  }, [flags]);

  const getRegexJs= useCallback(() => {
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


function App() {
  const [sentence, setSentence] = useState('');
  const [regex, setRegex] = useState('');
  const [flags, setFlags] = useState([]);
  const [char, setChar] = useState('');

  const handleFlags = useCallback((v) => {
    const exists = flags.includes(v);
    if (exists) {
      setFlags((prev) => {
        return prev.filter(val => val !== v);
      });
    } else {
      setFlags(prev => [...prev, ...v]);
    }
  }, [setFlags, flags]);

  return (
    <div className="container">
      <RegexBar setRegex={setRegex} regex={char} />
      <HelperBar flags={flags} setFlags={handleFlags} setRegex={setChar} />
      <SentenceInput setSentence={setSentence} />
      <Result flags={flags} regex={regex} sentence={sentence} />
      <Buttons flags={flags} regex={regex} />
      <input type="text" style={{ display: 'none' }} id="regexVal" />
    </div>
  );
}

export default App;
