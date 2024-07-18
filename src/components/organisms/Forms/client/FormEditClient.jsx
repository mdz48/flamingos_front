import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../../atoms/Button";

export default function FormClient({ onClose }) {
  const firstnameRef = useRef("");
  const lastnameRef = useRef("");
  const cellphoneRef = useRef("");
  const queryClient = useQueryClient();
  const id_clientRef = useRef("");

  const mutation = useMutation({
    mutationFn: (newData) => {
      return fetch(
        `${import.meta.env.VITE_URL}/client/${id_clientRef.current.value}`,
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
      queryClient.invalidateQueries(["client"]);
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
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      cellphone: cellphoneRef.current.value,
      updated_by: "Leo",
      created_by: "E menso",
    };
    mutation.mutate(newData);
  };

  return (
    <div className="p-4 border border-gray-300 rounded shadow-md">
      <form className="flex flex-col">
        <label htmlFor="id_client" className="mb-1">
          ID del Cliente{" "}
        </label>
        <input
          type="text"
          ref={id_clientRef}
          className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        />

        <label htmlFor="firstname" className="mb-1">
          Nombre{" "}
        </label>
        <input
          type="text"
          ref={firstnameRef}
          className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        />

        <label htmlFor="lastname" className="mb-1">
          Apellido{" "}
        </label>
        <input
          type="text"
          ref={lastnameRef}
          className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        />

        <label htmlFor="telefono" className="mb-1">
          Teléfono{" "}
        </label>
        <input
          type="number"
          ref={cellphoneRef}
          className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        />

        <div className="flex items-center justify-between mt-4">
          <Button onClick={handleClick} text="Guardar" />
          <Button onClick={onClose} text="Cerrar" />
        </div>
      </form>
    </div>
  );
}
