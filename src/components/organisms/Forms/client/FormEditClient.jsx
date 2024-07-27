import { useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../../atoms/Button";
import toast from "react-hot-toast";

export default function FormClient({ onClose, client }) {
  const firstnameRef = useRef("");
  const lastnameRef = useRef("");
  const cellphoneRef = useRef("");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (client) {
        firstnameRef.current.value = client.firstname;
        lastnameRef.current.value = client.lastname;
        cellphoneRef.current.value = client.cellphone;
    }
}, [client]);

  const mutation = useMutation({
    mutationFn:  (newData) => {
      return fetch(
        `${import.meta.env.VITE_URL}/client/${client.client_id}`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(newData),
        }
      ).then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Error al editar el cliente');
            });
        }
        return response.json();
    });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["client"]);
      toast.success("Registro actualizado exitosamente");
      onClose();
    },
    onError: (error) => {
      console.error("Error updating data:", error);
      toast.error(error.message || 'Ocurrió un error');
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    const value = localStorage.getItem('user');

    if (value) {
      try {
        const userObject = JSON.parse(value);
        const userName = userObject.firstname;
        const newData = {
          firstname: firstnameRef.current.value,
          lastname: lastnameRef.current.value,
          cellphone: cellphoneRef.current.value,
          updated_by: userName,
        };
        mutation.mutate(newData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        toast.error('Error al procesar datos del usuario');
      }
    } else {
      console.log("No user found in localStorage");
      toast.error('No se encontró el usuario en localStorage');
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded shadow-md">
      <form className="flex flex-col">
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
