import React from 'react';
import Picture from '../atoms/Picture';
import Paragraph from '../atoms/Paragraph';
import './Cards.css';

function Card({ img, text }) {
  return (
    <div className="card">
      <div className="card-image">
        <Picture img={img} />
      </div>
      <div className="card-text">
        <Paragraph text={text} />
      </div>
    </div>
  );
}

function Cards({ cards }) {
  return (
    <div className="cards-container">
      {cards.map((card, index) => (
        <Card key={index} img={card.image} text={card.text} />
      ))}
    </div>
  );
}

export default Cards;
