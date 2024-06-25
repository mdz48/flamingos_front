import React from 'react';
import './Picture.css';

function Picture({ img }) {
  return (
    <img src={img} alt="" className="picture" />
  );
}

export default Picture;
