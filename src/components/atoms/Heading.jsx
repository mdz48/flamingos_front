import React from 'react';

function Heading({ text, className = '' }) {
  return (
    <h2 className={`text-2xl font-bold text-center text-gray-800 mb-4 ${className}`}>
      {text}
    </h2>
  );
}

export default Heading;