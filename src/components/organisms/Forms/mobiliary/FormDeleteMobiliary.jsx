import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';
import toast from 'react-hot-toast';

export default function FormDeleteMobiliary({ onClose }) {
    const idRef = useRef('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id) => {
            return fetch(`${import.meta.env.VITE_URL}/mobiliary/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }).then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Error al eliminar el mobiliario');
                    });
                }
                return response.json();
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['mobiliary']);
            toast.success('Mobiliario eliminado exitosamente');
            onClose();
        },
        onError: (error) => {
            console.error('Error deleting data:', error);
            toast.error(error.message || 'No se pudo hacer conexión');
        },
    });

    const handleClick = (e) => {
        e.preventDefault();
        const id = idRef.current.value;
        if (id) {
            mutation.mutate(id);
        } else {
            toast.error('Por favor, ingrese un ID de mobiliario');
        }
    };

    return (
        <div className="p-4 border border-gray-300 rounded shadow-md">
            <form className="flex flex-col">
                <label htmlFor="id" className="mb-1">
                    ID del Mobiliario
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
