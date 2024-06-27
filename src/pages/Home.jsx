import React from 'react';
import Heading from '../components/atoms/Heading';
import Herosection from '../components/organisms/Herosection';
import InfoSection from '../components/organisms/InfoSection';
import Slider from '../components/molecules/Slider';
import Cards from '../components/molecules/Cards';

function Home() {
  const info = ["Info 1", "Info 2", "Info 3"];
  const cardsData = [
    { image: 'path_to_image1.jpg', text: 'Card 1 content goes here.' },
    { image: 'path_to_image2.jpg', text: 'Card 2 content goes here.' },
    { image: 'path_to_image3.jpg', text: 'Card 3 content goes here.' },
    // Add more card data as needed
  ];

  return (
    <div className="space-y-8">
      <Slider />
      <Herosection />
      <div className="p-4">
        <Heading>Un espacio único para reuniones y celebraciones</Heading>
      </div>
      <InfoSection info={info} />
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Our Services</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Cards cards={cardsData} />
        </div>
      </div>
    </div>
  );
}

export default Home;
