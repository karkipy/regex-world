import React, { useState, useCallback } from 'react';
import './app.scss';

function RegexBar({ setRegex }) {
  const changeHandler = useCallback((e) => {
    const { textContent } = e.currentTarget;
    const regex = textContent.replace('\\', '/');
    setRegex(regex);
  }, [setRegex]);

  return (
    <div className="search-bar">
      <span>/</span>
      <div contentEditable className="search-input" onInput={changeHandler} type="text" placeholder="Regex exp" />
      <span>/</span>
    </div>
  );
}

function SentenceInput({ setSentence }) {
  return <div className="sentence-input" onInput={e => setSentence(e.currentTarget.textContent)} contentEditable placeholder="Write Something here..." />;
}

function Result({ regex, sentence }) {
  let value = null;
  try {
    value = sentence.match(new RegExp(regex));
    return (
      <div className="result">
        {value}
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

function CheckBox({ name, label, val, setVal }) {
  return (
    <label onClick={() => setVal(val)}>
      <input type="checkbox" />
      {label}
    </label>
  );
}

function HelperBar() {
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
        <CheckBox label="Global" val="g" />
        <CheckBox label=" Case Insensitive" val="i" />
      </div>
    </div>
  );
}


function App() {
  const [sentence, setSentence] = useState('');
  const [regex, setRegex] = useState('');
  return (
    <div className="container">
      <RegexBar setRegex={setRegex} />
      <HelperBar />
      <SentenceInput setSentence={setSentence} />
      <Result regex={regex} sentence={sentence} />
    </div>
  );
}

export default App;
