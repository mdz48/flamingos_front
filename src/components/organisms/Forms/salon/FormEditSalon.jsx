import React, { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';

export default function FormEditSalon({ onClose }) {
    const idRef = useRef('');
    const nameRef = useRef('');
    const capacityRef = useRef('');
    const descriptionRef = useRef('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (updatedData) => {
            return fetch(`${import.meta.env.VITE_URL}/salon/${idRef.current.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(updatedData),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['salon']);
            onClose();
        },
        onError: (error) => {
            console.error('Error updating salon:', error);
            alert('No se pudo realizar la conexión');
        },
    });

    const handleClick = (e) => {
        e.preventDefault();
        const updatedData = {
            name: nameRef.current.value,
            capacity: capacityRef.current.value,
            description: descriptionRef.current.value,
            updated_by: 'Mdz',
        };
        mutation.mutate(updatedData);
    };

    return (
        <div className='p-4 border border-gray-300 rounded shadow-md'>
            <form className='flex flex-col'>
                <label htmlFor='id' className='mb-1'>ID del Salón</label>
                <input type='text' ref={idRef} className='border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' />
                <label htmlFor='name'>Nombre</label>
                <input type='text' ref={nameRef} className='border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' />
                <label htmlFor='capacity'>Capacidad</label>
                <input type='number' ref={capacityRef} className='border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' />
                <label htmlFor='description'>Descripción</label>
                <input type='text' ref={descriptionRef} className='border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' />
                <div className='flex items-center justify-between mt-4'>
                    <Button onClick={handleClick} text='Guardar' />
                    <Button onClick={onClose} text='Cerrar' />
                </div>
            </form>
        </div>
    );
}
