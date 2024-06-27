import React from 'react';
import Paragraph from '../atoms/Paragraph';

function InfoSection({ info }) {
  return (
    <div className="space-y-4 p-4 bg-white">
      {info.map((text, index) => (
        <Paragraph key={index} text={text} />
      ))}
    </div>
  );
}

export default InfoSection;
