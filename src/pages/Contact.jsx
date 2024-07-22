import React from 'react';
import Footer from '../components/molecules/Footer';
import Navbar from '../components/organisms/Navbar.jsx';
import { data } from '../data/data.js';

function Contact() {
  return (
    <div>
      <Navbar links={data.navhome}img = {'/'}/>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Contactanos</h2>
          {/* Aquí puedes agregar el contenido del contacto */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
