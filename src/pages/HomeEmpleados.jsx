import React from 'react';
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

export default HomeEmpleados;


