import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../../atoms/Button";

export default function Form({ onClose }) {
  const nameRef = useRef("");
  const costRef = useRef("");
  const descriptionRef = useRef("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newData) => {
      return fetch(`${import.meta.env.VITE_URL}/supplies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(newData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["supplies"]);
      onClose();
    },
    onError: (error) => {
      console.error("Error posting data:", error);
      alert("No se pudo hacer conexión");
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    const newData = {
      "name": nameRef.current.value,
      "cost": costRef.current.value,
      "description": descriptionRef.current.value,
      "updated_by": "Mdz",
      "created_by": "Mdz",
    };
    mutation.mutate(newData);
  };

  return (
    <div className="p-4 border border-gray-300 rounded shadow-md">
      <form className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="username" className="block mb-1">
            Nombre
          </label>
          <input
            type="text"
            ref={nameRef}
            className="border-2 w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="cost" className="block mb-1">
            Costo
          </label>
          <input
            type="text"
            ref={costRef}
            className="border-2 w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="description" className="block mb-1">
            Descripción
          </label>
          <input
            type="text"
            ref={descriptionRef}
            className="border-2 w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="col-span-2 flex items-center justify-between mt-4">
            <Button onClick={handleClick} text={`Save`}/>
            <Button onClick={onClose} text={`Cerrar`}/>
        </div>
      </form>
    </div>
  );
}
