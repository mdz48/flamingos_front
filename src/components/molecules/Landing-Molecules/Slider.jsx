import React, { useState, useEffect } from 'react';

const images = [
  'Slider2.jpg',
  'Slider.jpg',
  'alberca.jpg',
  'card2.jpg',
  'card1.jpg',
];

function Slider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-96 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex items-center justify-center h-full text-white">
            <div className="text-center">
              <h1 className="text-4xl font-bold">TODOS TUS EVENTOS Y REUNIONES CON</h1>
              <h2 className="text-2xl">COFFEE BREAK INCLUIDO</h2>
              <button className="mt-4 px-4 py-2 bg-yellow-600 text-white font-bold rounded">CONOCE MÁS</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Slider;
