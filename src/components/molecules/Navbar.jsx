import React from 'react';
import { data } from '../../data/data';
import './Navbar.css';

function Navbar() {
    const { links } = data; // Extraer links del objeto data

    return (
        <div className="navbar">
            <img src="vite.svg" alt="Page Logo" className="logo" />
            <ul className="nav-links">
                {links.map((link, i) => (
                    <li key={i}>
                        <a href={link.link} className="nav-link">{link.site}</a>
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
