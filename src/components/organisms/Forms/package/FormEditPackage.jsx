import { useRef, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../../atoms/Button";
import toast from "react-hot-toast";
import CheckboxSupplies from "../../../molecules/CheckboxSuplies";

export default function FormEditPackage({ onClose, packageType }) {
  const idRef = useRef('');
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const queryClient = useQueryClient();
  const [selectedSupplies, setSelectedSupplies] = useState([]);

  useEffect(() => {
    if (packageType) {
      idRef.current.value = packageType.package_type_id;
      nameRef.current.value = packageType.name;
      descriptionRef.current.value = packageType.description;
    }
  }, [packageType]);

  const mutation = useMutation({
    mutationFn: (newData) => {
      return fetch(
        `${import.meta.env.VITE_URL}/packagetypes/${packageType.package_type_id}`,
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
            throw new Error(errorData.message || 'Error al editar el tipo de paquete');
          });
        }
        return response.json();
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["packageTypes"]);
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
          name: nameRef.current.value,
          description: descriptionRef.current.value,
          updated_by: userName,
          relationship: selectedSupplies.map(supply => supply.supplies_id), 
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

  const handleSuppliesChange = (updatedSupplies) => {
    setSelectedSupplies(updatedSupplies);
  };

  return (
    <div className="p-4 border border-gray-300 rounded shadow-md">
      <form className="flex flex-col">
        <label htmlFor="id" className="mb-1">ID del Tipo de Paquete</label>
        <input
          type="text"
          readOnly
          ref={idRef}
          className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        />
        <label htmlFor="name" className="mb-1">
          Nombre{" "}
        </label>
        <input
          type="text"
          ref={nameRef}
          className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        />
        <label htmlFor="description" className="mb-1">
          Descripción{" "}
        </label>
        <input
          type="text"
          ref={descriptionRef}
          className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        />
        <div className="mt-4">
          <CheckboxSupplies onChange={handleSuppliesChange} />
        </div>
        <div className="flex items-center justify-between mt-4">
          <Button onClick={handleClick} text="Guardar" />
          <Button onClick={onClose} text="Cerrar" />
        </div>
      </form>
    </div>
  );
}
