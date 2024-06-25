import React from 'react';
import './Heading.css';

function Heading({ children }) {
  return (
    <h1 className="heading">{children}</h1>
  );
}

export default Heading;
