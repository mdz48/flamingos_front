import React from "react";
import Calendar from "../components/organisms/Calendar";

function Rented () {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">Calendario Mensual</h1>
      <Calendar year={2024} month={6} />
    </div>
  );
};

export default Rented;
