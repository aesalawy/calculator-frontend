import React, { useState } from 'react';
import { calculate } from '../api/calculator';
import './Calculator.css';

const BUTTONS = [
  ['C', '(', ')', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export const Calculator: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleButton = async (value: string) => {
    setError('');

    if (value === 'C') {
      setExpression('');
      setResult('');
      return;
    }

    if (value === '=') {
      if (!expression) return;
      setLoading(true);
      try {
        const res = await calculate(expression);
        setResult(String(res));
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error');
      } finally {
        setLoading(false);
      }
      return;
    }

    setResult('');
    setExpression((prev) => prev + value);
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="expression">{expression || '0'}</div>
        <div className={`result ${error ? 'error' : ''}`}>
          {loading ? '…' : error || (result !== '' ? `= ${result}` : '')}
        </div>
      </div>
      <div className="buttons">
        {BUTTONS.map((row, ri) => (
          <div key={ri} className="row">
            {row.map((btn) => (
              <button
                key={btn}
                className={`btn ${btn === '=' ? 'btn-equals' : ''} ${btn === 'C' ? 'btn-clear' : ''}`}
                onClick={() => handleButton(btn)}
                disabled={loading}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
