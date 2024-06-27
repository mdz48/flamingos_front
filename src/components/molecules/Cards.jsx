import React from 'react';
import Picture from '../atoms/Picture';
import Paragraph from '../atoms/Paragraph';

function Card({ img, text }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div>
        <Picture img={img} />
      </div>
      <div>
        <Paragraph text={text} />
      </div>
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
