import React from 'react';
import Picture from '../atoms/Picture';
import Paragraph from '../atoms/Paragraph';

function Card({ img, text }) {
  return (
    <div className="flex flex-col items-center space-y-2 w-full sm:w-1/2 lg:w-1/4 p-2">
      <Picture img={img} />
      <Paragraph text={text} />
    </div>
  );
}

function Cards({ cards }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {cards.map((card, index) => (
        <Card key={index} img={card.image} text={card.text} />
      ))}
    </div>
  );
}

export default Cards;
