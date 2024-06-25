import React from 'react';
import Cards from '../molecules/Cards';
import { data } from '../../data/data';
import './Herosection.css';

function Herosection() {
  return (
    <div className="herosection">
      <Cards cards={data.cards} />
    </div>
  );
}

export default Herosection;
