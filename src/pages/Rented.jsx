import React from "react";
import Calendar from "../components/organisms/Calendar";
import Navbar from "../components/organisms/Navbar";
import { data } from "../data/data";
import FormularioSalon from "../components/organisms/Forms/rented/FormRented";


function Rented () {
  return (
    <>
      <Navbar links={data.navuser} img={'/'} />
      
      <div>
        <FormularioSalon/>
      </div>
      <h1 className="text-center text-2xl font-bold my-4">Calendario Mensual</h1>
      <Calendar year={2024} month={6} />
    </>
  );
};

export default Rented;