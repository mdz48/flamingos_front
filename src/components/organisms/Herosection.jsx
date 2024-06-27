import React from 'react';
import Cards from '../molecules/Cards';
import { data } from '../../data/data';

function Herosection() {
  return (
    <div className="flex justify-center py-8 bg-gray-100">
      <Cards cards={data.cards} />
    </div>
  );
}

export default Herosection;
