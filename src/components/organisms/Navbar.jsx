import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar (props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-orange-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={props.img}><img src="Logo.png" alt="Page Logo" className="w-21 h-20" /></Link>
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <ul className="hidden lg:flex space-x-4">
          {props.links && props.links.map((link, index) => (
            <li key={index}>
              <Link to={link.URL} className="text-white">
                {link.site}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={`fixed top-0 right-0 h-full w-64 bg-orange-700 z-50 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
        <button onClick={() => setMenuOpen(false)} className="text-white p-4">
          <FaTimes />
        </button>
        <ul className="flex flex-col space-y-4 mt-8 ml-4">
          {props.links && props.links.map((link, index) => (
            <li key={index}>
              <Link to={link.URL} className="text-white">
                {link.site}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
