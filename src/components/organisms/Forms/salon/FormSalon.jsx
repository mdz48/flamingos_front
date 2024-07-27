import React, { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';
import toast from 'react-hot-toast';

export default function FormSalon({ onClose }) {
    const nameRef = useRef('');
    const capacityRef = useRef('');
    const descriptionRef = useRef('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${import.meta.env.VITE_URL}/salon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*'
                  },
                body: JSON.stringify(newData),
            }).then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Error al guardar el salón');
                    });
                }
                return response.json();
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['salon']);
            toast.success('Salón registrado exitosamente');
            onClose();
        },
        onError: (error) => {
            console.error('Error posting data:', error);
            toast.error(error.message || 'No se pudo hacer conexión');
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
                    capacity: capacityRef.current.value,
                    description: descriptionRef.current.value,
                    updated_by: userName,
                    created_by: userName,
                };
                mutation.mutate(newData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                toast.error('Error al procesar los datos del usuario');
            }
        } else {
            toast.error('No se encontró información del usuario en localStorage');
        }
    };

    return (
        <div className='p-4 border border-gray-300 rounded shadow-md'>
            <form className='flex flex-col'>
                <label htmlFor="name" className='mb-1'>Nombre</label>
                <input type="text" ref={nameRef} className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" />
                <label htmlFor="capacity" className='mb-1'>Capacidad</label>
                <input type="number" ref={capacityRef} className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" />
                <label htmlFor="description" className='mb-1'>Descripción</label>
                <input type="text" ref={descriptionRef} className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" />
                <div className='flex items-center justify-between mt-4'>
                    <Button onClick={handleClick} text='Guardar' />
                    <Button onClick={onClose} text='Cerrar' />
                </div>
            </form>
        </div>
    );
}
