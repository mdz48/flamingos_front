import React from 'react';
import Navbar from '../components/molecules/Navbar';
import Footer from '../components/molecules/Footer';

function Contact() {
  return (
    <div>
      <Navbar />
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
