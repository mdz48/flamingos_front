import React, { useRef, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';
import toast from "react-hot-toast";

export default function FormEditSalon({ salon, onClose }) {
    const nameRef = useRef('');
    const capacityRef = useRef('');
    const descriptionRef = useRef('');
    const queryClient = useQueryClient();

    useEffect(() => {
        if (salon) {
            nameRef.current.value = salon.name;
            capacityRef.current.value = salon.capacity;
            descriptionRef.current.value = salon.description;
        }
    }, [salon]);

    const mutation = useMutation({
        mutationFn: (updatedData) => {
            return fetch(`${import.meta.env.VITE_URL}/salon/${salon.salon_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*'
                  },
                body: JSON.stringify(updatedData),
            }).then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Error al actualizar el salón');
                    });
                }
                return response.json();
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['salon']);
            toast.success("Salón actualizado exitosamente");
            onClose();
        },
        onError: (error) => {
            console.error('Error updating salon:', error);
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
                const updatedData = {
                    name: nameRef.current.value,
                    capacity: capacityRef.current.value,
                    description: descriptionRef.current.value,
                    updated_by: userName,
                };
                mutation.mutate(updatedData);
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
        <div className='p-4 border border-gray-300 rounded shadow-md'>
            <form className='flex flex-col'>
                <label htmlFor='name' className='mb-1'>Nombre</label>
                <input type='text' ref={nameRef} className='border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' />
                <label htmlFor='capacity' className='mb-1'>Capacidad</label>
                <input type='number' ref={capacityRef} className='border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' />
                <label htmlFor='description' className='mb-1'>Descripción</label>
                <input type='text' ref={descriptionRef} className='border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' />
                <div className='flex items-center justify-between mt-4'>
                    <Button onClick={handleClick} text='Guardar' />
                    <Button onClick={onClose} text='Cerrar' />
                </div>
            </form>
        </div>
    );
}
