import React from 'react';
import './Button.css';

function Button({ children }) {
  return (
    <button className="button">{children}</button>
  );
}

export default Button;
