import React from 'react';
import Heading from '../components/atoms/Heading';
import Herosection from '../components/organisms/Herosection';
import InfoSection from '../components/organisms/InfoSection';
import './Home.css'; // Importa los estilos específicos de la página Home

function Home() {
  const info = ["Info 1", "Info 2", "Info 3"];
  return (
    <div className="home-container">
      <Herosection />
      <div className="home-heading">
        <Heading>Un espacio único para reuniones y celebraciones</Heading>
      </div>
      <InfoSection info={info} />
    </div>
  );
}

export default Home;
