import React from 'react';
import Footer from '../components/molecules/Footer';
import Navbar from '../components/organisms/Navbar.jsx';
import { data } from '../data/data.js';

function Contact() {
  const locations = [
    {
      name: "Salón Flamingos",
      address: "Halcón 371, Los Pájaros, 29096 Tuxtla Gutiérrez, Chis.",
      phone: "+52 961 123 4567",
      mapLink: "https://maps.app.goo.gl/JEfByBystCkskGVV6",
      imgSrc: "https://i.imgur.com/ADnNAfl.png"  
    },
    {
      name: "Otro Lugar",
      address: "Prosperidad 19, Zona Sin Asignación de Nombre de Col 24, 29045 Tuxtla Gutiérrez, Chis.",
      phone: "+52 961 451 2438",
      mapLink: "https://maps.app.goo.gl/7G8zwWjRBVib7cd3A",
      imgSrc: "https://i.imgur.com/6pBfk3V.png"  
    }
  ];

  return (
    <div>
      <Navbar links={data.navhome} img={'/'} />
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <h2 className="text-3xl font-bold my-6 text-center">Contáctanos</h2>
        <div className="flex flex-wrap justify-center space-y-8 lg:space-y-0 lg:space-x-8">
          {locations.map((location, index) => (
            <div key={index} className="bg-white p-8 rounded shadow-md w-full max-w-lg lg:w-1/2">
              <a href={location.mapLink} target="_blank" rel="noopener noreferrer">
                <img src={location.imgSrc} alt={location.name} className="w-full h-64 object-cover mb-4 rounded-lg" />
              </a>
              <p className="text-gray-700 mb-2">
                <span role="img" aria-label="location" className="mr-2">📍</span>
                {location.address}
              </p>
              <p className="text-gray-700">
                <span role="img" aria-label="phone" className="mr-2">📞</span>
                {location.phone}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;




























/*import React from 'react';
import Footer from '../components/molecules/Footer';
import Navbar from '../components/organisms/Navbar.jsx';
import { data } from '../data/data.js';

function Contact() {
  return (
    <div>
      <Navbar links={data.navhome} img='/' />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Contactanos</h2>
          <div className="flex flex-col items-center">
            <a
              href="https://maps.app.goo.gl/JEfByBystCkskGVV6"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4"
            >
              <img
                src="https://i.imgur.com/ADnNAfl.png" // Reemplaza con la URL de la imagen del mapa
                alt="Mapa de la ubicación"
                className="rounded-lg shadow-md"
              />
            </a>
            <div className="text-center mt-4">
              <div className="flex items-center justify-center mb-2">
                <svg
                  className="w-6 h-6 text-orange-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1 1 0 01-1.414 0l-4.243-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <p>Halcón 371, Los Pájaros, 29096 Tuxtla Gutiérrez, Chis.</p>
              </div>
              <div className="flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-orange-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10l1.72 1.72a12.06 12.06 0 005.68 5.68L13 21h0a12.06 12.06 0 005.68-5.68L21 10h0a12.06 12.06 0 00-5.68-5.68L10 3h0A12.06 12.06 0 004.32 8.32L3 10z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <p>+34 91 414 91 91</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;*/
