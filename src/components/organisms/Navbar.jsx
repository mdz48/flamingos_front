import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar (props) {
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
          {props.links && props.links.map((link, index) => (
            <li key={index}>
              <Link to={link.URL} className={"text-white"}>
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
