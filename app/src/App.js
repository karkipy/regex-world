/* global window document */
// @flow
import React, { useState, useCallback } from 'react';
import './app.scss';
import { RegexBar, HelperBar, SentenceInput, Result, Buttons } from './components';


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
