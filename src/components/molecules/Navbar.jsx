import React from 'react';
import { data } from '../../data/data';
import { FaFacebook, FaInstagram } from 'react-icons/fa'; // Importar iconos
import './Navbar.css';

function Navbar() {
    const { links } = data;

    return (
        <div className="navbar">
            <img src="Logo.png" alt="Page Logo" className="logo" />
            <ul className="nav-links">
                <li>
                    <a href="/" className="nav-link">Inicio</a>
                </li>
                <li>
                    <a href="/contact" className="nav-link">Contáctanos</a>
                </li>
                {links.map((link, i) => (
                    <li key={i}>
                        <a href={link.link} className="nav-link">
                            {link.site === 'Salones' ? <FaFacebook /> : <FaInstagram />}
                            {link.site}
                        </a>
                    </li>
                ))}
                <li>
                    <a href="/login" className="nav-link">Iniciar Sesión</a>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
