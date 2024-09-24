// src/components/calculator/index.jsx
import React, { useState} from 'react';
import './style.scss';

const Calculator = ({ onClose }) => {
  const [input, setInput] = useState('');

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleCalculate = () => {
    try {
      const result = Function('"use strict";return (' + input + ')')();
      setInput(String(result));
    } catch (error) {
      setInput('Error');
    }
  };

  const handleClear = () => {
    setInput('');
  };

  return (
    <div className="calculator-overlay">
      <div className="calculator-container">
        <div className="calculator-header">
          <h2>Calculator</h2>
          <button onClick={onClose}>X</button>
        </div>
        <input
          type="text"
          value={input}
          readOnly
          className="calculator-input"
        />
        <div className="calculator-buttons">
          {['7', '8', '9', '/'].map((value) => (
            <button key={value} onClick={() => handleButtonClick(value)}>
              {value}
            </button>
          ))}
          {['4', '5', '6', '*'].map((value) => (
            <button key={value} onClick={() => handleButtonClick(value)}>
              {value}
            </button>
          ))}
          {['1', '2', '3', '-'].map((value) => (
            <button key={value} onClick={() => handleButtonClick(value)}>
              {value}
            </button>
          ))}
          {['0', '.', '=', '+'].map((value) => (
            <button
              key={value}
              onClick={() =>
                value === '=' ? handleCalculate() : handleButtonClick(value)
              }
            >
              {value}
            </button>
          ))}
          <button onClick={handleClear} id="clear">
            C
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
