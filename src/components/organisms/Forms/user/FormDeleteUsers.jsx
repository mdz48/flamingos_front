import React, { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';

export default function FormDeleteUsers({ onClose }) {
    const idRef = useRef('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id) => {
            return fetch(`${import.meta.env.VITE_URL}/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
            onClose();
        },
        onError: (error) => {
            console.error('Error deleting user:', error);
            alert('No se pudo realizar la conexión');
        },
    });

    const handleClick = (e) => {
        e.preventDefault();
        mutation.mutate(idRef.current.value);
    };

    return (
        <div className="p-4 border border-gray-300 rounded shadow-md">
            <form className="flex flex-col">
                <label htmlFor="id" className="mb-1">
                    ID del Usuario
                </label>
                <input
                    type="text"
                    ref={idRef}
                    className="border-2 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />
                <div className="flex items-center justify-between mt-4">
                    <Button onClick={handleClick} text="Eliminar" />
                    <Button onClick={onClose} text="Cerrar" />
                </div>
            </form>
        </div>
    );
}
