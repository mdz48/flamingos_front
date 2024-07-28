import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';
import CheckboxSupplies from '../../../molecules/CheckboxSuplies';
import toast from 'react-hot-toast';

const FormEditPackage = ({ onClose }) => {
    const packageTypeIdRef = useRef('');
    const nameRef = useRef('');
    const costRef = useRef('');
    const descriptionRef = useRef('');
    const [supplies, setSupplies] = useState(null);
    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(false);

    const fetchReservationData = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/packageTypes/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*'
                  },
            });
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data = await response.json();
            // Actualiza los campos con los datos obtenidos
            setSupplies({supplies_id: data.supplies_id_fk})
            nameRef.current.value = data.name || '';
            costRef.current.value = data.cost || '';
            descriptionRef.current.value = data.description || '';
        } catch (error) {
            toast.error('No existe este ID de reservación');
            console.error('Error fetching reservation data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBlur = () => {
        const packageTypeId =packageTypeIdRef.current.value;
        if (packageTypeId) {
            fetchReservationData(packageTypeId);
        }
    };

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${import.meta.env.VITE_URL}/packageTypes/${packageTypeIdRef.current.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*'
                  },
                body: JSON.stringify(newData),
            }).then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Error al guardar el paquete');
                    });
                }
                return response.json();
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['packageTypes']);
            toast.success('Paquete actualizado');
        },
        onError: (error) => {
            console.error('Error posting data:', error);
            toast.error(`${error}`);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const packageTypeId = packageTypeIdRef.current.value;
        const name = nameRef.current.value;
        const cost = costRef.current.value;
        const description = descriptionRef.current.value;

        if (!packageTypeId) {
            toast.error('Por favor, ingrese un ID');
            return;
        }

        const value = localStorage.getItem('user');
        if (value) {
            try {
                const userObject = JSON.parse(value);
                const userName = userObject.firstname;
                const newData = {
                    package_type_id: packageTypeId,
                    name: name || null,
                    cost: cost || null,
                    description: description || null,
                    supplies_id_fk: supplies ? supplies.supplies_id : null,
                    updated_by: userName,
                };
                mutation.mutate(newData);
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        } else {
            console.log("No user found in localStorage");
        }
    };

    const handleCloseClick = () => {
        packageTypeIdRef.current.value = '';
        setSupplies(null);
        onClose();
    };

    const handleSuppliesChange = (selectedSupplies) => {
        setSupplies(selectedSupplies);
    };

   

    return (
        <form className="relative p-4  mx-auto bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
            <div className="mt-4">
                <label className="block text-gray-700">ID del Paquete:</label>
                <input
                    type="text"
                    ref={packageTypeIdRef}
                    onBlur={handleBlur}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>
            <div className="mt-4">
                <label className="block text-gray-700">Nombre:</label>
                <input
                    type="text"
                    ref={nameRef}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div className="mt-4">
                <label className="block text-gray-700">Costo:</label>
                <input
                    type="number"
                    ref={costRef}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>
            <div className="mt-4">
                <label className="block text-gray-700">Descripcion:</label>
                <input
                    type="text"
                    ref={descriptionRef}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>
            <div className="mt-4">
                <CheckboxSupplies onChange={handleSuppliesChange} />
            </div>
            <div className="mt-6 flex items-center justify-between">
                <Button onClick={handleSubmit} text="Guardar" disabled={loading} />
                <Button onClick={handleCloseClick} text="Cerrar" />
            </div>
        </form>
    );
};

export default FormEditPackage;
