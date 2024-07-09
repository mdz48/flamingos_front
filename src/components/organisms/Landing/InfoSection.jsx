import React from 'react';
import Heading from '../../atoms/Heading.jsx';
import Paragraph from '../../atoms/Paragraph.jsx';
import {infoData} from "../../../data/data.js";

function InfoSection() {
  return (
      <div className="space-y-4 p-4 container mx-auto">
        <Heading text={'Eventos en flamingos'} className="text-2xl font-bold text-center text-gray-800 mb-4" />
        <div className="space-y-2">
          {infoData.map((text, index) => (
              <Paragraph key={index} text={text} className="text-gray-600 text-lg" />
          ))}
        </div>
      </div>
  );
}

export default InfoSection;
