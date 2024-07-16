import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-orange-700 p-4 mt-8">
      <div className="container mx-auto flex justify-center space-x-4">
        <a href="https://www.facebook.com/SalonFlamingosTuxtla" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-white text-2xl" />
        </a>
        <a href="https://www.instagram.com/salonflamingos/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-white text-2xl" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
