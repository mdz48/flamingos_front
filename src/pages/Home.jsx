import React from 'react';
import Heading from '../components/atoms/Heading';
import Herosection from '../components/organisms/Herosection';
import InfoSection from '../components/organisms/InfoSection';

function Home() {
  const info = ["Info 1", "Info 2", "Info 3"];
  return (
    <div className="space-y-8">
      <Herosection />
      <div className="p-4">
        <Heading>Un espacio único para reuniones y celebraciones</Heading>
      </div>
      <InfoSection info={info} />
    </div>
  );
}

export default Home;
