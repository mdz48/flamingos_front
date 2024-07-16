// Picture.jsx
import React from 'react';

function Picture({ img }) {
  return (
    <img src={img} alt="" className="w-full h-[50%] object-cover rounded-t-lg" />
  );
}

export default Picture;
