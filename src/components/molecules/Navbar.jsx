import React from 'react';
import { data } from '../../data/data';
import { Link } from 'react-router-dom';

function Navbar() {
  const { links } = data;

  return (
    <div className="flex justify-between items-center p-4 bg-red-600">
      <img src="vite.svg" alt="Page Logo" className="w-12 h-12" />
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:underline">Inicio</Link>
        </li>
        <li>
          <Link to="/contact" className="text-white hover:underline">Contactanos</Link>
        </li>
        {links.map((link, i) => (
          <li key={i}>
            <a href={link.link} className="text-white hover:underline">{link.site}</a>
          </li>
        ))}
        <li>
          <Link to="/login" className="text-white hover:underline">Iniciar Sesión</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
