// components/molecules/Card.jsx
import React from 'react';
import Picture from '../../atoms/Picture.jsx';
import Paragraph from '../../atoms/Paragraph.jsx';

function Card({ img, title, text }) {
  return (
    <div className="flex flex-col items-center space-y-2 w-full sm:w-1/2 lg:w-1/4 p-2 border rounded-lg shadow-lg">
      <Picture img={img} />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <Paragraph text={text} />
    </div>
  );
}

export default Card;
