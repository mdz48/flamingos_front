import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CheckboxSupplies from '../../../molecules/CheckboxSuplies';
import Button from '../../../atoms/Button';
import toast from 'react-hot-toast';

const FormPackage = ({ onClose }) => {
    const [supplies, setSupplies] = useState(null);
    const queryClient = useQueryClient();

    
    const nameRef = useRef('');
    const costRef = useRef('');
    const descriptionRef = useRef('');

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${import.meta.env.VITE_URL}/packageTypes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(newData),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['packageTypes']);
            toast.success('Paquete guardado')
        },
        onError: (error) => {
            console.error('Error posting data:', error);
            toast.error(`${error}`)
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const cost = costRef.current.value;
        const description = descriptionRef.current.value;
       
        if (!name || !cost || !description || !supplies) {
            toast.error('Por favor, asegúrese de rellenar los campos');
            return;
        }

        const value = localStorage.getItem('user');
        if (value) {
            try {
                const userObject = JSON.parse(value);
                const userName = userObject.firstname;     
                const newData = {
                    name: nameRef.current.value,
                    cost: costRef.current.value,
                    description: descriptionRef.current.value,
                    supplies_id_fk: supplies.supplies_id, //.map(supply => supply.id), // Add selected supplies
                    created_by: userName,
                    updated_by: userName
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
        setSupplies(null)
        onClose();
    };


    const handleSuppliesChange = (selectedSupplies) => {
        setSupplies(selectedSupplies);
    };

    return (
        <form className="relative p-4 mx-auto bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
           
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
                <Button onClick={handleSubmit} text="Guardar" />
                <Button onClick={handleCloseClick} text="Cerrar" />
            </div>
        </form>
    );
};

export default FormPackage;
