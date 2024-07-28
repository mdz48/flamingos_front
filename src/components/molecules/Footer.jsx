import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { data } from '../../data/data';

function Footer() {
  const { flamingos, chulavista, socialLinks } = data.footer;
  const iconMap = {
    FaFacebook: FaFacebook,
    FaInstagram: FaInstagram,
    FaWhatsapp: FaWhatsapp,
  };

  return (
    <footer className="bg-orange-700 p-4 mt-8 flex">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
        <div className="flex flex-col lg:flex-row text-white space-y-4 lg:space-y-0 lg:space-x-8">
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-bold">{flamingos.name}</h3>
            <p>{flamingos.address}</p>
            <p>Informes al {flamingos.phone}</p>
          </div>
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-bold">{chulavista.name}</h3>
            <p>{chulavista.address}</p>
            <p>Informes al {chulavista.phone}</p>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          {socialLinks.map((link, index) => {
            const IconComponent = iconMap[link.icon];
            return (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                <IconComponent className="text-white text-2xl" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default Footer;