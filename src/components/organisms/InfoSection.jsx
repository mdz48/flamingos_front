import React from 'react';
import Paragraph from '../atoms/Paragraph';
import  './InfoSection.css';

function InfoSection({ info }) {
  return (
    <div className="info-section">
      {info.map((text, index) => (
        <Paragraph key={index} text={text} />
      ))}
    </div>
  );
}

export default InfoSection;
