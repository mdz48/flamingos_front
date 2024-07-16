import React from 'react';
import { data } from '../../../data/data.js';
import Card from "../../molecules/Landing-Molecules/Card.jsx";

function CardsSection() {
    return (
        <div className="flex flex-wrap justify-center gap-4 py-8 bg-gray-100">
            {data.cards.map((card, index) => (
                <Card key={index} img={card.image} title={card.head} text={card.text} />
            ))}
        </div>
    );
}

export default CardsSection;
