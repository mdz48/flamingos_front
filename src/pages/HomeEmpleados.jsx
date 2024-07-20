import React from 'react';
import Navbar from '../components/organisms/Navbar.jsx';
import { data } from '../data/data.js';

function HomeEmpleados() {
  const links = [
    { site: "Mobiliario", URL: "/mobiliario" },
    { site: "Insumos", URL: "/insumos" },
    { site: "Usuarios", URL: "/users" },
    { site: "Rented Mobiliary", URL: "/rented-mobiliary" },
    { site: "Salon", URL: "/salon" },
    { site: "Clientes", URL: "/client" },
  ];

  return (
    <>
      <Navbar links={links} />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mt-4">Bienvenido a la sección de empleados</h1>
        <p>Aquí puedes gestionar el inventario y más.</p>
      </div>
    </>
  );
}

export default HomeEmpleados;


