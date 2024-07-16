// Paragraph.jsx
import React from 'react';

function Paragraph({ text, className = "" }) {
  return (
    <p className={`text-gray-700 text-lg leading-relaxed mb-4 ${className}`}>
      {text}
    </p>
  );
}

export default Paragraph;
