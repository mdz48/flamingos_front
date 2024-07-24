import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../atoms/Button';
import toast from 'react-hot-toast';

export default function FormDeleteClient({ onClose }) {
    const idRef = useRef('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn:  (clientId) => {
            return  fetch(`${import.meta.env.VITE_URL}/client/${clientId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }).then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Error al eliminar el cliente');
                    });
                }
                return response.json();
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries('client');
            toast.success('Cliente eliminado exitosamente');
            onClose();
        },
        onError: (error) => {
            console.error('Error deleting client:', error);
            toast.error(error.message || 'No se pudo hacer conexión');
        },
    });

    const handleClick = (e) => {
        e.preventDefault();
        const clientId = idRef.current.value;
        if (clientId) {
            mutation.mutate(clientId);
        } else {
            toast.error('Por favor, ingrese un ID de cliente');
        }
    };

    return (
        <div className='p-4 border border-gray-300 rounded shadow-md'>
            <form className='flex flex-col'>
                <label htmlFor='clientId' className='mb-1'>
                    Client ID
                </label>
                <input
                    type='text'
                    ref={idRef}
                    className='border-2 px-3 py-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                />
                <div className='flex items-center justify-between'>
                    <Button onClick={handleClick} text='Eliminar' />
                    <Button onClick={onClose} text='Cerrar'/>
                </div>
            </form>
        </div>
    );
}
