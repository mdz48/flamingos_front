import React from 'react';
import Navbar from '../components/molecules/Navbar';
import Heading from '../components/atoms/Heading';
import Herosection from '../components/organisms/Herosection';
import InfoSection from '../components/organisms/InfoSection';
import Cards from '../components/molecules/Cards';
import Slider from '../components/molecules/Slider';
import Footer from '../components/molecules/Footer';

function Home() {
  const info = ["Info 1", "Info 2", "Info 3"];
  const cardsData = [
    { image: 'path/to/card1.jpg', text: 'Card 1' },
    { image: 'path/to/card2.jpg', text: 'Card 2' },
    { image: 'path/to/card3.jpg', text: 'Card 3' },
  ];

  return (
    <div className="space-y-8">
      <Navbar />
      <Slider />
      <Herosection />
      <div className="p-4">
        <Heading>Un espacio único para reuniones y celebraciones</Heading>
      </div>
      <div className="p-4">
        <Cards cards={cardsData} />
      </div>
      <InfoSection info={info} />
      <Footer />
    </div>
  );
}

export default Home;
