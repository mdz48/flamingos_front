import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/organisms/Navbar.jsx';
import { data } from '../data/data.js';
import { UserContext } from '../context/userContext.js';
import { Navigate } from 'react-router-dom';
import { FaPhoneAlt } from 'react-icons/fa';  // Importar el icono de teléfono

function HomeEmpleados() {
  const value = useContext(UserContext);
  if (!value.user.firstname) {
    return <Navigate to='/login'/>
  }

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Navbar links={data.navuser} img='/home-empleados' />
      <div className="flex flex-col md:flex-row min-h-screen bg-white text-black">
        <div className="w-full md:w-1/3 p-8 order-1">
          <h1 className="text-4xl font-bold mb-6">Área de trabajo</h1>
          <h2 className="text-2xl font-bold mt-4">Bienvenido a la sección de empleados</h2>
          <p className="mt-4">Aquí puedes gestionar el inventario y más.</p>
        </div>
        <div className="w-full md:flex-1 p-8 order-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="bg-orange-700 p-4 md:p-6 rounded-lg flex flex-col justify-center items-center text-center md:text-left">
            <span className="text-white text-2xl md:text-3xl mb-4">Hora y fecha</span>
              <span className="text-white text-2xl md:text-3xl mb-4">{time.toLocaleTimeString()}</span>
              <span className="text-white text-lg md:text-xl">{time.toLocaleDateString()}</span>
            </div>
            <div className="bg-orange-700 p-4 md:p-6 rounded-lg flex flex-col justify-center items-center text-center md:text-left">
              <span className="text-white text-2xl md:text-3xl mb-4">Sugerencia</span>
              <span className="text-white text-lg md:text-xl mb-4">Si tiene dudas, contacte con el salón.</span>
              <div className="flex flex-col items-center text-white">
                <div className="flex items-center mb-2">
                  <FaPhoneAlt className="mr-2" />
                  <p>Salon Chula Vista: +52 961 451 2438</p>
                </div>
                <div className="flex items-center">
                  <FaPhoneAlt className="mr-2" />
                  <p>Salon Flamingo: +52 961 217 6999</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeEmpleados;












/*import React from 'react';
import Navbar from '../components/organisms/Navbar.jsx';
import { data } from '../data/data.js';
import { useContext } from 'react';
import { UserContext } from '../context/userContext.js';
import { Navigate } from 'react-router-dom';

function HomeEmpleados() {

  const value = useContext(UserContext);
  if (!value.user.firstname) {
    return <Navigate to='/login'/>
  }

  return (
    <>
      <Navbar links={data.navuser} img = {'/home-empleados'}/>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mt-4">Bienvenido a la sección de empleados</h1>
        <p>Aquí puedes gestionar el inventario y más.</p>
      </div>
    </>
  );
}

export default HomeEmpleados;*/


