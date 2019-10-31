// @flow

import React, { useState, useEffect, useCallback, useRef } from 'react';
import './app.scss';

function RegexBar({ setRegex }) {
  const ref = useRef();
  const changeHandler = useCallback((e) => {
    const { textContent } = e.currentTarget;
    const regex = textContent.replace('\\', '\\');
    setRegex(regex);
  }, [setRegex]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  return (
    <div className="search-bar" onClick={() => ref.current.focus()}>
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
      <input type="checkbox" checked={exists} />
      {label}
    </label>
  );
}

function HelperBar({ flags, setFlags }) {
  return (
    <div className="helper-bar">
      <div className="fixed-helpers">
        <RadioButton label="Digits Only" val="d" />
        <RadioButton label="None Digits Only" val="d" />
        <RadioButton label="Words Only" val="d" />
        <RadioButton label="None Words Only" val="d" />
        <RadioButton label="Space Character Only" val="d" />
        <RadioButton label="None Space Character Only" val="d" />
      </div>
      <div className="global-helpers">
        <CheckBox values={flags} setVal={setFlags} label="Global" val="g" />
        <CheckBox values={flags} setVal={setFlags} label="Case Insensitive" val="i" />
      </div>
    </div>
  );
}


function App() {
  const [sentence, setSentence] = useState('');
  const [regex, setRegex] = useState('');
  const [flags, setFlags] = useState([]);

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
      <RegexBar setRegex={setRegex} />
      <HelperBar flags={flags} setFlags={handleFlags} />
      <SentenceInput setSentence={setSentence} />
      <Result flags={flags} regex={regex} sentence={sentence} />
    </div>
  );
}

export default App;
