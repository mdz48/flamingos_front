import React, { useState } from 'react';
import { data } from '../../data/data';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const { links } = data;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-orange-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <img src="Logo.png" alt="Page Logo" className="w-21 h-20" />
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <ul className={`lg:flex space-x-4 ${menuOpen ? 'block' : 'hidden'} lg:block`}>
          <li>
            <Link to="/" className="text-white hover:underline">Inicio</Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:underline">Contactanos</Link>
          </li>
          <li>
            <Link to="/login" className="text-white hover:underline">Iniciar Sesión</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
