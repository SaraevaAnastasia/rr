import React from 'react';

import './Select.css';

export default function Select({
  className = ``,
  // @ts-ignore
  value,
  // @ts-ignore
  options,
  // @ts-ignore
  onChange,
}) {
  return (
    <select
      className={`tc-table-desktop__select ${className}`}
      value={value}
      onChange={onChange}
    >
      {
        // @ts-ignore
        options.map((option) => (
          <option
            key={`select-option-${option.value}`}
            value={option.value}
          >
            {option.label}
          </option>
        ))
      }
    </select>
  );
}
