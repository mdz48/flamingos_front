import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../../atoms/Button";

export default function FormMobiliary({ onClose }) {
  const nameRef = useRef("");
  const stockRef = useRef("");
  const stateRef = useRef("");
  const availableRef = useRef("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newData) => {
      return fetch(`${import.meta.env.VITE_URL}/mobiliary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(newData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["mobiliary"]);
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
      "stock": stockRef.current.value,
      "state": stateRef.current.value,
      "available_stock" : stockRef.current.value,
      "description": "none",
      "updated_by": "Max",
      "created_by": "Max",
    };
    mutation.mutate(newData);
  };

  return (
    <div className="p-4 border border-gray-300 rounded shadow-md">
      <form className="flex flex-col">
        <label htmlFor="username">
          Name
          <input type="text" ref={nameRef} className="border-2" />
        </label>
        <label htmlFor="stock">
          Cantidad
          <input type="number" ref={stockRef} className="border-2" />
        </label>
        <label htmlFor="state">
          Estado
          <input type="text" ref={stateRef} className="border-2" />
        </label>
        <div className="flex items-center justify-between mt-4">
          <Button onClick={handleClick} text={'Save'}/>
          <Button onClick={onClose} text={`Cerrar`}/>
        </div>
      </form>
    </div>
  );
}
