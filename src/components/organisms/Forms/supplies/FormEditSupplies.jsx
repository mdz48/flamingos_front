import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../../atoms/Button";
import Input from "../../../atoms/Input";

export default function FormEditSupplies({ onClose }) {
  const idRef = useRef("");
  const nameRef = useRef("");
  const costRef = useRef("");
  const descriptionRef = useRef("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newData) => {
      return fetch(
        `${import.meta.env.VITE_URL}/supplies/${idRef.current.value}`,
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
      queryClient.invalidateQueries(["supplies"]);
    },
    onError: (error) => {
      console.error("Error posting data:", error);
      alert("No se pudo hacer conexión");
    },
  });

  const handleClick = (e) => {
    e.preventDefault();

    const newData = {
      id: idRef.current.value,
      name: nameRef.current.value,
      cost: costRef.current.value,
      description: descriptionRef.current.value,
      updated_by: "Mdz",
    };

    mutation.mutate(newData);
  };

  return (
    <div className="p-4 border border-gray-300 rounded shadow-md">
      <form className="flex flex-col">
        <label htmlFor="id" className="mb-1">ID del Insumo</label>
        <input type="text" ref={idRef} className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
        <label htmlFor="name">Nombre</label>
        <input type="text" ref={nameRef} className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
        <label htmlFor="cost">Costo</label>
        <input type="number" ref={costRef} className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
        <label htmlFor="description">Descripción</label>
        <input type="text" ref={descriptionRef} className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
        <div className='flex items-center justify-between mt-4'>
          <Button onClick={handleClick} text='Guardar' />
          <Button onClick={onClose} text='Cerrar' />
        </div>
      </form>
    </div>
  );
}
