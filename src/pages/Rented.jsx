import React from "react";
import Calendar from "../components/organisms/Calendar";
import Navbar from "../components/organisms/Navbar";
import { data } from "../data/data";
import FormRented from "../components/organisms/Forms/rented/FormRented";
import FormEditRented from "../components/organisms/Forms/rented/FormEditRented";
import FormDeleteRented from "../components/organisms/Forms/rented/FormDeleteRented";
import MenuContainer from "../components/organisms/MenuContainer";
import { useState } from 'react';



function Rented () {
  const [showSection, setShowSection] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const verticalMenuItems = ['Agregar', 'Editar', 'Borrar'];
  
  const handleMenuClick = (item) => {
    setShowSection(false);
    setShowEdit(false);
    setShowDelete(false);

    if (item === 'Agregar') {
      setShowSection(true);
    } else if (item === 'Editar') {
      setShowEdit(true);
    } else if (item === 'Borrar') {
      setShowDelete(true);
    }
  };
  return (
    <>
    <Navbar links={data.navuser} img='/home-empleados' />
    <h1 className="text-2xl font-bold mb-4 p-8 text-center">Bienvenido a la Administración de Recursos</h1>
    <div className="flex flex-col md:grid md:grid-cols-3 w-[80%] mx-auto">
      
        <div className="w-auto md:col-span-1 mb-4 md:mb-0">
          <MenuContainer items={verticalMenuItems} onMenuClick={handleMenuClick} />
          {showSection && (
            <div>
              <FormRented onClose={() => setShowSection(false)} />
            </div>
          )}
          {showEdit && (
            <div>
              <FormEditRented onClose={() => setShowEdit(false)} />
            </div>
          )}
          {showDelete && (
            <div>
              <FormDeleteRented onClose={() => setShowDelete(false)} />
            </div>
          )}
        </div>
      
      <div className={`md:col-span-2 w-full mx-auto overflow-x-auto h-[50vh]`}>
      <Calendar year={2024} month={6} />
      </div>
    </div>
  </>
   
  );
};

export default Rented;