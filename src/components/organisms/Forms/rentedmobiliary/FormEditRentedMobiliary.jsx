import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../../atoms/Button";
export default function FormEditRentedMobiliary({ onClose }) {
  const idRef = useRef("");
  const nameRef = useRef("");
  const costRef = useRef("");
  const descriptionRef = useRef("");
  const providerRef = useRef("");
  const entryDateRef = useRef("");
  const exitDateRef = useRef("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newData) => {
      return fetch(
        `${import.meta.env.VITE_URL}/rentedmobiliary/${idRef.current.value}`,
        {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(newData),
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["rented_mobiliary"]);
      onClose();
    },
    onError: (error) => {
      console.error("Error posting data:", error);
      alert("No se pudo hacer conexión");
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    const entryDate = new Date(entryDateRef.current.value).getDate();
    const exitDate = new Date(exitDateRef.current.value).getDate;
    const today = new Date().getDate;

  if (entryDate < today || exitDate < today) {
    alert("Las fechas no pueden ser en el pasado.");
    return;
  }

    const newData = {
      name: nameRef.current.value,
      rental_cost: costRef.current.value,
      description: descriptionRef.current.value,
      rented_by: providerRef.current.value,
      rental_start_date: entryDateRef.current.value,
      rental_end_date: exitDateRef.current.value,
      updated_by: "Mdz",
      created_by: "Mdz",
    };
    mutation.mutate(newData);
  };

  return (
    <div className="p-4 border border-gray-300 rounded shadow-md">
      <form className="flex flex-col">
          <label htmlFor="id" className="mb-1">ID del Mobiliario{" "}</label>
          <input type="text" ref={idRef}className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
          <label htmlFor="name">Nombre</label>
          <input type="text" ref={nameRef}className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
          <label htmlFor="cost">Costo</label>
          <input type="number" ref={costRef}className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
          <label htmlFor="description">Descripción</label>
          <input type="text" ref={descriptionRef}className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
          <label htmlFor="provider">Proveedor</label>
          <input type="text" ref={providerRef}className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
          <label htmlFor="entryDate">Fecha de Entrada</label>
          <input type="date" ref={entryDateRef}className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
          <label htmlFor="exitDate">Fecha de Salida</label>
          <input type="date" ref={exitDateRef}className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
        <div className='flex items-center justify-between mt-4'>
            <Button onClick={handleClick} text='Guardar' />
            <Button onClick={onClose} text='Cerrar' />
        </div>
      </form>
    </div>
  );
}
