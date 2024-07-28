import React from 'react';
import { data } from '../../../data/data.js';
import Card from "../../molecules/Landing-Molecules/Card.jsx";
import PackageCard from "../../molecules/Landing-Molecules/PackageCard.jsx";

function CardsSection() {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 py-8 bg-gray-100">
        {data.cards.map((card, index) => (
          <Card key={index} img={card.image} title={card.head} text={card.text} />
        ))}
      </div>

      <div className="text-center py-8">
        <h2 className="text-3xl font-bold">Paquetes</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-4 py-8">
        {data.packages.map((pkg, index) => (
          <PackageCard key={index} title={pkg.title} price={pkg.price} features={pkg.features} />
        ))}
      </div>
    </>
  );
}

export default CardsSection;