import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CheckboxSupplies from '../../../molecules/CheckboxSuplies';
import Button from '../../../atoms/Button';
import toast from 'react-hot-toast';

const FormPackage = ({ onClose }) => {
    const [supplies, setSupplies] = useState([]);
    const queryClient = useQueryClient();
    
    const nameRef = useRef('');
    const costRef = useRef('');
    const descriptionRef = useRef('');

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${import.meta.env.VITE_URL}/packagetypes`, {
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
            toast.success('Paquete guardado');
        },
        onError: (error) => {
            console.error('Error posting data:', error);
            toast.error(`${error}`);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const cost = costRef.current.value;
        const description = descriptionRef.current.value;
       
        if (!name || !cost || !description || supplies.length === 0) {
            toast.error('Por favor, asegúrese de rellenar los campos');
            return;
        }

        const value = localStorage.getItem('user');
        if (value) {
            try {
                const userObject = JSON.parse(value);
                const userName = userObject.firstname;     
                const newData = {
                    name: name,
                    cost: cost,
                    description: description,
                    precreated: 0,
                    relationship: supplies.map(supply => supply.supplies_id), // Add selected supplies
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
        setSupplies([]);
        onClose();
    };

    const handleSuppliesChange = (selectedSupplies) => {
        setSupplies(selectedSupplies);
    };

    return (
        <div className='p-4 border border-gray-300 rounded shadow-md'>
            <form className="flex flex-col " onSubmit={handleSubmit}>
                    <label className="block text-gray-700">Nombre:</label>
                    <input
                        type="text"
                        ref={nameRef}
                        className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    />

                    <label className="block text-gray-700">Costo:</label>
                    <input
                        type="number"
                        ref={costRef}
                        className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    />
                    <label className="block text-gray-700">Descripcion:</label>
                    <input
                        type="text"
                        ref={descriptionRef}
                        className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    />
                    <CheckboxSupplies onChange={handleSuppliesChange} />
                <div className="mt-6 flex items-center justify-between">
                    <Button onClick={handleSubmit} text="Guardar" />
                    <Button onClick={handleCloseClick} text="Cerrar" />
                </div>
            </form>
        </div>
    );
};

export default FormPackage;
