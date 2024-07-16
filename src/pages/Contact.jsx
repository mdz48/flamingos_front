import React from 'react';
import Footer from '../components/molecules/Footer';
import Navbar from '../components/organisms/Navbar.jsx';
import { data } from '../data/data.js';
import ContactInformation from '../components/organisms/ContactPage/ContactInformation.jsx';

function Contact() {

  const contact = [
    {
      head: 'Flamingos',
      location: 'Nos ubicamos a 5 minutos de Plaza Poliforum; Calle Halcón #371 Col. Los Pájaros',
      contact: 'Informes al 961 451 2438 ',
    },
    {
      head: 'Chula Vista',
      location: 'Nos ubicamos a 5 minutos de Plaza Ambar; Av. Poetas Oscar Oliva #19',
      contact: 'Informes al 961 217 6999'
    }
  ]

  return (
    <div>
      <Navbar links={data.navhome}/>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Contactanos</h2>
          {
            contact.map((info, index) => (<ContactInformation head={info.head} location={info.location} contact={info.contact} key={index}/>))
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
